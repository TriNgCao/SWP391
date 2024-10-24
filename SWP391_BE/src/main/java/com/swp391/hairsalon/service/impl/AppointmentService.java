package com.swp391.hairsalon.service.impl;

import java.sql.Date;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swp391.hairsalon.pojo.Appointment;
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

}
