package com.swp391.hairsalon.service;

import com.swp391.hairsalon.pojo.SalonService;
import com.swp391.hairsalon.repository.ISalonServiceRepository;
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
            updatedService.setMaxTime(service.getMaxTime());
            return salonServiceRepository.save(updatedService);
        }
        return null; // Or throw an exception if service not found
    }
}
