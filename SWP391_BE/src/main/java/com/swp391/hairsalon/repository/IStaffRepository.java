package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.Account;
import com.swp391.hairsalon.pojo.Staff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.In;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IStaffRepository extends JpaRepository<Staff, Integer> {

    @Query("Select s from Staff s where s.salon.salonId = :id")
    List<Staff> getStaffsBySalonId(@Param("id") int id);

    @Query("Select s.staffId, a.name, s.salary from Staff s join Account a where s.account.id = a.id and s.staffId = :id")
    Object[] getStaffByStaffId(@Param("id") int staffId);

    @Query("Select s FROM Staff s WHERE s.account.id = :account_id")
    Staff getStaffByAccount_Id(String account_id);

    @Query("Select s.salary FROM Staff s WHERE s.account.id = :account_id")
    Integer getStaffSalaryByAccountId(String account_id);

}
