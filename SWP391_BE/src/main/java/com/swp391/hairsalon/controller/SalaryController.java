package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.StylistEarningsDTO;
import com.swp391.hairsalon.pojo.Payroll;
import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.pojo.Stylist;
import com.swp391.hairsalon.service.definitions.IPayrollService;
import com.swp391.hairsalon.service.definitions.IStaffService;
import com.swp391.hairsalon.service.definitions.IStylistservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/salary")
public class SalaryController {

    @Autowired
    private IStylistservice iStylistService;

    @Autowired
    private IStaffService iStaffService;

    @Autowired
    private IPayrollService iPayrollService;


    @PutMapping("/stylist/update/{id}")
    public ResponseEntity<Stylist> updateSalaryForStylist(@PathVariable String id, @RequestBody Stylist stylist) {
        return ResponseEntity.ok(iStylistService.updateSalary(id, stylist));
    }

    @PutMapping("/staff/update/{id}")
    public ResponseEntity<Staff> updateSalaryForStylist(@PathVariable String id, @RequestBody Staff staff) {
        return ResponseEntity.ok(iStaffService.updateSalary(id, staff));
    }

    @GetMapping("/stylist/{accountId}")
    public ResponseEntity<List<StylistEarningsDTO>> getSalaryAndCommission(@PathVariable String accountId) {
        Stylist stylists = iStylistService.getStylistByAccountId(accountId);
        List<StylistEarningsDTO> earningsList = new ArrayList<>();

        if (stylists == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.emptyList());
        }
            List<Payroll> payrollList = iPayrollService.getPayrollByStylist(stylists.getStylistId());

            for (Payroll payroll : payrollList) {
                LocalDate payrollDate = payroll.getPayrollDate();
                StylistEarningsDTO earningsDTO = new StylistEarningsDTO();
                earningsDTO.setSalary(stylists.getSalary());
                earningsDTO.setCommission(stylists.getCommission());
                earningsDTO.setCommissionAmount(stylists.getCommission() * payroll.getEarning());
                earningsDTO.setName(payroll.getName());
                earningsDTO.setEarning(payroll.getEarning());
                earningsDTO.setPayrollDate(payrollDate);
                earningsList.add(earningsDTO);
            }
        return ResponseEntity.ok(earningsList);
    }

    @GetMapping("/staff/{accountId}")
    public ResponseEntity<Integer> getSalary(@PathVariable String accountId){
        return ResponseEntity.ok(iStaffService.getSalary(accountId));
    }

}
