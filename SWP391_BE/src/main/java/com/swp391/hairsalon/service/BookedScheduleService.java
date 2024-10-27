package com.swp391.hairsalon.service;

import com.swp391.hairsalon.dto.ScheduleTableDto;
import com.swp391.hairsalon.repository.IBookedScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class BookedScheduleService implements IBookedScheduleService {
    @Autowired
    private IBookedScheduleRepository iBookedScheduleRepository;

    @Override
    public List<ScheduleTableDto> getScheduleByStylistIdAndDate(int stylistId, Date date) {
        return iBookedScheduleRepository.getScheduleByStylistAndDate(date, stylistId);
    }
}
