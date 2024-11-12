package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.pojo.SupportTicket;
import java.util.List;

public interface ISupportTicketService {

    SupportTicket createSupportTicket(SupportTicket ticket);
    List<SupportTicket> getAllSupportTickets();
    List<SupportTicket> findSupportTicketsByStatus(boolean status); // Updated parameter type to boolean
}
