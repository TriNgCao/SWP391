package com.swp391.hairsalon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import com.swp391.hairsalon.pojo.SalonService;

import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Appointment;
import com.swp391.hairsalon.pojo.Payroll;
import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.pojo.Stylist;
import com.swp391.hairsalon.repository.IPayrollRepository;
import com.swp391.hairsalon.service.definitions.IPayrollService;

import jakarta.transaction.Transactional;

@Service
public class PayrollService implements IPayrollService {
    @Autowired
    private AppointmentService appointmentService;
    @Autowired
    private StylistService stylistService;
    @Autowired
    private StaffService staffService;

    @Autowired
    private IPayrollRepository iPayrollRepository;

    @Transactional
    public void savePayroll(Payroll payroll) {
        iPayrollRepository.save(payroll); // Lưu payroll vào cơ sở dữ liệu
    }

    public List<Payroll> getPayrollBySalon(int salonId) {
        return iPayrollRepository.findBySalon_SalonId(salonId); // Lấy payroll theo salonId
    }

    // @Scheduled(cron = "0 * * * * ?") 
    @Scheduled(cron = "0 0 0 1 * ?")
    @Transactional
    public void calculateMonthlyPayroll() {
        // Tính lương cho Stylist
        List<Stylist> stylists = stylistService.getAllStylists();
        for (Stylist stylist : stylists) {
            // Tính tổng doanh thu từ các dịch vụ hoàn thành
            double totalRevenue = calculateTotalRevenue(stylist.getStylistId()); // Phương thức này sẽ tính tổng doanh thu
            double commission = stylist.getCommission();
            
            // Tính toán thu nhập của stylist
            double earning = (commission * totalRevenue) + stylist.getSalary(); // Hoa hồng cộng lương cơ bản
    
            Payroll payroll = new Payroll();
            payroll.setEmployeeId(stylist.getStylistId());
            payroll.setEarning(earning);
            payroll.setPayrollDate(LocalDate.now());
            payroll.setStatus(false); // Trạng thái đã thanh toán
            payroll.setSalon(stylist.getSalon()); // Gán salon
            
            // Lấy thông tin từ Account
            Account account = stylist.getAccount();
            payroll.setName(account.getName());
            payroll.setEmail(account.getEmail());
            payroll.setPhone(account.getPhone());
            payroll.setRole(account.getRole());
            
            iPayrollRepository.save(payroll); // Lưu payroll vào cơ sở dữ liệu
        }

        // Tính lương cho Staff
        List<Staff> staffMembers = staffService.getAllStaffs();
        for (Staff staff : staffMembers) {
            double earning = staff.getSalary(); // Không có hoa hồng

            Payroll payroll = new Payroll();
            payroll.setEmployeeId(staff.getSatffId());
            payroll.setEarning(earning);
            payroll.setPayrollDate(LocalDate.now());
            payroll.setStatus(false); // Trạng thái đã thanh toán
            payroll.setSalon(staff.getSalon()); // Gán salon

            // Lấy thông tin từ Account
            Account account = staff.getAccount();
            payroll.setName(account.getName());
            payroll.setEmail(account.getEmail());
            payroll.setPhone(account.getPhone());
            payroll.setRole(account.getRole());

            iPayrollRepository.save(payroll); // Lưu payroll vào cơ sở dữ liệu
        }
    }

    public double calculateTotalRevenue(int stylistId) {
    // Giả sử bạn có một phương thức trong service để lấy danh sách các dịch vụ hoàn thành của stylist
    List<Appointment> completedAppointments = appointmentService.getCompletedAppointmentsByStylist(stylistId);
    
    double totalRevenue = 0.0;
    for (Appointment appointment : completedAppointments) {
        // Giả sử Appointment có một phương thức để lấy danh sách dịch vụ
        List<SalonService> services = appointment.getServices(); // Giả sử Appointment có phương thức này
        
        for (SalonService service : services) {
            totalRevenue += service.getServicePrice(); // Cộng giá dịch vụ vào tổng doanh thu
        }
    }
    return totalRevenue;
}

    @Override
    @Transactional
    public Payroll updatePayroll(Payroll payroll) {
        payroll = iPayrollRepository.saveAndFlush(payroll);
        return payroll;
    }

    @Override
    public Payroll findPayrollById(int payrollId) {
        return iPayrollRepository.getReferenceById(payrollId);
    }
}
