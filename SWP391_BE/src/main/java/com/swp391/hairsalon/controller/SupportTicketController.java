package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.pojo.SupportTicket;
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

    @PostMapping("/create")
    public ResponseEntity<SupportTicket> createSupportTicket(@Valid @RequestBody SupportTicket supportTicket) {
        supportTicket.setStatus(false);
        SupportTicket createdTicket = supportTicketService.createSupportTicket(supportTicket);
        return ResponseEntity.ok(createdTicket);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SupportTicket> updateSupportTicket(@PathVariable Long id, @RequestBody SupportTicket supportTicket) {
        supportTicket.setId(id);
        SupportTicket updatedTicket = supportTicketService.updateSupportTicket(supportTicket);
        return ResponseEntity.ok(updatedTicket);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<SupportTicket> updateSupportTicketStatus(@PathVariable Long id, @RequestParam boolean status) {
        SupportTicket updatedTicket = supportTicketService.updateSupportTicketStatus(id, status);
        return ResponseEntity.ok(updatedTicket);
    }

    @GetMapping
    public ResponseEntity<List<SupportTicket>> getAllSupportTickets() {
        List<SupportTicket> tickets = supportTicketService.getAllSupportTickets();
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SupportTicket> getSupportTicketById(@PathVariable Long id) {
        SupportTicket ticket = supportTicketService.getSupportTicketById(id);
        return ResponseEntity.ok(ticket);
    }

    @GetMapping("/status")
    public ResponseEntity<List<SupportTicket>> findSupportTicketsByStatus(@RequestParam boolean status) { // Changed status type to boolean
        List<SupportTicket> tickets = supportTicketService.findSupportTicketsByStatus(status);
        return ResponseEntity.ok(tickets);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSupportTicket(@PathVariable Long id) {
        boolean isDeleted = supportTicketService.deleteSupportTicket(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

