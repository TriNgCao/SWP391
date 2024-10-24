package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.dto.Revenue;
import com.swp391.hairsalon.pojo.Appointment;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

public interface IRevenueService {
    Revenue getRevenueData(List<Appointment> appointments);
    BigDecimal calculateTotalProfit(List<Appointment> appointments);
    List<Revenue.DailyRevenue> calculateDailyRevenues(List<Appointment> appointments);
    BigDecimal calculateDailyTotal(List<Appointment> appointments);
    BigDecimal calculateAppointmentPrice(Appointment appointment);
    BigDecimal calculateAppointmentCost(Appointment appointment);
    BigDecimal calculateRevenueBetweenDates(Date startDate, Date endDate);
    BigDecimal calculateRevenueForRecentDays(int days);
    BigDecimal calculateTotalRevenue(List<Appointment> appointments);
}
