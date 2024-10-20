package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.pojo.Stylist;
import com.swp391.hairsalon.repository.IStylistRepository;
import com.swp391.hairsalon.service.definitions.IStylistservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StylistService implements IStylistservice{

    @Autowired
    private IStylistRepository iStylistRepository;

    @Override
    public List<Stylist> getStylistsBySalonId(int salonId) {
        return iStylistRepository.getStylistsBySalonId(salonId);
    }

    @Override
    public Stylist updateSalary(int stylistId, int salary, double commission) {
        Stylist s = iStylistRepository.getById(stylistId);
        s.setCommission(commission);
        s.setSalary(salary);
        return iStylistRepository.save(s);
    }

    @Override
    public Stylist getStylistById(int id) {
        return iStylistRepository.getReferenceById(id);
    }
}
