package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRevenueRepository extends JpaRepository<Appointment, Long> {

}
