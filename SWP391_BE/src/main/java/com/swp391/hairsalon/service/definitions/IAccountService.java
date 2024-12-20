package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.dto.*;
import com.swp391.hairsalon.pojo.Account;

import java.util.List;

public interface IAccountService {
    public List<EmployeeInfoDto> getAllEmployees();
    public List<Account> getAllCustomer();
    public Account getAccountById(String id);
    public AccountProfileDTO getProfileById(String id);
    public Account addAccount(Account account);
    public Account insertAccount(int salonId, Account account);
    public Account updateAccount(String id, Account account);

    Account updateAccountProfile(String id, AccountProfileDTO request);

    public boolean isEmailExist(String email);
    public void deleteAccount(String id);
    public void setPassword(String email, String password);
    Account updateStatus(String id, boolean status);
    List<PersonnelBySalonDto> getAllPersonnelBySalon(String id);
    List<CustomerInfoDto> getAllCustomers();
    CustomerProfileDto getCustomerProfile(String id);
    boolean isActive(String email);
    public int getCustomerIdByAccountID(String accountID);
    public boolean emailExists(String email);

}
