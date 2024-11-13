package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.dto.StylistInfoForBooking;
import com.swp391.hairsalon.dto.StylistListDto;
import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.pojo.Stylist;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface IStylistservice {
    public List<Stylist> getStylistsBySalonId(int salonId);

    public Stylist updateSalary(String id, Stylist stylist);

    public List<StylistInfoForBooking> getStylists(int salonId);

    // public Stylist updateSalary(int stylistId, int salary, double commission);
    public Stylist getStylistById(int id);

    List<StylistListDto> getStylistLists(String id);

    Stylist getStylistByAccountId(String accountId);

    @Query("SELECT s FROM Stylist s WHERE s.account.id = :accountId")
    Stylist findByStylistAccountId(@Param("accountId") String accountId);
}
