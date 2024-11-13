package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.repository.IAccountRepository;
import com.swp391.hairsalon.repository.IStaffRepository;
import com.swp391.hairsalon.service.definitions.IStaffService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.relational.core.sql.In;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService implements   IStaffService{

    @Autowired
    private IAccountRepository iAccountRepository;

    @Autowired
    private IStaffRepository iStaffRepository;

    @Override
    public List<Staff> getStaffsBySalonId(int salonId) {
        return iStaffRepository.getStaffsBySalonId(salonId);
    }

    @Override
    public Staff updateSalary(String id, Staff staff) {
        int staffId = iAccountRepository.getById(id).getStaff().getStaffId();
        Staff s = iStaffRepository.getReferenceById(staffId);
        s.setSalary(staff.getSalary());
        return iStaffRepository.save(s);
    }

    @Override
    public Staff getStaffByAccountId(String accountId) {
        return iStaffRepository.getStaffByAccount_Id(accountId);
    }

    public List<Staff> getAllStaffs (){
        return iStaffRepository.findAll();
    }

    @Override
    public Integer getSalary(String id){
        return iStaffRepository.getStaffSalaryByAccountId(id);
    }

}
