package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.dto.ScheduleViewAllDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.pojo.Schedule;

import java.sql.Date;
import java.util.List;
import java.util.concurrent.ScheduledExecutorService;

public interface IScheduleService {
    public Schedule addSchedule(Schedule schedule);
//    public Schedule updateSchedule(Schedule schedule);
//    public Schedule getSchedulesByStylistId(int stylistId);
    public List<Schedule> getAllSchedules();
    public void bookSchedule(BookedSchedule bookedSchedule);
    public Schedule getScheduleById(int scheduleId);
    Integer getScheduleByStylistIdAndDate(int stylistId, Date date);
    List<ScheduleViewAllDto> getAllSchedule(String id, Date date);
    void deleteSchedule(String name, Date date);

    List<Date> findById(String id);
}
