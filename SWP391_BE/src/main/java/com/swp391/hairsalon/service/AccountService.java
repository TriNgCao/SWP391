package com.swp391.hairsalon.service;

import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.repository.IAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private IAccountRepository iAccountRepository;

    @Override
    public Account addAccount(Account account) {
        return iAccountRepository.save(account);

    }

    @Override
    public List<Account> getAllEmployees() {
        return iAccountRepository.findByRoleNot(1);
    }

    @Override
    public List<Account> getAllCustomer() {
        return iAccountRepository.findByRole(1);
    }

    @Override
    public Account getAccountById(String id) {
        return iAccountRepository.searchById(id);
    }

    @Override
    public Account updateAccount(String id, Account naccount) {

        Account a = iAccountRepository.searchById(id);
        if (a != null) {
            a.setName(naccount.getName());
            a.setPhone(naccount.getPhone());
            return iAccountRepository.save(a);
        }
        return a;
    }

    @Override
    public boolean isEmailExist(String email) {
        boolean check = false;
        Account a = iAccountRepository.searchByEmail(email);
        if (a != null) {
            check = true;
        }
        return check;
    }

    @Override
    public void deleteAccount(String id) {
        iAccountRepository.deleteUserById(id);

    }
}
