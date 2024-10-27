package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.CustomerInfoDto;
import com.swp391.hairsalon.dto.CustomerProfileDto;
import com.swp391.hairsalon.repository.IAccountRepository;
import com.swp391.hairsalon.service.definitions.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/profile")
public class ProfileController {
    @Autowired
    private IAccountService iAccountService;

    @GetMapping("/customer/{id}")
    public ResponseEntity<CustomerProfileDto> getCustomer(@PathVariable String id) {
       return ResponseEntity.ok(iAccountService.getCustomerProfile(id));
    }
}
