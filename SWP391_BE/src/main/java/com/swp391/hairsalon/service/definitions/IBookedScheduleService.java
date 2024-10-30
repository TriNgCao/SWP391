package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.dto.ScheduleTableDto;
import com.swp391.hairsalon.pojo.BookedSchedule;

import java.sql.Date;
import java.util.List;

public interface IBookedScheduleService {
    List<ScheduleTableDto> getScheduleByStylistIdAndDate(int stylistId, Date date);
    List<ScheduleTableDto> getAllBookedSchedule(Date date);
    public Integer chooseRandomAvailableStylist(int startBookedTime, int duration, int salonId, Date date);
    void addBookedSchedule(BookedSchedule bookedSchedule);
    void updateStatusBookedSchedule(int id);
    int getBookedId(int bookedTime, int scheduleId);

}
