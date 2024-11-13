package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.dto.StylistInfoForBooking;
import com.swp391.hairsalon.dto.StylistListDto;
import com.swp391.hairsalon.pojo.Stylist;
import com.swp391.hairsalon.repository.IAccountRepository;
import com.swp391.hairsalon.repository.IStylistRepository;
import com.swp391.hairsalon.service.definitions.IStylistservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StylistService implements IStylistservice{
    @Autowired
    private IAccountRepository iAccountRepository;

    @Autowired
    private IStylistRepository iStylistRepository;

    @Override
    public List<Stylist> getStylistsBySalonId(int salonId) {
        return iStylistRepository.getStylistsBySalonId(salonId);
    }

    @Override
    public Stylist updateSalary(String id, Stylist stylist) {
        int stylistId = iAccountRepository.getById(id).getStylist().getStylistId();
        Stylist s = iStylistRepository.getById(stylistId);
        s.setCommission(stylist.getCommission());
        s.setSalary(stylist.getSalary());
        return iStylistRepository.save(s);
    }

    @Override
    public List<StylistInfoForBooking> getStylists(int salonId) {
        return iStylistRepository.getStylistInfoForBooking( salonId);
    }


    @Override
    public Stylist getStylistById(int id) {

        return iStylistRepository.getReferenceById(id);
    }

    @Override
    public List<StylistListDto> getStylistLists(String id) {
        return iStylistRepository.getStylistList(id);
    }

    @Override
    public Stylist getStylistByAccountId(String accountId) {
        return iStylistRepository.getStylistByAccountId(accountId);
    }

    public List<Stylist> getAllStylists(){
        return iStylistRepository.findAll();
    }

    public Stylist findByStylistAccountId(String accountId){
        return iStylistRepository.findByStylistAccountId(accountId);
    }
}
