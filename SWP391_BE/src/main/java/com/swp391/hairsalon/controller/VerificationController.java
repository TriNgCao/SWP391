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

    @PostMapping("/send-code/verify/{email}")
    public ResponseEntity<?> sendVerificationCodeForResetPassword(@PathVariable String email) {
        if (!iAccountService.emailExists(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email does not exist", "status", "failure"));
        }

        String code = CodeGenerator.generateCode();
        boolean emailSent = emailService.sendVerificationCode(email, code);
        if (emailSent) {
            verificationService.saveCode(email, code);
            return ResponseEntity.ok(Map.of("message", "Code sent", "status", "success"));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Cannot Send Email", "status", "failure"));
        }
    }

    @PostMapping("/send-code/register/{email}")
    public ResponseEntity<?> sendVerificationCodeForRegister(@PathVariable String email) {
        if (iAccountService.emailExists(email)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("message", "Email already exists", "status", "failure"));
        }

        String code = CodeGenerator.generateCode();
        boolean emailSent = emailService.sendVerificationCode(email, code);
        if (emailSent) {
            verificationService.saveCode(email, code);
            return ResponseEntity.ok(Map.of("message", "Code sent", "status", "success"));
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Cannot Send Email", "status", "failure"));
        }
    }

    @PostMapping("/verify-code/{email}/{code}")
    public ResponseEntity<?> verifyCode(@PathVariable String email, @PathVariable String code) {
        boolean isValid = verificationService.verifyCode(email, code);

        if (isValid) {
            return ResponseEntity.ok(Map.of("message", "Code valid", "status", "success"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Code invalid or out of time", "status", "failure"));
        }
    }
}
