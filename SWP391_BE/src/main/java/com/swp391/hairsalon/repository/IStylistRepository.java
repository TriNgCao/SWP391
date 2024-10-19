package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.pojo.Stylist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IStylistRepository extends JpaRepository<Stylist, Integer> {
    @Query("Select s from Stylist s where s.salon.salonId = :id")
    List<Stylist> getStylistsBySalonId(@Param("id") int id);
}
