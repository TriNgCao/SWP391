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
import com.swp391.hairsalon.service.definitions.IAppointmentService;
import com.swp391.hairsalon.service.definitions.ICustomerService;
import com.swp391.hairsalon.service.definitions.ISalonService;
import com.swp391.hairsalon.service.definitions.ISalonServiceService;
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
    public ResponseEntity<Appointment> addAppointment(@RequestBody AppointmentRequest appointmentRequest) {
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
        return ResponseEntity.status(HttpStatus.CREATED).body(appointment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Appointment> updateAppointment(@PathVariable int id, @RequestBody AppointmentRequest appointmentRequest) {
        Appointment existAppointment = appointmentService.getAppointmentById(id);
        if (existAppointment == null) {
            return ResponseEntity.notFound().build();
        } else {
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
            return ResponseEntity.ok(appointmentService.updateAppointment(existAppointment));
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

    private List<SalonService> getSalonServicesById(AppointmentRequest appointmentRequest ){
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
