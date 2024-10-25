package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.pojo.SupportTicket;
import java.util.List;

public interface ISupportTicketService {

    SupportTicket createSupportTicket(SupportTicket ticket);
    SupportTicket updateSupportTicketStatus(Long id, boolean status);
    SupportTicket updateSupportTicket(SupportTicket ticket);
    List<SupportTicket> getAllSupportTickets();
    SupportTicket getSupportTicketById(Long id);
    boolean deleteSupportTicket(Long id);
    List<SupportTicket> findSupportTicketsByStatus(boolean status); // Updated parameter type to boolean
}
