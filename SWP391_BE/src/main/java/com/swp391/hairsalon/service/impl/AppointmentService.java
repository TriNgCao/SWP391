package com.swp391.hairsalon.service.impl;

import java.sql.Date;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swp391.hairsalon.pojo.Appointment;
import com.swp391.hairsalon.pojo.Salon;
import com.swp391.hairsalon.repository.IAppointmentRepository;
import com.swp391.hairsalon.service.definitions.IAppointmentService;

import jakarta.transaction.Transactional;

@Service
public class AppointmentService implements IAppointmentService {

    private IAppointmentRepository appointmentRepo;

    @Autowired
    public AppointmentService(IAppointmentRepository appointmentRepo) {
        this.appointmentRepo = appointmentRepo;
    }

    @Override
    public List<Appointment> getAllAppointment() {
        return appointmentRepo.findAll();
    }

    @Override
    public List<Appointment> getAppointmentsByCustomerName(String cusName){
        return appointmentRepo.findByCustomer_Account_Name(cusName);
    }

    @Override
    public Appointment getAppointmentById(int id) {
        return appointmentRepo.findById(id).orElse(null);
    }

    @Override
    @Transactional
    public Appointment addAppointment(Appointment appointment) {
        return appointmentRepo.save(appointment);
    }

    @Override
    @Transactional
    public Appointment updateAppointment(Appointment appointment) {
        return appointmentRepo.saveAndFlush(appointment);
    }

    @Override
    @Transactional
    public void deleteAppointment(int id) {
        appointmentRepo.deleteById(id);
    }

    // @Override
    // public List<Appointment> getAppointmentsByCustomerId(int id) {
    //     return appointmentRepo.findByCusId(id);
    // }

    @Override
    public List<Appointment> getAppointmentsByDate(Date date) {
        List<Appointment> appointments = appointmentRepo.findByDate(date);
        if (appointments.isEmpty()) {
            return Collections.emptyList();  // Return empty list instead of null
        }
        return appointments;
    }

    @Override
    public List<Appointment> getAppointmentsByBranch(Salon bracnh) {
        return appointmentRepo.findByBranch(bracnh);
    }

    @Override
    public List<Appointment> getAppointmentsByStylistId(int id) {
        return appointmentRepo.findByStylist_StylistId(id);
    }

    @Override
    public List<Appointment> getCompletedAppointmentsByStylist(int stylistId) {
        return appointmentRepo.getCompletedAppointmentsByStylist(stylistId);
    }

    @Override
    public List<Appointment> getAppointmentsByCustomerAccountId(String accountId) {
        return appointmentRepo.findByCustomer_Account_Id(accountId);
    }

    @Override
    public List<Appointment> getCompletedAppointmentsByStylistForMonth(int stylistId, int month, int year) {
        return appointmentRepo.findCompletedAppointmentsByStylistForMonth(stylistId, month, year);
    }
    

}
