package com.swp391.hairsalon.service;

import com.swp391.hairsalon.pojo.Account;

import java.util.List;

public interface IAccountService {
    public List<Account> getAllEmployees();
    public List<Account> getAllCustomer();
    public Account getAccountById(String id);
    public Account addAccount(Account account);
    public Account updateAccount(String id, Account account);
    public boolean isEmailExist(String email);
    public void deleteAccount(String id);
}
