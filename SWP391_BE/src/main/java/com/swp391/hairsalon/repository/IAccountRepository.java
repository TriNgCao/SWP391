package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.pojo.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IAccountRepository extends JpaRepository<Account, Integer> {
    public List<Account> findByRoleNot(int role);
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
