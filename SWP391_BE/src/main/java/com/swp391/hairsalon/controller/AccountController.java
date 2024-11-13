package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.*;
import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Manager;
import com.swp391.hairsalon.pojo.SalonService;
import com.swp391.hairsalon.service.definitions.IAccountService;

//import com.swp391.hairsalon.service.IManagerService;
import com.swp391.hairsalon.service.definitions.ICustomerService;
import com.swp391.hairsalon.service.definitions.IFileService;
import com.swp391.hairsalon.service.definitions.IStylistservice;
import com.swp391.hairsalon.service.impl.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/user")
public class AccountController {
    @Value("${project.image}")
    private String path;
    @Autowired
    private IFileService iFileService;
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
    @PutMapping("/reset-pass")
    public ResponseEntity<String> resetPass(@RequestParam String email, @RequestParam String password) {
        iAccountService.setPassword(email, password);
        return ResponseEntity.ok("Reset password successful");

    }
    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable String id) {

        return ResponseEntity.ok(iAccountService.getAccountById(id));
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<AccountProfileDTO> getProfile(@PathVariable String id) {

        return ResponseEntity.ok(iAccountService.getProfileById(id));
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

    @PostMapping("image/profile/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public Account createNewAccount(@RequestParam("image") MultipartFile image, @PathVariable String id) throws IOException {
        String fileName = iFileService.uploadImage(path, image);
        Account service = iAccountService.getAccountById(id);
        service.setImageName(fileName);
        return iAccountService.updateAccount(id, service);
    }
}
