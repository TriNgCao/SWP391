package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.EmployeeInfoDTO;
import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Manager;
import com.swp391.hairsalon.service.definitions.IAccountService;

//import com.swp391.hairsalon.service.IManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class AccountController {
    @Autowired
    private IAccountService iAccountService;

////    @Autowired
//    private IManagerService iManagerService;


    @PostMapping("/create")
    @ResponseStatus(HttpStatus.CREATED)
    public Account saveCustomers(@RequestBody Account account) {

        return iAccountService.addAccount(account);
    }

    @PostMapping("/insert/{salonId}")
    @ResponseStatus(HttpStatus.CREATED)
    public Account saveManager(@PathVariable int salonId, @RequestBody Account account) {

        return iAccountService.insertAccount(salonId, account);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable String id) {

        return ResponseEntity.ok(iAccountService.getAccountById(id));
    }

    @GetMapping("/fetchAllCustomer")
    public ResponseEntity<List<Account>> getAllCustomers() {
        return ResponseEntity.ok(iAccountService.getAllCustomer());
    }

    @GetMapping("/fetchAllEmployees")
    public ResponseEntity<List<EmployeeInfoDTO>> getAllEmployees() {
        return ResponseEntity.ok(iAccountService.getAllEmployees());
    }

    @PutMapping("update/{id}")
    public ResponseEntity<Account> updateEmployee(@PathVariable String id, @RequestBody Account account) {
        return ResponseEntity.ok(iAccountService.updateAccount(id, account));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable String id){
        iAccountService.deleteAccount(id);
        return ResponseEntity.ok("Employee deleted");
    }


}
