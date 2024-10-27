package com.swp391.hairsalon.service;

import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.repository.IAccountRepository;
import com.swp391.hairsalon.repository.IStaffRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
        int staffId = iAccountRepository.getById(id).getStaff().getSatffId();
        Staff s = iStaffRepository.getReferenceById(staffId);
        s.setSalary(staff.getSalary());
        return iStaffRepository.save(s);
    }


}
