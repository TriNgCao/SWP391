package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.pojo.Manager;

public interface IManagerService {
    public Manager findByAccountId(String id);
    public void deleteManager(int id);
}
