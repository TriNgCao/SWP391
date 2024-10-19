package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IManagerRepository extends JpaRepository<Manager, Integer> {
}
