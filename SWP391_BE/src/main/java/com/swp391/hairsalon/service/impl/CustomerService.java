package com.swp391.hairsalon.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swp391.hairsalon.pojo.Customer;
import com.swp391.hairsalon.repository.ICustomerRepository;
import com.swp391.hairsalon.service.definitions.ICustomerService;

import jakarta.transaction.Transactional;

@Service
public class CustomerService implements ICustomerService {
    @Autowired
    private ICustomerRepository iCustomerRepository;

    @Override
    public Customer getCustomerById(int id) {
        return iCustomerRepository.getReferenceById(id);
    }

    @Override
    @Transactional
    public void updateCustomerLoyalPoint(int bonusPoint, int cusId) {
        Customer customer = iCustomerRepository.getReferenceById(cusId);
        customer.setLoyaltyPoints(customer.getLoyaltyPoints()+bonusPoint);
        iCustomerRepository.save(customer);
    }

    @Override
    public void saveCustomer(Customer customer) {
        iCustomerRepository.save(customer);
    }


}
