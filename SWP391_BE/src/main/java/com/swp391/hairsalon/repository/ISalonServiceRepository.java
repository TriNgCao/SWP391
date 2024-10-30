package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.SalonService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISalonServiceRepository extends JpaRepository<SalonService, Long> {

    List<SalonService> findByServiceNameContaining(String serviceName);
    List<SalonService> findByServicePriceBetween(double minPrice, double maxPrice);

    @Query("SELECT s FROM SalonService s WHERE s.serviceId = :serviceId")
    SalonService searchById(@Param("serviceId") Long serviceId);

    @Query("SELECT s FROM SalonService s WHERE s.serviceName = :serviceName")
    SalonService searchByName(@Param("serviceName") String serviceName);


    @Modifying
    @Transactional
    @Query("DELETE FROM SalonService s WHERE s.serviceId = :serviceId")
    void deleteById(@Param("serviceId") Long serviceId);

    @Modifying
    @Transactional
    @Query("DELETE FROM SalonService s WHERE s.serviceName = :serviceName")
    void deleteByName(@Param("serviceName") String serviceName);
}
