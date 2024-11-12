package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.Revenue;
import com.swp391.hairsalon.pojo.Appointment;
import com.swp391.hairsalon.service.definitions.IAppointmentService;
import com.swp391.hairsalon.service.definitions.IRevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/revenue")
public class RevenueController {

    @Autowired
    private IRevenueService revenueService;
    @Autowired
    private IAppointmentService appointmentService;

    @PostMapping("/total")
    public ResponseEntity<Revenue> getTotalRevenue(@RequestBody List<Appointment> appointments) {
        Revenue revenue = revenueService.getRevenueData(appointments);
        return ResponseEntity.ok(revenue);
    }

    @GetMapping("/daily-revenue")
    public ResponseEntity<BigDecimal> getDailyRevenue(@RequestParam("date") String dateStr) {
        LocalDate date = LocalDate.parse(dateStr);
        ZonedDateTime zonedDateTime = date.atStartOfDay(ZoneId.of("Asia/Ho_Chi_Minh"));
        LocalDate adjustedDate = zonedDateTime.toLocalDate();
        List<Appointment> dailyAppointments = revenueService.getAppointmentsForDate(adjustedDate);
        BigDecimal dailyRevenue = revenueService.calculateDailyTotal(dailyAppointments);
        return ResponseEntity.ok(dailyRevenue);
    }

    @GetMapping("/total-revenue")
    public ResponseEntity<BigDecimal> calculateTotalRevenue() {
        List<Appointment> appointments = appointmentService.getAllAppointment();
        BigDecimal totalRevenue = revenueService.calculateTotalRevenue(appointments);
        return ResponseEntity.ok(totalRevenue);
    }

    @GetMapping("/total-profit")
    public ResponseEntity<BigDecimal> calculateTotalProfit(){
        List<Appointment> appointments = appointmentService.getAllAppointment();
        BigDecimal totalProfit = revenueService.calculateTotalProfit(appointments);
        return ResponseEntity.ok(totalProfit);
    }

    @GetMapping("/last-x-days/{days}")
    public ResponseEntity<Map<LocalDate, Map<String, BigDecimal>>> getRevenueAndProfitLastXDays(@PathVariable int days) {
        Map<LocalDate, Map<String, BigDecimal>> data = revenueService.calculateRevenueAndProfitLastXDays(days);
        return ResponseEntity.ok(data);
    }

}