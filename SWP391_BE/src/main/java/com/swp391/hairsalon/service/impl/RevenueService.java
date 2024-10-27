package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.dto.Revenue;
import com.swp391.hairsalon.dto.Revenue.DailyRevenue;
import com.swp391.hairsalon.pojo.Appointment;
import com.swp391.hairsalon.repository.IRevenueRepository;
import com.swp391.hairsalon.service.definitions.IRevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RevenueService implements IRevenueService {
    @Autowired
    private IRevenueRepository revenueRepository;

    @Override
    public Revenue getRevenueData(List<Appointment> appointments) {
        BigDecimal totalRevenue = calculateTotalRevenue(appointments);
        BigDecimal totalProfit = calculateTotalProfit(appointments);
        List<DailyRevenue> dailyRevenues = calculateDailyRevenues(appointments);
        return new Revenue(totalRevenue, totalProfit, dailyRevenues);
    }

    @Override
    public BigDecimal calculateTotalRevenue(List<Appointment> appointments) {
        return appointments.stream()
                .map(this::calculateAppointmentPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public BigDecimal calculateTotalProfit(List<Appointment> appointments) {
        return appointments.stream()
                .map(app -> calculateAppointmentPrice(app).subtract(calculateAppointmentCost(app)))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public List<DailyRevenue> calculateDailyRevenues(List<Appointment> appointments) {
        Map<LocalDate, List<Appointment>> appointmentsByDate = appointments.stream()
                .collect(Collectors.groupingBy(app -> app.getDate().toLocalDate()));
        return appointmentsByDate.entrySet().stream()
                .map(entry -> new DailyRevenue(
                        entry.getKey(),  // LocalDate làm ngày
                        calculateDailyTotal(entry.getValue())
                ))
                .collect(Collectors.toList());
    }


    @Override
    public BigDecimal calculateDailyTotal(List<Appointment> appointments) {
        return appointments.stream()
                .map(this::calculateAppointmentPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public BigDecimal calculateAppointmentPrice(Appointment appointment) {
        return appointment.getServices().stream()
                .map(service -> BigDecimal.valueOf(service.getServicePrice()))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public BigDecimal calculateAppointmentCost(Appointment appointment) {
        BigDecimal staffSalary = BigDecimal.valueOf(appointment.getStylist().getSalary());
        BigDecimal stylistCommission = BigDecimal.valueOf(appointment.getStylist().getCommission());

        return staffSalary.add(stylistCommission);
    }

    @Override
    public BigDecimal calculateRevenueBetweenDates(Date startDate, Date endDate) {
        List<Appointment> appointments = revenueRepository.findAll();
        return appointments.stream()
                .filter(app -> !app.getDate().before(startDate) && !app.getDate().after(endDate))
                .map(this::calculateAppointmentPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public BigDecimal calculateRevenueForRecentDays(int days) {
        List<Appointment> appointments = revenueRepository.findAll();
        Date recentDate = new Date(System.currentTimeMillis() - days * 24L * 60 * 60 * 1000);
        return appointments.stream()
                .filter(app -> app.getDate().after(recentDate))
                .map(this::calculateAppointmentPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
