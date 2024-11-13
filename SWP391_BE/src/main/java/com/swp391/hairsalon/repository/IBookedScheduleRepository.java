package com.swp391.hairsalon.repository;

import com.swp391.hairsalon.dto.ScheduleTableDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Date;
import java.util.List;

public interface IBookedScheduleRepository extends JpaRepository<BookedSchedule, Integer> {
    @Query(" select new com.swp391.hairsalon.dto.ScheduleTableDto( s.startTime, s.endTime, b.bookedTime, b.duration, s.schedule_id) " +
            " from Schedule s " +
            " left join BookedSchedule b on s.schedule_id = b.schedule.schedule_id " +
            " where s.date = :date and s.stylist.stylistId = :id and b.booked = true")
    List<ScheduleTableDto> getScheduleByStylistAndDate(@Param("date") Date date, @Param("id") int id);


    @Query(" select new com.swp391.hairsalon.dto.ScheduleTableDto( s.startTime, s.endTime, b.bookedTime, b.duration, s.schedule_id) " +
            " from Schedule s " +
            " left join BookedSchedule b on s.schedule_id = b.schedule.schedule_id " +
            " where s.date = :date and b.booked = true")
    List<ScheduleTableDto> getScheduleByDate(@Param("date") Date date);

    @Query("select b.id from BookedSchedule b where b.bookedTime = :t and b.schedule.schedule_id = :id")
    int getBookedId(@Param("t") int t, @Param("id") int id);

    @Query("select count(*) from Schedule where date = :date")
    int countByDate(@Param("date") Date date);


    @Query("SELECT CASE WHEN COUNT(bs) > 0 THEN true ELSE false END " +
           "FROM BookedSchedule bs " +
           "WHERE bs.schedule.stylist.stylistId = :stylistId AND bs.bookedTime = :startTime")
    boolean existsByStylistAndStartTime(@Param("stylistId") int stylistId, 
                                        @Param("startTime") int startTime);
}
