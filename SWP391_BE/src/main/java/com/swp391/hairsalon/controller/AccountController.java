package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.CustomerInfoDto;
import com.swp391.hairsalon.dto.EmployeeInfoDto;
import com.swp391.hairsalon.dto.PersonnelBySalonDto;
import com.swp391.hairsalon.dto.StylistInfoForBooking;
import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Manager;
import com.swp391.hairsalon.service.definitions.IAccountService;

//import com.swp391.hairsalon.service.IManagerService;
import com.swp391.hairsalon.service.definitions.ICustomerService;
import com.swp391.hairsalon.service.definitions.IStylistservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class AccountController {

    @Autowired
    private IAccountService iAccountService;

    @Autowired
    private ICustomerService iCustomerService;

    @Autowired
    private IStylistservice iStylistservice;

////    @Autowired
//    private IManagerService iManagerService;


//    @PostMapping("/create")
//    @ResponseStatus(HttpStatus.CREATED)
//    public Account saveCustomers(@RequestBody Account account) {
//
//        return iAccountService.addAccount(account);
//    }

    @PostMapping("/insert/{salonId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Account saveManager(@PathVariable int salonId, @RequestBody Account account) {

        return iAccountService.insertAccount(salonId, account);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable String id) {

        return ResponseEntity.ok(iAccountService.getAccountById(id));
    }

//    @GetMapping("/fetchAllCustomer")
//    public ResponseEntity<List<Account>> getAllCustomers() {
//        return ResponseEntity.ok(iAccountService.getAllCustomer());
//    }

    @GetMapping("/fetchAllEmployees")
    public ResponseEntity<List<EmployeeInfoDto>> getAllEmployees() {
        return ResponseEntity.ok(iAccountService.getAllEmployees());
    }

    @GetMapping("/fetchEmployees/{id}")
    public ResponseEntity<List<PersonnelBySalonDto>> getEmployeeById(@PathVariable String id) {
        return ResponseEntity.ok(iAccountService.getAllPersonnelBySalon(id));
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Account> updateEmployee(@PathVariable String id, @RequestBody Account account) {
        return ResponseEntity.ok(iAccountService.updateAccount(id, account));
    }

    @PutMapping("update-status/{id}")
    public ResponseEntity<Account> updateStatus(@PathVariable String id, @RequestParam boolean status) {
        return ResponseEntity.ok(iAccountService.updateStatus(id, status));
    }

    @GetMapping("/customers")
    public  ResponseEntity<List<CustomerInfoDto>> getAllCustomers() {
        return ResponseEntity.ok(iAccountService.getAllCustomers());
    }

    @GetMapping("/customer/point/{id}")
    public int getPoint(@PathVariable int id) {
        return iCustomerService.getCustomerById(id).getLoyaltyPoints();
    }



    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String id){
        iAccountService.deleteAccount(id);
        return ResponseEntity.ok("Employee deleted");
    }

    @GetMapping("/stylists/{salonId}")
    public ResponseEntity<List<StylistInfoForBooking>> getAllStylists(@PathVariable int salonId) {
        return ResponseEntity.ok(iStylistservice.getStylists(salonId));
    }


}
