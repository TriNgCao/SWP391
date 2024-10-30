package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.SalonDto;
import com.swp391.hairsalon.dto.SalonInfoDto;
import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Salon;
import com.swp391.hairsalon.service.definitions.ISalonService;

import com.swp391.hairsalon.pojo.SalonService;
import com.swp391.hairsalon.service.definitions.IFileService;
//import com.swp391.hairsalon.service.ISalonService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@RestController
@RequestMapping("/salon")
public class SalonController {

    @Autowired
    private ISalonService iSalonService;

    @Autowired
    private IFileService iFileService;

    @Value("${project.image}")
    private String path;

    @GetMapping("/salons")
    public ResponseEntity<List<SalonInfoDto>> getAllSalons() {
        return ResponseEntity.ok(iSalonService.getAllSalons());
    }

    @GetMapping("salon-active")
    public ResponseEntity<List<SalonDto>> getSalonNamesActive() {
        return ResponseEntity.ok(iSalonService.getSalonNameActive());
    }

    @GetMapping("active")
    public ResponseEntity<List<SalonInfoDto>> getSalonsActive() {
        return ResponseEntity.ok(iSalonService.getActiveSalons());
    }

    @PostMapping("/create")
    @ResponseStatus(HttpStatus.OK)
    public Salon save(@RequestBody Salon salon) {
        return iSalonService.createSalon(salon);
    }

    @PutMapping("/update/{id}")

    public ResponseEntity<Salon> updateSalon(@PathVariable int id, @RequestBody Salon salon) {
        return ResponseEntity.ok(iSalonService.updateSalon(id, salon));
    }

    @PostMapping("image/upload/{salonId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<Salon> update(@RequestParam("image") MultipartFile image, @PathVariable int salonId) throws IOException {
        String fileName = iFileService.uploadImage(path, image);

        Salon salon = iSalonService.getSalonById(salonId);
        salon.setImageName(fileName);
        return ResponseEntity.ok(iSalonService.updateSalon(salonId, salon));

    }

    @GetMapping(value = "/image/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(@PathVariable("imageName") String imageName, HttpServletResponse response) throws IOException {
        InputStream resource = iFileService.downloadImage(path, imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource, response.getOutputStream());
    }
}
