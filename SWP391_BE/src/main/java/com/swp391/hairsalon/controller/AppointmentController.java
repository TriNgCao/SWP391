package com.swp391.hairsalon.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.swp391.hairsalon.dto.AppointmentRequest;
import com.swp391.hairsalon.pojo.Appointment;
import com.swp391.hairsalon.pojo.SalonService;
import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.service.definitions.IAppointmentService;
import com.swp391.hairsalon.service.definitions.ICustomerService;
import com.swp391.hairsalon.service.definitions.INotificationService;
import com.swp391.hairsalon.service.definitions.ISalonService;
import com.swp391.hairsalon.service.definitions.ISalonServiceService;
import com.swp391.hairsalon.service.definitions.IStaffService;
import com.swp391.hairsalon.service.definitions.IStylistservice;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/appointment")
public class AppointmentController {
    @Autowired
    private ICustomerService iCustomerService;
    @Autowired
    private IAppointmentService appointmentService;
    @Autowired
    private ISalonService iSalonService;
    @Autowired
    private ISalonServiceService iSalonServiceService;
    @Autowired
    private IStylistservice iStylistservice;
    @Autowired
    private INotificationService iNotificationService;
    @Autowired
    private IStaffService iStaffService;

    public AppointmentController(IAppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @GetMapping
    public List<Appointment> getAllAppointment() {
        return appointmentService.getAllAppointment();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable int id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        if (appointment != null) {
            return ResponseEntity.ok(appointment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/customer/{name}")
    public List<Appointment> getAppointmentsByCustomerName(@PathVariable String name) {
        return appointmentService.getAppointmentsByCustomerName(name);
    }

    @PostMapping
    public ResponseEntity<String> addAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        Appointment appointment = new Appointment();
        appointment.setCustomer(iCustomerService.getCustomerById(appointmentRequest.getCusId()));
        appointment.setBranch(iSalonService.getSalonById(appointmentRequest.getSalonId()));
        appointment.setDate(appointmentRequest.getDate());
        appointment.setFeedback(null);
        appointment.setRating(-1);
        appointment.setServices(getSalonServicesById(appointmentRequest));
        appointment.setStylist(iStylistservice.getStylistById(appointmentRequest.getStylistId()));
        appointment.setStartTime(appointmentRequest.getStartTime());
        appointment.setStatus("Pending");
        appointment = appointmentService.addAppointment(appointment);
        String msgStaff = "A booking request has just been created by <b>"
                + iCustomerService.getCustomerById(appointmentRequest.getCusId()).getAccount().getName()
                + "</b>, please check and process it.";
        List<Staff> staffList = iStaffService.getStaffsBySalonId(appointmentRequest.getSalonId());
        for (Staff staff : staffList) {
            iNotificationService.addNewNotification("Appointment Request Created", msgStaff, staff.getAccount());
        }
        return ResponseEntity.status(HttpStatus.CREATED).body("Add appointment successfully !");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateAppointment(@PathVariable int id,
            @RequestBody AppointmentRequest appointmentRequest) {
        Appointment existAppointment = appointmentService.getAppointmentById(id);
        if (existAppointment == null) {
            return ResponseEntity.notFound().build();
        } else {
            String previousStatus = existAppointment.getStatus();
            existAppointment.setDate(appointmentRequest.getDate());
            existAppointment.setStartTime(appointmentRequest.getStartTime());
            existAppointment.setServices(getSalonServicesById(appointmentRequest));
            existAppointment.setBranch(iSalonService.getSalonById(appointmentRequest.getSalonId()));
            existAppointment.setCustomer(iCustomerService.getCustomerById(appointmentRequest.getCusId()));
            existAppointment.setDate(appointmentRequest.getDate());
            existAppointment.setFeedback(appointmentRequest.getFeedback());
            existAppointment.setStylist(iStylistservice.getStylistById(appointmentRequest.getStylistId()));
            existAppointment.setRating(appointmentRequest.getRating());
            existAppointment.setStatus(appointmentRequest.getStatus());
            existAppointment = appointmentService.updateAppointment(existAppointment);
            if ("Ready".equals(existAppointment.getStatus())) {
                String msgCustomer = "Your appointment has been confirmed! We look forward to welcoming you at "
                        + existAppointment.getBranch().getSalonName() + " on " + existAppointment.getDate() + " at "
                        + existAppointment.getStartTime() + ". Your stylist, "
                        + existAppointment.getStylist().getAccount().getName()
                        + ", will be ready to serve you. Please review your appointment details in the system. If you have any requests or changes, feel free to contact us. Thank you for choosing our service!";
                iNotificationService.addNewNotification("Appointment Confirmation", msgCustomer,
                        existAppointment.getCustomer().getAccount());
    
                String msgStylist = "New Appointment Scheduled! You have an upcoming appointment at "
                        + existAppointment.getBranch().getSalonName() + " on "
                        + existAppointment.getDate() + " at "
                        + existAppointment.getStartTime() + " with "
                        + existAppointment.getCustomer().getAccount().getName()
                        + ". Please review your schedule in the system to ensure you're prepared. If there are any conflicts or updates, contact the salon manager as soon as possible. Thank you for your attention!";
                iNotificationService.addNewNotification("New Appointment Scheduled", msgStylist,
                        existAppointment.getStylist().getAccount());
            }
    
            if ("Cancel".equals(existAppointment.getStatus())) {
                String msgCustomerCancel = "Your appointment at "
                        + existAppointment.getBranch().getSalonName() + " on "
                        + existAppointment.getDate() + " at "
                        + existAppointment.getStartTime()
                        + " has been cancelled. We apologize for any inconvenience this may cause. If you would like to reschedule, please visit our system or contact us directly. Thank you for your understanding.";
                iNotificationService.addNewNotification("Appointment Cancellation", msgCustomerCancel,
                        existAppointment.getCustomer().getAccount());
    
                if ("Ready".equals(previousStatus)) {
                    String msgStylistCancel = "The appointment with " 
                            + existAppointment.getCustomer().getAccount().getName() + " at "
                            + existAppointment.getBranch().getSalonName() + " on "
                            + existAppointment.getDate() + " at "
                            + existAppointment.getStartTime()
                            + " has been cancelled. Please review your updated schedule. Thank you!";
                    iNotificationService.addNewNotification("Appointment Cancellation", msgStylistCancel,
                            existAppointment.getStylist().getAccount());
                }
            }

            if ("Complete".equals(existAppointment.getStatus())) {
                String msgCustomerComplete = "Thank you for visiting us! We hope you enjoyed your experience at "
                        + existAppointment.getBranch().getSalonName() + ". Your appointment on "
                        + existAppointment.getDate() + " at " 
                        + existAppointment.getStartTime() + " has been completed. If you have any feedback or would like to schedule your next appointment, please contact us or visit our system. We look forward to seeing you again!";
                iNotificationService.addNewNotification("Appointment Completed", msgCustomerComplete,
                        existAppointment.getCustomer().getAccount());
            }
            return ResponseEntity.ok(("Update appointment successfully!"));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable int id) {
        Appointment appointment = appointmentService.getAppointmentById(id);
        if (appointment == null) {
            return ResponseEntity.notFound().build();
        } else {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok().build();
        }
    }

    @GetMapping("/date/{date}")
    public List<Appointment> getAppointmentsByDate(@PathVariable String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate localDate = LocalDate.parse(date, formatter);

        Date sqlDate = Date.valueOf(localDate);

        return appointmentService.getAppointmentsByDate(sqlDate);
    }

    private List<SalonService> getSalonServicesById(AppointmentRequest appointmentRequest) {
        List<SalonService> services = new ArrayList<>();
        for (Long serviceId : appointmentRequest.getServiceId()) {
            SalonService service = iSalonServiceService.getServiceById(serviceId);
            if (service != null) {
                services.add(service);
            }
        }
        return services;
    }
}
