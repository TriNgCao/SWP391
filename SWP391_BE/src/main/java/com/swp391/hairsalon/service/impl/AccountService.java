package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.dto.CustomerInfoDto;
import com.swp391.hairsalon.dto.CustomerProfileDto;
import com.swp391.hairsalon.dto.EmployeeInfoDto;
import com.swp391.hairsalon.dto.PersonnelBySalonDto;
import com.swp391.hairsalon.pojo.*;
import com.swp391.hairsalon.repository.*;
import com.swp391.hairsalon.service.definitions.IAccountService;
import com.swp391.hairsalon.service.definitions.ISalonService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class AccountService implements IAccountService {

    @Autowired
    private ISalonRepository iSalonRepository;

    @Autowired
    private IManagerRepository iManagerRepository;

    @Autowired
    private IStaffRepository iStaffRepository;

    @Autowired
    private IStylistRepository iStylistRepository;

    @Autowired
    private ICustomerRepository iCustomerRepository;

    @Autowired
    private IAccountRepository iAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Account addAccount(Account account) {

        if (account.getPassword() != null) {
            account.setPassword(passwordEncoder.encode(account.getPassword()));
        }
        account.setId(UUID.randomUUID().toString());

        account.setActive(true);
        account.setRole(1);
        account.setRegisterDate(Date.valueOf(LocalDate.now()));
//        String password = passwordEncoder.encode(account.getPassword());
        Account savedAccount = iAccountRepository.save(account);

            Customer customer = new Customer();
            customer.setAccount(account); // Gán Account cho Customer
            customer.setLoyaltyPoints(0); // Khởi tạo điểm loyalty
            iCustomerRepository.save(customer); // Lưu Customer vào cơ sở dữ liệu

        return savedAccount;

    }
    @Override
    public Account insertAccount(int salonId, Account account) {
        if (account.getPassword() != null) {
            account.setPassword(passwordEncoder.encode(account.getPassword()));
        }
        account.setActive(true);
        account.setId(UUID.randomUUID().toString());
        Account savedAccount = iAccountRepository.save(account);

        Salon s = iSalonRepository.getById(salonId);

        if (account.getRole() == 2){
            Stylist stylist = new Stylist();
            stylist.setSalon(s);
            stylist.setAccount(account);
            stylist.setCommission(0);
            stylist.setSalary(0);
            iStylistRepository.save(stylist);
        }
        if (account.getRole() == 3){
            Staff staff = new Staff();
            staff.setSalon(s);
            staff.setAccount(account);
            staff.setSalary(0);
            iStaffRepository.save(staff);
        }
            if(account.getRole() == 4){
                Manager manager = new Manager();
                manager.setAccount(account);
                manager.setSalon(s);
                iManagerRepository.save(manager);
            }

        return savedAccount;

    }


    @Override
    public List<EmployeeInfoDto> getAllEmployees() {

        return iAccountRepository.getAllEmployees();
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
//            a.setPassword(passwordEncoder.encode(naccount.getPassword()));
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

    @Override
    public void setPassword(String email, String password) {
        Account a = iAccountRepository.searchByEmail(email);
        a.setPassword(passwordEncoder.encode(password));
         iAccountRepository.save(a);
    }

    @Override
    public Account updateStatus(String id, boolean status) {
        Account a = iAccountRepository.searchById(id);
        a.setActive(status);
        return iAccountRepository.save(a);
    }

    @Override
    public List<PersonnelBySalonDto> getAllPersonnelBySalon(String id) {
        return iAccountRepository.getPersonnelBySalon(id);
    }

    @Override
    public List<CustomerInfoDto> getAllCustomers() {
        return iAccountRepository.getCustomerInfo();
    }

    @Override
    public CustomerProfileDto getCustomerProfile(String id) {
        return iAccountRepository.getCustomerProfileById(id);
    }

    @Override
    public boolean isActive(String email) {
        return iAccountRepository.searchByEmail(email).isActive();
    }

    @Override
    public int getCustomerIdByAccountID(String accountID) {
        return iAccountRepository.getCusIdByAccountId(accountID);
    }
}
