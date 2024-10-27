package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.pojo.Stylist;
import com.swp391.hairsalon.service.IStaffService;
import com.swp391.hairsalon.service.IStylistservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/salary")
public class SalaryController {

    @Autowired
    private IStylistservice iStylistservice;

    @Autowired
    private IStaffService iStaffService;

    @PutMapping("/stylist/update/{id}")
    public ResponseEntity<Stylist> updateSalaryForStylist(@PathVariable String id, @RequestBody Stylist stylist) {
        return ResponseEntity.ok(iStylistservice.updateSalary(id, stylist));
    }

    @PutMapping("/staff/update/{id}")
    public ResponseEntity<Staff> updateSalaryForStylist(@PathVariable String id, @RequestBody Staff staff) {
        return ResponseEntity.ok(iStaffService.updateSalary(id, staff));
    }
}
