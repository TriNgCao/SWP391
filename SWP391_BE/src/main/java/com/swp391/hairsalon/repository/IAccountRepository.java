package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.dto.CustomerInfoDto;
import com.swp391.hairsalon.dto.CustomerProfileDto;
import com.swp391.hairsalon.dto.PersonnelBySalonDto;
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


    @Query("select new com.swp391.hairsalon.dto.EmployeeInfoDto(a.id, a.name, a.email , a.role, a.active, s3.salonName ) " +
            "from Account a " +

            "left join Staff s1 on a.id = s1.account.id " +
            "left join Stylist s2 on a.id = s2.account.id " +
            "left join Manager m on a.id = m.account.id " +
            "join Salon s3 on s3.salonId = COALESCE(s1.salon.salonId, s2.salon.salonId, m.salon.salonId) " +
            "where a.role <> 1")
    List<EmployeeInfoDto> getAllEmployees();

    @Query("select new com.swp391.hairsalon.dto.PersonnelBySalonDto(a.id, a.name, a.role, COALESCE(s1.salary, s2.salary), COALESCE(s2.commission, 0)) " +
            "from Account a " +
            "left join Staff s1 on a.id = s1.account.id " +
            "left join Stylist s2 on a.id = s2.account.id " +
            "where coalesce(s1.salon.salonId, s2.salon.salonId) " +
            " = " +
            "(select m.salon.salonId from Manager m where m.account.id = :id) ")
    List<PersonnelBySalonDto> getPersonnelBySalon(@Param("id") String id);

    @Query("select new com.swp391.hairsalon.dto.CustomerInfoDto (id, name, email, phone, active, registerDate) " +
            "from Account " +
            "where role = 1")
    List<CustomerInfoDto> getCustomerInfo();

    @Query("select new com.swp391.hairsalon.dto.CustomerProfileDto (a.id, a.name, a.email, a.phone, c.loyaltyPoints) " +
            "from Account a " +
            "left join Customer c on a.id = c.account.id " +
            "where a.id = :id ")
    CustomerProfileDto getCustomerProfileById(@Param("id") String id);

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
