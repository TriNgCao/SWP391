package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ISupportTicketRepository extends JpaRepository<SupportTicket, Integer> {
    @Query("Select st FROM SupportTicket st WHERE st.status = :status")
    List<SupportTicket> findByStatus(boolean status);
//
//    @Modifying
//    @Transactional
//    @Query("UPDATE SupportTicket st SET st.status = ?2 WHERE st.id = ?1")
//    int updateStatusById(int id, boolean status);

    @Query("Select st FROM SupportTicket st WHERE st.id = :id")
    SupportTicket getSupportTicketById(int id);
}

