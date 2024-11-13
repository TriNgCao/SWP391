package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.dto.ScheduleViewAllDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.pojo.Schedule;
import com.swp391.hairsalon.repository.IBookedScheduleRepository;
import com.swp391.hairsalon.repository.IScheduleRepository;
import com.swp391.hairsalon.service.definitions.IScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class ScheduleService implements IScheduleService {


    @Autowired
    private IBookedScheduleRepository iBookedScheduleRepository;

    @Autowired
    private IScheduleRepository iScheduleRepository;

    @Override
    public Schedule addSchedule(Schedule schedule) {


        return iScheduleRepository.save(schedule);

    }

//    @Override
//    public Schedule updateSchedule(Schedule schedule) {
//        return null;
//    }
//
//    @Override
//    public Schedule getSchedulesByStylistId(int stylistId) {
//        return null;
//    }

    @Override
    public List<Schedule> getAllSchedules() {
        return iScheduleRepository.findAll();
    }

    @Override
    public void bookSchedule(BookedSchedule bookedSchedule) {

        bookedSchedule.setBooked(true);
        iBookedScheduleRepository.save(bookedSchedule);
    }

    @Override
    public Schedule getScheduleById(int scheduleId) {
        return iScheduleRepository.getReferenceById(scheduleId);
    }

    @Override
    public Integer getScheduleByStylistIdAndDate(int stylistId, Date date) {
        return iScheduleRepository.getScheduleId(stylistId, date);
    }

    @Override
    public List<ScheduleViewAllDto> getAllSchedule(String id, Date date) {
        return iScheduleRepository.getSchedule(id, date);
    }

    @Override
    public void deleteSchedule(String name, Date date) {
        int scheduleId = iScheduleRepository.getScheduleId(name, date);
        iScheduleRepository.deleteById(scheduleId);
    }

    @Override
    public List<Date> findById(String id) {
        return iScheduleRepository.findByStylistId(id);
    }

}
