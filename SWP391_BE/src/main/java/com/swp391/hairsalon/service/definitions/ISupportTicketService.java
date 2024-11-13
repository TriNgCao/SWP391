package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.pojo.SupportTicket;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.Select;

import java.util.List;

public interface ISupportTicketService {

    SupportTicket createSupportTicket(SupportTicket ticket);
    List<SupportTicket> getAllSupportTickets();
    SupportTicket getSupportTicketById(int id);
    SupportTicket updateSupportTicket(SupportTicket supportTicket);
}
