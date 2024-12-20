package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.pojo.SalonService;

import java.util.List;

public interface ISalonServiceService {
    List<SalonService> getServiceByPrice(double minPrice, double maxPrice);
    List<SalonService> getServiceByName(String serviceName);
    List<SalonService> getAllServices();
    SalonService addService(SalonService service);
    SalonService updateCombo(int serviceId, SalonService service);
    SalonService getServiceById(int serviceId);
    int getTotalDurationBySalonId(List<Integer> serviceId);
}
