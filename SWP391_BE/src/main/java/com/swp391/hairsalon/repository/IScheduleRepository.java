package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Date;

public interface IScheduleRepository extends JpaRepository<Schedule, Integer> {


}
