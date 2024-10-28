package com.swp391.hairsalon.service.definitions;

import com.swp391.hairsalon.dto.ScheduleTableDto;

import java.sql.Date;
import java.util.List;

public interface IBookedScheduleService {
    List<ScheduleTableDto> getScheduleByStylistIdAndDate(int stylistId, Date date);
    List<ScheduleTableDto> getAllBookedSchedule(Date date);

}
