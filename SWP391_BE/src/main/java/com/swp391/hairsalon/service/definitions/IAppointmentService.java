package com.swp391.hairsalon.service.definitions;

import java.sql.Date;
import java.util.List;

import com.swp391.hairsalon.pojo.Appointment;

public interface IAppointmentService {
    public List<Appointment> getAllAppointment();

    public Appointment getAppointmentById(int id);

    public Appointment addAppointment(Appointment appointment);

    public Appointment updateAppointment(Appointment appointment);

    public void deleteAppointment(int id);

    // public List<Appointment> getAppointmentsByCustomerId(int id);

    public List<Appointment> getAppointmentsByDate(Date date);

    public List<Appointment> getAppointmentsByCustomerName(String cusName);
}
