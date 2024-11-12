package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.dto.PersonnelBySalonDto;
import com.swp391.hairsalon.dto.StylistInfoForBooking;
import com.swp391.hairsalon.dto.StylistListDto;
import com.swp391.hairsalon.pojo.Staff;
import com.swp391.hairsalon.pojo.Stylist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface IStylistRepository extends JpaRepository<Stylist, Integer> {
    @Query("Select s from Stylist s where s.salon.salonId = :id")
    List<Stylist> getStylistsBySalonId(@Param("id") int id);

    @Query("select new com.swp391.hairsalon.dto.StylistInfoForBooking(a.name, s.stylistId, s.imageName) " +
            "from Stylist s " +
            "join Account a on s.account.id = a.id " +
            "where s.salon.salonId = :id")
    List<StylistInfoForBooking> getStylistInfoForBooking(@Param("id") int id);

    @Query("select new com.swp391.hairsalon.dto.StylistListDto(s.stylistId, a.name) " +
            "from Account a " +
            "left join Stylist s on a.id = s.account.id " +
            "where s.salon.salonId " +
            " = " +
            "(select m.salon.salonId from Manager m where m.account.id = :id) ")
    List<StylistListDto> getStylistList(@Param("id") String id);

    @Query("Select s FROM Stylist s WHERE s.account.id = :account_id")
    List<Stylist> getStylistByAccountId(@Param("account_id") String accountId);
}
