package com.swp391.hairsalon.service.definitions;

public interface IEmailService {

    
    public boolean sendVerificationCode(String toEmail, String code);
}
