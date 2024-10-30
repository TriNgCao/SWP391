package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.dto.SalonDto;
import com.swp391.hairsalon.dto.SalonInfoDto;
import com.swp391.hairsalon.pojo.Salon;
import com.swp391.hairsalon.pojo.SalonService;

import java.util.List;

public interface ISalonService {
    public Salon createSalon(Salon salon);

    public Salon updateSalon(int id, Salon salon);

    public Salon getSalonById(int id);

    public String getSalonNameBySalonId(int id);

    public List<SalonDto> getSalonNameActive();

    public List<SalonInfoDto> getAllSalons();

    List<SalonInfoDto> getActiveSalons();


}
