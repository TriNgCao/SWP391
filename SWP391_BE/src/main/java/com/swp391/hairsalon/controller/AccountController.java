package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.service.IAccountService;
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

    @PostMapping("/insert")
    @ResponseStatus(HttpStatus.CREATED)
    public Account saveEmployees(@RequestBody Account account) {
        return iAccountService.addAccount(account);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Account> getAccount(@PathVariable String id) {

        return ResponseEntity.ok(iAccountService.getAccountById(id));
    }

    @GetMapping("/fetchAllCustomer")
    public ResponseEntity<List<Account>> getAllCustomers() {
        return ResponseEntity.ok(iAccountService.getAllCustomer());
    }

    @GetMapping("/fetchAllEmployee")
    public ResponseEntity<List<Account>> getAllEmployees() {
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
