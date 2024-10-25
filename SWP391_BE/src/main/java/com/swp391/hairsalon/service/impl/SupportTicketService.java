package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.pojo.SupportTicket;
import com.swp391.hairsalon.repository.ISupportTicketRepository;
import com.swp391.hairsalon.service.definitions.ISupportTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SupportTicketService implements ISupportTicketService {

    @Autowired
    private ISupportTicketRepository supportTicketRepository;

    @Override
    public SupportTicket createSupportTicket(SupportTicket ticket) {
        ticket.setCreatedAt(LocalDateTime.now());
        return supportTicketRepository.save(ticket);
    }

    @Override
    public SupportTicket updateSupportTicketStatus(Long id, boolean status) {
        Optional<SupportTicket> existingTicket = supportTicketRepository.findById(id);
        if (existingTicket.isPresent()) {
            SupportTicket ticket = existingTicket.get();
            ticket.setStatus(status);
            supportTicketRepository.save(ticket);
            return ticket;
        } else {
            throw new IllegalArgumentException("Ticket not found.");
        }
    }

    @Override
    public SupportTicket updateSupportTicket(SupportTicket ticket) {
        Optional<SupportTicket> existingTicket = supportTicketRepository.findById(ticket.getId());
        if (existingTicket.isPresent()) {
            return supportTicketRepository.save(ticket);
        } else {
            throw new IllegalArgumentException("Ticket not found.");
        }
    }

    @Override
    public List<SupportTicket> getAllSupportTickets() {
        return supportTicketRepository.findAll();
    }

    @Override
    public SupportTicket getSupportTicketById(Long id) {
        return supportTicketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found."));
    }

    @Override
    public boolean deleteSupportTicket(Long id) {
        Optional<SupportTicket> ticket = supportTicketRepository.findById(id);
        if (ticket.isPresent()) {
            supportTicketRepository.delete(ticket.get());
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<SupportTicket> findSupportTicketsByStatus(boolean status) { // Changed status type to boolean
        return supportTicketRepository.findByStatus(status);
    }
}

