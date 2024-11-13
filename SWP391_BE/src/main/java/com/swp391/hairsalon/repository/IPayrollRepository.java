package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.Payroll;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IPayrollRepository extends JpaRepository<Payroll, Integer> {
    List<Payroll> findBySalon_SalonId(int salonId); // Phương thức lấy payroll theo salonId
    @Query("SELECT p FROM Payroll p WHERE p.employeeId = :id AND p.role = 2")
    List<Payroll> get(@Param("id")int id);

}
