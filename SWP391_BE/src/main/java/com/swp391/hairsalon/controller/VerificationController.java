package com.swp391.hairsalon.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swp391.hairsalon.service.definitions.IAccountService;
import com.swp391.hairsalon.service.definitions.IEmailService;
import com.swp391.hairsalon.service.definitions.IVerificationService;
import com.swp391.hairsalon.utils.CodeGenerator;

@RestController
@RequestMapping("/api/email")
public class VerificationController {

    @Autowired
    private IEmailService emailService;

    @Autowired
    private IVerificationService verificationService;

    @Autowired
    private IAccountService iAccountService;

    @PostMapping("/send-code/{accountId}")
    public ResponseEntity<?> sendVerificationCode(@PathVariable String accountId) {
        String code = CodeGenerator.generateCode(); // Giả định bạn có một lớp CodeGenerator để tạo mã
        String email = iAccountService.getAccountById(accountId).getEmail();
        boolean emailSent = emailService.sendVerificationCode(email, code);
        
        if (emailSent) {
            verificationService.saveCode(email, code); // Lưu mã sau khi gửi
            return ResponseEntity.ok(Map.of("message", "Code sended", "status", "success"));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", "Cannot Send Email", "status", "failure"));
        }
    }

    @PostMapping("/verify-code/{accountId}/{code}")
    public ResponseEntity<?> verifyCode(@PathVariable String accountId, @PathVariable String code) {
        String email = iAccountService.getAccountById(accountId).getEmail();
        boolean isValid = verificationService.verifyCode(email, code);

        if (isValid) {
            return ResponseEntity.ok(Map.of("message", "Code valid", "status", "success"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Code invalid or out of time", "status", "failure"));
        }
    }
}