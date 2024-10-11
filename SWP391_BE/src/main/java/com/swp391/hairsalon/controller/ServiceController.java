package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.pojo.SalonService;
import com.swp391.hairsalon.service.SalonServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private SalonServiceService salonServiceService;

    @GetMapping("/price")
    public List<SalonService> sortByPrice(@RequestParam double minPrice, @RequestParam double maxPrice) {
        return salonServiceService.getServiceByPrice(minPrice, maxPrice);
    }

    @GetMapping("/search")
    public List<SalonService> searchByName(@RequestParam String name) {
        return salonServiceService.getServiceByName(name);
    }

    @GetMapping
    public List<SalonService> getAllServices() {
        return salonServiceService.getAllServices();
    }

    @PostMapping
    public SalonService createNewService(@RequestBody SalonService service) {
        return salonServiceService.addService(service);
    }

    @PutMapping("/{serviceId}")
    public SalonService updateService(@PathVariable Long serviceId, @RequestBody SalonService service) {
        return salonServiceService.updateCombo(serviceId, service);
    }
}
