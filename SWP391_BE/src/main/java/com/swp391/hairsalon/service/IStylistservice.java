package com.swp391.hairsalon.service;

import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.pojo.Stylist;

import java.util.List;

public interface IStylistservice {
    public List<Stylist> getStylistsBySalonId(int salonId);
    public Stylist updateSalary(int stylistId, int salary, double commission);
}
