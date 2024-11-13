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
        iPayrollRepository.save(payroll);
    }

    public List<Payroll> getPayrollBySalon(int salonId) {
        return iPayrollRepository.findBySalon_SalonId(salonId);
    }

    @Override
    public List<Payroll> getPayrollByStylist(int stylistId) {
        return iPayrollRepository.get(stylistId);
    }


//     @Scheduled(cron = "0 * * * * ?")
    @Scheduled(cron = "0 0 0 1 * ?")
    @Transactional
    public void calculateMonthlyPayroll() {
        List<Stylist> stylists = stylistService.getAllStylists();
        for (Stylist stylist : stylists) {
            double totalRevenue = calculateTotalRevenue(stylist.getStylistId());
            double commission = stylist.getCommission();
            
            double earning = (commission * totalRevenue) + stylist.getSalary();
    
            Payroll payroll = new Payroll();
            payroll.setEmployeeId(stylist.getStylistId());
            payroll.setEarning(earning);
            payroll.setPayrollDate(LocalDate.now());
            payroll.setStatus(false);
            payroll.setSalon(stylist.getSalon());
            Account account = stylist.getAccount();
            payroll.setName(account.getName());
            payroll.setEmail(account.getEmail());
            payroll.setPhone(account.getPhone());
            payroll.setRole(account.getRole());
            
            iPayrollRepository.save(payroll);
        }

        List<Staff> staffMembers = staffService.getAllStaffs();
        for (Staff staff : staffMembers) {
            double earning = staff.getSalary();

            Payroll payroll = new Payroll();
            payroll.setEmployeeId(staff.getSatffId());
            payroll.setEarning(earning);
            payroll.setPayrollDate(LocalDate.now());
            payroll.setStatus(false);
            payroll.setSalon(staff.getSalon());

            Account account = staff.getAccount();
            payroll.setName(account.getName());
            payroll.setEmail(account.getEmail());
            payroll.setPhone(account.getPhone());
            payroll.setRole(account.getRole());

            iPayrollRepository.save(payroll);
        }
    }

    public double calculateTotalRevenue(int stylistId) {
        LocalDate now = LocalDate.now();
        int currentMonth = now.getMonthValue();
        int currentYear = now.getYear();

        List<Appointment> completedAppointments = appointmentService.getCompletedAppointmentsByStylistForMonth(stylistId, currentMonth, currentYear);
    
        double totalRevenue = 0.0;
        for (Appointment appointment : completedAppointments) {
            List<SalonService> services = appointment.getServices();
            for (SalonService service : services) {
                totalRevenue += service.getServicePrice();
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
