package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICustomerRepository extends JpaRepository<Customer, Integer> {

}
