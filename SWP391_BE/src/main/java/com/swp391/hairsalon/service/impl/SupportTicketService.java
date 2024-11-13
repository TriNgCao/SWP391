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
        ticket.setStatus(false);
        return supportTicketRepository.save(ticket);
    }

    @Override
    public List<SupportTicket> getAllSupportTickets() {

        return supportTicketRepository.findAll();
    }

    @Override
    public SupportTicket getSupportTicketById(int id) {
        return supportTicketRepository.getSupportTicketById(id);
    }

    @Override
    public SupportTicket updateSupportTicket(SupportTicket supportTicket) {
        return supportTicketRepository.save(supportTicket);
    }
}

