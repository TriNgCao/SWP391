package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.pojo.SupportTicket;
import com.swp391.hairsalon.repository.ISupportTicketRepository;
import com.swp391.hairsalon.service.definitions.ISupportTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

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
    public SupportTicket updateStatus(int id, boolean status){
        SupportTicket st = supportTicketRepository.getSupportTicketById(id);
        st.setStatus(status);
        return supportTicketRepository.save(st);
    }
}

