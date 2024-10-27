package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.pojo.Customer;

public interface ICustomerService {
    public Customer getCustomerById(int id);
    public void updateCustomerLoyalPoint(int bonusPoint, int cusId);
}
