package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IPayrollRepository extends JpaRepository<Payroll, Integer> {
    List<Payroll> findBySalon_SalonId(int salonId); // Phương thức lấy payroll theo salonId
}
