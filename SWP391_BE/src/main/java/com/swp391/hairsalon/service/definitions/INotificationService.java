package com.swp391.hairsalon.service.definitions;

import java.util.List;

import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Notification;

public interface INotificationService {
    public List<Notification> findNotificationsByAccountId(String accountId);

    public void markNotificationAsRead(int notiId);

    public void addNewNotification(String title, String msg, Account account);
}
