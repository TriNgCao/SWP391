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
//        List<DailyRevenue> dailyRevenues = calculateDailyRevenues(appointments);
//        return new Revenue(totalRevenue, totalProfit, dailyRevenues);
        return new Revenue(totalRevenue, totalProfit);
    }

    @Override
    public Map<LocalDate, Map<String, BigDecimal>> calculateRevenueAndProfitLastXDays(int days) {
        Map<LocalDate, Map<String, BigDecimal>> dailyData = new HashMap<>();

        // Loop for each day in the last X days
        for (int i = 0; i < days; i++) {
            LocalDate date = LocalDate.now().minusDays(i);

            List<Appointment> appointments = getAppointmentsForDate(date);
            BigDecimal dailyRevenue = calculateDailyTotal(appointments);
            BigDecimal dailyProfit = calculateDailyProfit(appointments);

            // Save the data in a nested map structure
            Map<String, BigDecimal> revenueAndProfit = new HashMap<>();
            revenueAndProfit.put("revenue", dailyRevenue);
            revenueAndProfit.put("profit", dailyProfit);

            dailyData.put(date, revenueAndProfit);
        }
        return dailyData;
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
                        entry.getKey(),
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

//    @Override
//    public BigDecimal calculateRevenueForRecentDays(int days) {
//        List<Appointment> appointments = revenueRepository.findAll();
//        Date recentDate = new Date(System.currentTimeMillis() - days * 24L * 60 * 60 * 1000);
//        return appointments.stream()
//                .filter(app -> app.getDate().after(recentDate))
//                .map(this::calculateAppointmentPrice)
//                .reduce(BigDecimal.ZERO, BigDecimal::add);
//    }

    @Override
    public BigDecimal calculateDailyProfit(List<Appointment> dailyAppointments) {
        BigDecimal dailyTotal = calculateDailyTotal(dailyAppointments);
        BigDecimal dailyCost = dailyAppointments.stream()
                .map(this::calculateAppointmentCost)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return dailyTotal.subtract(dailyCost); // Daily profit calculation
    }

}
