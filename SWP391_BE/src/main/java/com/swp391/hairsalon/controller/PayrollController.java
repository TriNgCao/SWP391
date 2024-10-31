package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.pojo.Payroll;
import com.swp391.hairsalon.service.definitions.IManagerService;
import com.swp391.hairsalon.service.definitions.IPayrollService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private IPayrollService iPayrollService;
    @Autowired
    private IManagerService iManagerService;

    @PostMapping("/save")
    public ResponseEntity<String> savePayroll(@RequestBody Payroll payroll) {
        iPayrollService.savePayroll(payroll);
        return ResponseEntity.ok("Payroll saved successfully!");
    }

    @GetMapping("/salon/{accountId}")
    public ResponseEntity<List<Payroll>> getPayrollBySalon(@PathVariable String accountId) {
        int salonId = iManagerService.findByAccountId(accountId).getSalon().getSalonId();
        List<Payroll> payrolls = iPayrollService.getPayrollBySalon(salonId);
        return ResponseEntity.ok(payrolls);
    }

    @PutMapping("/{payrollId}/{status}")
    public ResponseEntity<String> updatePayrollStatus(@PathVariable int payrollId, @PathVariable boolean status) {
        Payroll payroll = iPayrollService.findPayrollById(payrollId);
        payroll.setStatus(status);
        payroll = iPayrollService.updatePayroll(payroll);
        return ResponseEntity.ok("Update success!");
    }

}
