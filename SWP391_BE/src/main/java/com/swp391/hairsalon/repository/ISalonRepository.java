package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.dto.SalonDto;
import com.swp391.hairsalon.dto.SalonInfoDto;
import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Salon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ISalonRepository extends JpaRepository<Salon, Integer> {



    @Query("Select new com.swp391.hairsalon.dto.SalonDto(s.salonId, s.salonName)  from Salon s where s.salonStatus = true ")
    List<SalonDto> getSalonNameActive();

    @Query("Select new com.swp391.hairsalon.dto.SalonInfoDto(s.salonId, s.salonName, s.salonAddress, s.salonStatus, s.imageName)  from Salon s")
    List<SalonInfoDto> getAllSalons();

    @Query("Select new com.swp391.hairsalon.dto.SalonInfoDto(s.salonId, s.salonName, s.salonAddress, s.salonStatus, s.imageName)  " +
            "from Salon s " +
            "where s.salonStatus = true")
    List<SalonInfoDto> getActiveSalons();
}
