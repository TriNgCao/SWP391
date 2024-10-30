package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.pojo.Payroll;
import com.swp391.hairsalon.service.definitions.IPayrollService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payroll")
public class PayrollController {

    @Autowired
    private IPayrollService iPayrollService;

    @PostMapping("/save")
    public ResponseEntity<String> savePayroll(@RequestBody Payroll payroll) {
        iPayrollService.savePayroll(payroll);
        return ResponseEntity.ok("Payroll saved successfully!");
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<Payroll>> getPayrollBySalon(@PathVariable int salonId) {
        List<Payroll> payrolls = iPayrollService.getPayrollBySalon(salonId);
        return ResponseEntity.ok(payrolls);
    }

}
