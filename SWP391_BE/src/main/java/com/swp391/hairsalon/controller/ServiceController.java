package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.pojo.SalonService;
import com.swp391.hairsalon.service.impl.SalonServiceService;

import com.swp391.hairsalon.service.impl.FileService;
import com.swp391.hairsalon.service.definitions.IFileService;
//import com.swp391.hairsalon.service.SalonServiceService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/services")
public class ServiceController {

    @Value("${project.image}")
    private String path;

    @Autowired
     private IFileService iFileService;

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

    @GetMapping("/fetchAll")
    public List<SalonService> getAllServices() {
        return salonServiceService.getAllServices();
    }

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.CREATED)
    public SalonService createNewService(@RequestBody SalonService service){
//        String fileName = iFileService.uploadImage(path, image);
//        service.setImageName(fileName);
        return salonServiceService.addService(service);
    }

    @PostMapping("image/upload/{serviceId}")
    @ResponseStatus(HttpStatus.CREATED)
    public SalonService createNewService(@RequestParam("image") MultipartFile image, @PathVariable int serviceId) throws IOException {
        String fileName = iFileService.uploadImage(path, image);
        SalonService service = salonServiceService.getServiceById(serviceId);
        service.setImageName(fileName);
        return salonServiceService.updateCombo((long) serviceId, service);

    }

    @GetMapping(value = "/image/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(@PathVariable("imageName") String imageName, HttpServletResponse response) throws IOException {
        InputStream resource = iFileService.downloadImage(path, imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource, response.getOutputStream());
    }

    @PutMapping("/{serviceId}")
    public SalonService updateService(@PathVariable Long serviceId, @RequestBody SalonService service) {
        return salonServiceService.updateCombo(serviceId, service);
    }
}
