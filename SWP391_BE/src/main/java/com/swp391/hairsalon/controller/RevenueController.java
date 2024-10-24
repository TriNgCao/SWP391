package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.Revenue;
import com.swp391.hairsalon.dto.Revenue.DailyRevenue;
import com.swp391.hairsalon.pojo.Appointment;
import com.swp391.hairsalon.service.definitions.IRevenueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/revenue")
public class RevenueController {

    @Autowired
    private IRevenueService revenueService;

    // API để lấy doanh thu tổng hợp từ tất cả các lịch hẹn
    @PostMapping("/total")
    public ResponseEntity<Revenue> getTotalRevenue(@RequestBody List<Appointment> appointments) {
        Revenue revenue = revenueService.getRevenueData(appointments);
        return ResponseEntity.ok(revenue);
    }

    // API để tính doanh thu giữa hai ngày
    @GetMapping("/between/{startDate}/{endDate}")
    public ResponseEntity<BigDecimal> getRevenueBetweenDates(@PathVariable String startDate, @PathVariable String endDate) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            Date start = dateFormat.parse(startDate);
            Date end = dateFormat.parse(endDate);

            BigDecimal revenue = revenueService.calculateRevenueBetweenDates(start, end);
            return ResponseEntity.ok(revenue);
        } catch (ParseException e) {
            return ResponseEntity.badRequest().body(BigDecimal.ZERO); // Trả về 0 nếu có lỗi định dạng ngày
        }
    }

    // API để tính doanh thu trong X ngày gần đây
    @GetMapping("/recent/{days}")
    public ResponseEntity<BigDecimal> getRevenueForRecentDays(@PathVariable int days) {
        BigDecimal revenue = revenueService.calculateRevenueForRecentDays(days);
        return ResponseEntity.ok(revenue);
    }

    // API để tính doanh thu hàng ngày
    @PostMapping("/daily")
    public ResponseEntity<List<DailyRevenue>> getDailyRevenue(@RequestBody List<Appointment> appointments) {
        List<DailyRevenue> dailyRevenues = revenueService.calculateDailyRevenues(appointments);
        return ResponseEntity.ok(dailyRevenues);
    }

    // API để tính tổng doanh thu từ các lịch hẹn
    @PostMapping("/total-amount")
    public ResponseEntity<BigDecimal> calculateTotalRevenue(@RequestBody List<Appointment> appointments) {
        BigDecimal totalRevenue = revenueService.calculateTotalRevenue(appointments);
        return ResponseEntity.ok(totalRevenue);
    }

    // API để tính tổng lợi nhuận từ các lịch hẹn
    @PostMapping("/total-profit")
    public ResponseEntity<BigDecimal> calculateTotalProfit(@RequestBody List<Appointment> appointments) {
        BigDecimal totalProfit = revenueService.calculateTotalProfit(appointments);
        return ResponseEntity.ok(totalProfit);
    }
}
