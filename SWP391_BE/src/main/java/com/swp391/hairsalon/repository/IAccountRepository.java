package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.dto.EmployeeInfo;
import com.swp391.hairsalon.pojo.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IAccountRepository extends JpaRepository<Account, String> {
    public List<Account> findByRoleNot(int role);

//    @Query("SELECT a. , a.role, COALESCE(s1.salary, s2.salary) AS salary " +
//            "FROM Account a" +
//            "LEFT JOIN Staff s1 ON a.account_id = s1.account_id" +
//            "LEFT JOIN Stylist s2 ON a.account_id = s2.account_id")
    @Query("select a.name, a.role,  COALESCE(s1.salary, s2.salary) AS salary, a.active from Account a left join Staff s1 on a.id = s1.account.id " +
                                   "left join Stylist s2 on a.id = s2.account.id")
    List<EmployeeInfo> getAllEmployees();

    public List<Account> findByRole(int role);

    @Query("Select a from Account a where a.id = :id")
    public Account searchById(@Param("id") String id);

    @Query("Select a from Account a where a.email = :email")
    public Account searchByEmail(@Param("email") String email);

    @Modifying
    @Transactional
    @Query("DELETE FROM Account a WHERE a.id = :id")
    void deleteUserById(@Param("id") String id);
}
