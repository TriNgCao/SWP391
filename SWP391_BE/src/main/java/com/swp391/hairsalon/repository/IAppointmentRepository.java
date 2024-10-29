package com.swp391.hairsalon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
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

    @Query("SELECT a FROM Appointment a WHERE a.stylist.stylistId = :stylistId AND a.status = 'Completed'") // Giả sử có trường status để xác định trạng thái
    List<Appointment> getCompletedAppointmentsByStylist(int stylistId);

    public List<Appointment> findByCustomer_Account_Id(String accountId);
}
