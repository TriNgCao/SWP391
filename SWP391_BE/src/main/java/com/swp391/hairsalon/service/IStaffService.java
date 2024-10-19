package com.swp391.hairsalon.service;

import com.swp391.hairsalon.pojo.Staff;

import java.util.List;

public interface IStaffService{
    public List<Staff> getStaffsBySalonId(int salonId);
    public Staff updateSalary(int staffId, int salary);
}
