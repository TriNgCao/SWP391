package com.swp391.hairsalon.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swp391.hairsalon.pojo.Notification;
import com.swp391.hairsalon.service.definitions.INotificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/noti")
public class NotificationController {
    private INotificationService iNotificationService;

    @GetMapping("/{id}")
    public List<Notification> getNotificationByAccountId(@PathVariable String id) {
        List<Notification> noti = iNotificationService.findNotificationsByAccountId(id);
        if (noti != null) {
            return noti;
        } else {
            return null;
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> markAsRead(@PathVariable int id) {
        try {
            iNotificationService.markNotificationAsRead(id);
            return ResponseEntity.ok("Notification marked as reaed.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
