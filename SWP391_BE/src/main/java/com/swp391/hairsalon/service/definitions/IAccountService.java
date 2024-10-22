package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.dto.EmployeeInfoDTO;
import com.swp391.hairsalon.pojo.Account;

import java.util.List;
import java.util.Optional;

public interface IAccountService {
    public List<EmployeeInfoDTO> getAllEmployees();
    public List<Account> getAllCustomer();
    public Account getAccountById(String id);
    public Account addAccount(Account account);
    public Account insertAccount(int salonId, Account account);
    public Account updateAccount(String id, Account account);
    public boolean isEmailExist(String email);
    public void deleteAccount(String id);
    public void setPassword(String email, String password);
}
