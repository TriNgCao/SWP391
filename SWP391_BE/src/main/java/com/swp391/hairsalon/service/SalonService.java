package com.swp391.hairsalon.service;

import com.swp391.hairsalon.pojo.Salon;
import com.swp391.hairsalon.repository.ISalonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SalonService implements ISalonService{

    @Autowired
    private ISalonRepository iSalonRepository;

    @Override
    public Salon createSalon(Salon salon) {
        return iSalonRepository.save(salon);
    }

    @Override
    public List<Salon> getAllSalons() {
        return iSalonRepository.findAll();
    }

    @Override
    public Salon getSalonById(int id) {
        return iSalonRepository.getReferenceById(id);
    }


}
