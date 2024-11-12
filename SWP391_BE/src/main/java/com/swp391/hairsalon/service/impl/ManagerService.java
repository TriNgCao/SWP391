package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.pojo.Manager;
import com.swp391.hairsalon.repository.IManagerRepository;
import com.swp391.hairsalon.service.definitions.IManagerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManagerService implements IManagerService {

   @Autowired
   private IManagerRepository iManagerRepository;



@Override
public Manager findByAccountId(String id) {
    return iManagerRepository.findByAccount_Id(id);
}



@Override
public void deleteManager(int id) {
    iManagerRepository.deleteById(id);
}
}
