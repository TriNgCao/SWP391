package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.pojo.SupportTicket;
import com.swp391.hairsalon.service.definitions.INotificationService;
import com.swp391.hairsalon.service.definitions.IStaffService;
import com.swp391.hairsalon.service.impl.SupportTicketService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/support-tickets")
@Validated
public class SupportTicketController {

    @Autowired
    private SupportTicketService supportTicketService;
    @Autowired
    private INotificationService iNotificationService;
    @Autowired
    private IStaffService iStaffService;

    @PostMapping("/create")
    public ResponseEntity<SupportTicket> createSupportTicket(@Valid @RequestBody SupportTicket supportTicket) {
        supportTicket.setStatus(false);
        SupportTicket createdTicket = supportTicketService.createSupportTicket(supportTicket);
        List<Staff> staffList = iStaffService.getAllStaffs();
        for(Staff staff:staffList){
            iNotificationService.addNewNotification("Bạn có thông báo mới", "Một phiếu hỗ trợ vừa được tạo",staff.getAccount() );
        }
        return ResponseEntity.ok(createdTicket);
    }


    @GetMapping
    public ResponseEntity<List<SupportTicket>> getAllSupportTickets() {
        List<SupportTicket> tickets = supportTicketService.getAllSupportTickets();
        return ResponseEntity.ok(tickets);
    }

}

