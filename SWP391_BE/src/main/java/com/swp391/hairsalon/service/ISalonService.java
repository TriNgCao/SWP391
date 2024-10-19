package com.swp391.hairsalon.service;

import com.swp391.hairsalon.pojo.SalonService;

import java.util.List;

public interface ISalonService {
    List<SalonService> getServiceByPrice(double minPrice, double maxPrice);
    List<SalonService> getServiceByName(String serviceName);
    List<SalonService> getAllServices();
    SalonService addService(SalonService service);
    SalonService updateCombo(Long serviceId, SalonService service);
}
