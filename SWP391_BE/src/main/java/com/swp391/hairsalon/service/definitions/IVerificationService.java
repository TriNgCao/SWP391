package com.swp391.hairsalon.service.definitions;

public interface IVerificationService {
    public void saveCode(String email, String code);
    public boolean verifyCode(String email, String code);
}
