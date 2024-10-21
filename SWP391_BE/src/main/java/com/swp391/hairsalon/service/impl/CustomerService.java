package com.swp391.hairsalon.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swp391.hairsalon.pojo.Customer;
import com.swp391.hairsalon.repository.ICustomerRepository;
import com.swp391.hairsalon.service.definitions.ICustomerService;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository iCustomerRepository;

    @Override
    public Customer getCustomerById(int id) {
        // TODO Auto-generated method stub
        return iCustomerRepository.getReferenceById(id);
    }

}
