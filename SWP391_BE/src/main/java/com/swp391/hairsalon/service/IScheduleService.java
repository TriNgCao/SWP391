package com.swp391.hairsalon.service;

import com.swp391.hairsalon.dto.ScheduleTableDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.pojo.Schedule;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

public interface IScheduleService {
    public void addSchedule(Schedule schedule);
    public Schedule updateSchedule(Schedule schedule);
    public Schedule getSchedulesByStylistId(int stylistId);
    public List<Schedule> getAllSchedules();
    public void bookSchedule(BookedSchedule bookedSchedule);
    public Schedule getScheduleById(int scheduleId);

}
