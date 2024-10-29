package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.dto.ScheduleViewAllDto;
import com.swp391.hairsalon.pojo.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface IScheduleRepository extends JpaRepository<Schedule, Integer> {
    @Query("select s.schedule_id from Schedule s where s.stylist.stylistId = :id and s.date = :date")
    Integer getScheduleId(int id, Date date);

    @Query("select s.schedule_id from Schedule s where s.stylist.account.name = :name and s.date = :date")
    Integer getScheduleId(String name, Date date);

    @Query("select new com.swp391.hairsalon.dto.ScheduleViewAllDto(s1.account.name, s2.date) " +
            "from Stylist s1 " +
            "left join Schedule s2 on s1.stylistId = s2.stylist.stylistId " +
            "where s2.date = :date and s1.salon.salonId = " +
            "(select m.salon.salonId from Manager m where m.account.id = :id) ")
    List<ScheduleViewAllDto> getSchedule(@Param("id") String id, @Param("date") java.util.Date date);


}
