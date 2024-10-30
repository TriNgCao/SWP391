package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.dto.Revenue;
import com.swp391.hairsalon.pojo.Appointment;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

public interface IRevenueService {
    List<Appointment> getAppointmentsForDate(LocalDate date);

    Revenue getRevenueData(List<Appointment> appointments);
    BigDecimal calculateTotalProfit(List<Appointment> appointments);
    List<Revenue.DailyRevenue> calculateDailyRevenues(List<Appointment> appointments);
    BigDecimal calculateDailyTotal(List<Appointment> appointments);
    BigDecimal calculateAppointmentPrice(Appointment appointment);
    BigDecimal calculateAppointmentCost(Appointment appointment);
    BigDecimal calculateRevenueBetweenDates(Date startDate, Date endDate);

    Map<LocalDate, Map<String, BigDecimal>> calculateRevenueAndProfitLastXDays(int days);

    BigDecimal calculateTotalRevenue(List<Appointment> appointments);
    BigDecimal calculateDailyProfit(List<Appointment> dailyAppointments);
}
