package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.pojo.Staff;

import java.util.List;

public interface IStaffService{
    public List<Staff> getStaffsBySalonId(int salonId);
    public Staff getStaffByAccountId (String accountId);
    public Staff updateSalary(String id, Staff staff);
    public List<Staff> getAllStaffs();
}
