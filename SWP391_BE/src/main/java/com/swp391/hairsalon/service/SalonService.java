package com.swp391.hairsalon.service;

import com.swp391.hairsalon.dto.SalonDto;
import com.swp391.hairsalon.dto.SalonInfoDto;
import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Salon;
import com.swp391.hairsalon.repository.ISalonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SalonService implements ISalonService{

    @Autowired
    private ISalonRepository iSalonRepository;

    @Override
    public Salon createSalon(Salon salon) {
        return iSalonRepository.save(salon);
    }

    @Override
    public Salon updateSalon(int id, Salon salon) {
        Salon s = iSalonRepository.getById(id);
        if (s != null) {
            s.setSalonAddress(salon.getSalonAddress());
            s.setSalonName(salon.getSalonName());
            s.setSalonStatus(salon.isSalonStatus());
            s.setImageName(salon.getImageName());
            return iSalonRepository.save(s);

        }

        return null;
    }

    @Override
    public List<SalonInfoDto> getAllSalons() {
        return iSalonRepository.getAllSalons();
    }

    @Override
    public List<SalonInfoDto> getActiveSalons() {
        return iSalonRepository.getActiveSalons();
    }


//    @Override
//    public com.swp391.hairsalon.pojo.SalonService updateCombo(int salonId, com.swp391.hairsalon.pojo.SalonService service) {
//        Optional<com.swp391.hairsalon.pojo.SalonService> existingService = salonServiceRepository.findById(serviceId);
//        if (existingService.isPresent()) {
//            com.swp391.hairsalon.pojo.SalonService updatedService = existingService.get();
//            updatedService.setServiceName(service.getServiceName());
//            updatedService.setServiceDescription(service.getServiceDescription());
//            updatedService.setServicePrice(service.getServicePrice());
//            updatedService.setCategory(service.getCategory());
//            updatedService.setMaxTime(service.getMaxTime());
//            return salonServiceRepository.save(updatedService);
//        }
//        return null; // Or throw an exception if service not found
//    }

    @Override
    public Salon getSalonById(int id) {
        return iSalonRepository.getReferenceById(id);
    }

    @Override
    public String getSalonNameBySalonId(int id) {

        return getSalonNameBySalonId(iSalonRepository.getReferenceById(id).getSalonId());
    }

    @Override
    public List<SalonDto> getSalonNameActive() {
        return iSalonRepository.getSalonNameActive();
    }


}
