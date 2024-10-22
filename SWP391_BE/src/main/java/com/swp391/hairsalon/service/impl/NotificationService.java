package com.swp391.hairsalon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Notification;
import com.swp391.hairsalon.repository.INotificationRepository;
import com.swp391.hairsalon.service.definitions.INotificationService;

import jakarta.transaction.Transactional;

@Service
public class NotificationService implements INotificationService {
    @Autowired
    private INotificationRepository iNotificationRepository;

    @Override
    public List<Notification> findNotificationsByAccountId(String accountId) {
        return iNotificationRepository.findByAccount_Id(accountId);
    }

    @Override
    @Transactional
    public void markNotificationAsRead(int notiId) {
        iNotificationRepository.markAsRead(notiId);
    }

    @Override
    @Transactional
    public void addNewNotification(String title, String msg, Account account) {
        Notification noti = new Notification(title, msg, account);
        noti.setRead(false);
        iNotificationRepository.save(noti);
    }

}
