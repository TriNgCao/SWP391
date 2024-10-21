package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.repository.IStaffRepository;
import com.swp391.hairsalon.service.definitions.IStaffService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService implements   IStaffService{

    @Autowired
    private IStaffRepository iStaffRepository;

    @Override
    public List<Staff> getStaffsBySalonId(int salonId) {
        return iStaffRepository.getStaffsBySalonId(salonId);
    }

    @Override
    public Staff updateSalary(int staffId, int salary) {
        Staff s = iStaffRepository.getReferenceById(staffId);
        s.setSalary(salary);
        return iStaffRepository.save(s);
    }


}
