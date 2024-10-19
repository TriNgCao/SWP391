package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.pojo.Salon;
import com.swp391.hairsalon.service.ISalonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/salon")
public class SalonController {
    @Autowired
    private ISalonService iSalonService;

    @GetMapping("/salons")
    public ResponseEntity<List<Salon>> getAllSalons() {
        return ResponseEntity.ok(iSalonService.getAllSalons());
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.OK)
    public Salon save(@RequestBody Salon salon) {
        return iSalonService.createSalon(salon);
    }
}
