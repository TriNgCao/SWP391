package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.dto.StylistInfoForBooking;
import com.swp391.hairsalon.dto.StylistListDto;
import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.pojo.Stylist;

import java.util.List;

public interface IStylistservice {
    public List<Stylist> getStylistsBySalonId(int salonId);
    public Stylist updateSalary(String id, Stylist stylist);
    public List<StylistInfoForBooking> getStylists(int salonId);
//    public Stylist updateSalary(int stylistId, int salary, double commission);
    public Stylist getStylistById(int id);
    List<StylistListDto> getStylistLists(String id);
}
