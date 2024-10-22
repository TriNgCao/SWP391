package com.swp391.hairsalon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.swp391.hairsalon.pojo.Notification;
import java.util.List;

@Repository
public interface INotificationRepository extends JpaRepository<Notification, Integer> {
    // Tìm tất cả thông báo theo accountId
    List<Notification> findByAccount_Id(String accountId);
    
    // Thay đổi trạng thái thành đã đọc cho một thông báo cụ thể
    @Modifying
    @Query("UPDATE Notification n SET n.isRead = true WHERE n.notiId = :notiId")
    void markAsRead(int notiId);
}
