package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.pojo.SalonService;
import com.swp391.hairsalon.repository.ISalonServiceRepository;
import com.swp391.hairsalon.service.definitions.ISalonServiceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalonServiceService implements ISalonServiceService {

    @Autowired
    private ISalonServiceRepository salonServiceRepository;

    @Override
    public List<SalonService> getServiceByPrice(double minPrice, double maxPrice) {
        return salonServiceRepository.findByServicePriceBetween(minPrice, maxPrice);
    }

    @Override
    public List<SalonService> getServiceByName(String serviceName) {
        return salonServiceRepository.findByServiceNameContaining(serviceName);
    }

    @Override
    public List<SalonService> getAllServices() {
        return salonServiceRepository.findAll();
    }

    

    @Override
    public SalonService addService(SalonService service) {
        return salonServiceRepository.save(service);
    }

    @Override
    public SalonService updateCombo(Long serviceId, SalonService service) {
        Optional<SalonService> existingService = salonServiceRepository.findById(serviceId);
        if (existingService.isPresent()) {
            SalonService updatedService = existingService.get();
            updatedService.setServiceName(service.getServiceName());
            updatedService.setServiceDescription(service.getServiceDescription());
            updatedService.setServicePrice(service.getServicePrice());
            updatedService.setCategory(service.getCategory());
            updatedService.setMaxTime(service.getMaxTime());
            return salonServiceRepository.save(updatedService);
        }
        return null; // Or throw an exception if service not found
    }

    @Override
    public int getTotalDurationBySalonId(List<Integer> serviceId) {
        int duration = 0;
        for(Integer i : serviceId) {
            duration += salonServiceRepository.getById((long) i).getMaxTime();
        }
        return duration;
    }

    @Override
    public SalonService getServiceById(Long serviceId) {
        return salonServiceRepository.getReferenceById(serviceId);
    }

    
}
