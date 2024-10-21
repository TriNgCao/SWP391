package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.pojo.Salon;

import java.util.List;

public interface ISalonService {
    public Salon createSalon(Salon salon);
    public List<Salon> getAllSalons();
    public Salon getSalonById(int id);
}
