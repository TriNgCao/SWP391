package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.ScheduleStylistDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.pojo.Schedule;
import com.swp391.hairsalon.service.definitions.IScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Autowired
    private IScheduleService iScheduleService;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.OK)
    public void addSchedule(@RequestBody ScheduleStylistDto schedules) {

        List<Integer> stylistIds = schedules.getStylistIds();
        for (Integer stylistId : stylistIds) {
            Schedule schedule = new Schedule();
            schedule.setStylist_id(stylistId);
            schedule.setEndTime(schedules.getEndTime());
            schedule.setStartTime(schedules.getStartTime());
            schedule.setDate(schedules.getDate());
            iScheduleService.addSchedule(schedule);
        }
    }

    @PostMapping("/book/{id}")
    @ResponseStatus(HttpStatus.OK)
    public void bookSchedule(@PathVariable Integer id, @RequestBody BookedSchedule bookedSchedule) {
        Schedule schedule = iScheduleService.getScheduleById(id);
        bookedSchedule.setSchedule(schedule);
        iScheduleService.bookSchedule(bookedSchedule);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Schedule>> getScheduleByDay() {
        return ResponseEntity.ok(iScheduleService.getAllSchedules());
    }
}
