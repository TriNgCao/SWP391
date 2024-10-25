package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.SupportTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface ISupportTicketRepository extends JpaRepository<SupportTicket, Long> {
    List<SupportTicket> findByStatus(boolean status);

    @Modifying
    @Transactional
    @Query("UPDATE SupportTicket st SET st.status = ?2 WHERE st.id = ?1")
    int updateStatusById(Long id, boolean status);
}

