package com.swp391.hairsalon.service.impl;

import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.pojo.Schedule;
import com.swp391.hairsalon.repository.IBookedScheduleRepository;
import com.swp391.hairsalon.repository.IScheduleRepository;
import com.swp391.hairsalon.service.definitions.IScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService implements IScheduleService {


    @Autowired
    private IBookedScheduleRepository iBookedScheduleRepository;

    @Autowired
    private IScheduleRepository iScheduleRepository;

    @Override
    public void addSchedule(Schedule schedule) {


        iScheduleRepository.save(schedule);

    }

    @Override
    public Schedule updateSchedule(Schedule schedule) {
        return null;
    }

    @Override
    public Schedule getSchedulesByStylistId(int stylistId) {
        return null;
    }

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

}
