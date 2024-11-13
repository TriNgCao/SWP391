package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.dto.Revenue;
import com.swp391.hairsalon.dto.Revenue.DailyRevenue;
import com.swp391.hairsalon.pojo.Appointment;
import com.swp391.hairsalon.repository.IAppointmentRepository;
import com.swp391.hairsalon.repository.IRevenueRepository;
import com.swp391.hairsalon.service.definitions.IRevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class RevenueService implements IRevenueService {
    @Autowired
    private IRevenueRepository revenueRepository;
    @Autowired
    private IAppointmentRepository appointmentRepository;

    public List<Appointment> getAppointmentsForToday() {
        LocalDate today = LocalDate.now();
        return appointmentRepository.findByDate(java.sql.Date.valueOf(today));
    }

    @Override
    public List<Appointment> getAppointmentsForDate(LocalDate date) {
        return appointmentRepository.findByDate(java.sql.Date.valueOf(date));
    }

    @Override
    public Revenue getRevenueData(List<Appointment> appointments) {
        BigDecimal totalRevenue = calculateTotalRevenue(appointments);
        BigDecimal totalProfit = calculateTotalProfit(appointments);
        return new Revenue(totalRevenue, totalProfit);
    }

    @Override
    public Map<LocalDate, Map<String, BigDecimal>> calculateRevenueAndProfitLastXDays(int days) {
        Map<LocalDate, Map<String, BigDecimal>> dailyData = new HashMap<>();
        for (int i = 0; i < days; i++) {
            LocalDate date = LocalDate.now().minusDays(i);
            List<Appointment> appointments = getAppointmentsForDate(date);
            BigDecimal dailyRevenue = calculateDailyTotal(appointments);
            Map<String, BigDecimal> revenueAndProfit = new HashMap<>();
            revenueAndProfit.put("revenue", dailyRevenue);
            dailyData.put(date, revenueAndProfit);
        }
        return dailyData;
    }

    @Override
    public BigDecimal calculateTotalRevenue(List<Appointment> appointments) {
        return appointments.stream()
                .filter(app -> "Completed".equals(app.getStatus()))
                .map(this::calculateAppointmentPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public BigDecimal calculateTotalProfit(List<Appointment> appointments) {
        return appointments.stream()
                .filter(app -> "Completed".equals(app.getStatus()))
                .map(app -> calculateAppointmentPrice(app).subtract(calculateAppointmentCost(app)))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public List<DailyRevenue> calculateDailyRevenues(List<Appointment> appointments) {
        Map<LocalDate, List<Appointment>> appointmentsByDate = appointments.stream()
                .filter(app -> "Completed".equals(app.getStatus()))
                .collect(Collectors.groupingBy(app -> app.getDate().toLocalDate()));
        return appointmentsByDate.entrySet().stream()
                .map(entry -> new DailyRevenue(
                        entry.getKey(),
                        calculateDailyTotal(entry.getValue())
                ))
                .collect(Collectors.toList());
    }

    @Override
    public BigDecimal calculateDailyTotal(List<Appointment> appointments) {
        return appointments.stream()
                .filter(app -> "Completed".equals(app.getStatus()))
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

}
