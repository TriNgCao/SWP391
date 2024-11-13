package com.swp391.hairsalon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.swp391.hairsalon.pojo.Appointment;
import com.swp391.hairsalon.pojo.Salon;

import java.sql.Date;

@Repository
public interface IAppointmentRepository extends JpaRepository<Appointment, Integer> {
    // public List<Appointment> findByCusId(int id);

    public List<Appointment> findByDate(Date date);

    public List<Appointment> findByCustomer_Account_Name(String name);

    public List<Appointment> findByBranch(Salon branch);

    public List<Appointment> findByStylist_StylistId(int stylistId);

    @Query("SELECT a FROM Appointment a WHERE a.stylist.stylistId = :stylistId AND a.status = 'Completed'")
    List<Appointment> getCompletedAppointmentsByStylist(int stylistId);

    public List<Appointment> findByCustomer_Account_Id(String accountId);

    @Query("SELECT a FROM Appointment a WHERE a.stylist.stylistId = :stylistId AND a.status = 'COMPLETED' AND MONTH(a.date) = :month AND YEAR(a.date) = :year")
    List<Appointment> findCompletedAppointmentsByStylistForMonth(
            @Param("stylistId") int stylistId,
            @Param("month") int month,
            @Param("year") int year);

}
