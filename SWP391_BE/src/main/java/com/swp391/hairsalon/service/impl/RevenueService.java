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
        // Tính tổng doanh thu
        BigDecimal totalRevenue = calculateTotalRevenue(appointments);

        // Tính tổng lợi nhuận
        BigDecimal totalProfit = calculateTotalProfit(appointments);

        // Tính doanh thu hàng ngày
        List<DailyRevenue> dailyRevenues = calculateDailyRevenues(appointments);

        // Trả về đối tượng Revenue với các giá trị đã tính toán
        return new Revenue(totalRevenue, totalProfit, dailyRevenues);
    }

    @Override
    public BigDecimal calculateTotalRevenue(List<Appointment> appointments) {
        return appointments.stream()
                .map(this::calculateAppointmentPrice)  // Tính giá từng lịch hẹn
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public BigDecimal calculateTotalProfit(List<Appointment> appointments) {
        return appointments.stream()
                .map(app -> calculateAppointmentPrice(app).subtract(calculateAppointmentCost(app)))  // Trừ chi phí từ giá
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public List<DailyRevenue> calculateDailyRevenues(List<Appointment> appointments) {
        // Sử dụng phương thức getDate().toLocalDate() để chuyển đổi thành LocalDate trước khi nhóm theo ngày
        Map<LocalDate, List<Appointment>> appointmentsByDate = appointments.stream()
                .collect(Collectors.groupingBy(app -> app.getDate().toLocalDate()));  // Chuyển Date sang LocalDate

        // Tính toán doanh thu hàng ngày từ nhóm lịch hẹn
        return appointmentsByDate.entrySet().stream()
                .map(entry -> new DailyRevenue(
                        entry.getKey(),  // LocalDate làm ngày
                        calculateDailyTotal(entry.getValue())  // Tính tổng doanh thu trong ngày
                ))
                .collect(Collectors.toList());
    }


    @Override
    public BigDecimal calculateDailyTotal(List<Appointment> appointments) {
        return appointments.stream()
                .map(this::calculateAppointmentPrice)  // Tính giá từng lịch hẹn
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public BigDecimal calculateAppointmentPrice(Appointment appointment) {
        return appointment.getServices().stream()
                .map(service -> BigDecimal.valueOf(service.getServicePrice()))  // Chuyển đổi từ double sang BigDecimal
                .reduce(BigDecimal.ZERO, BigDecimal::add);  // Sử dụng BigDecimal.add() để cộng
    }

    @Override
    public BigDecimal calculateAppointmentCost(Appointment appointment) {
        // Chi phí là tổng lương của nhân viên và stylist, cộng thêm hoa hồng cho stylist
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
