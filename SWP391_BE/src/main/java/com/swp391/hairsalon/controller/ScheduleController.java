package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.ScheduleStylistDto;
import com.swp391.hairsalon.dto.ScheduleViewAllDto;
import com.swp391.hairsalon.dto.StylistListDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.pojo.Schedule;
import com.swp391.hairsalon.service.definitions.IScheduleService;
import com.swp391.hairsalon.service.definitions.IStylistservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    @Autowired
    private IScheduleService iScheduleService;

    @Autowired
    private IStylistservice iStylistservice;

    @PostMapping("/add")
    @ResponseStatus(HttpStatus.OK)
    public void addSchedule(@RequestBody ScheduleStylistDto schedules) {

        List<Integer> stylistIds = schedules.getStylistIds();
        for (Integer stylistId : stylistIds) {
            if(iScheduleService.getScheduleByStylistIdAndDate(stylistId, schedules.getDate()) == null ) {
                Schedule schedule = new Schedule();
                schedule.setStylist(iStylistservice.getStylistById(stylistId));
                schedule.setEndTime(22);
                schedule.setStartTime(8);
                schedule.setDate(schedules.getDate());
                iScheduleService.addSchedule(schedule);
            }

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

    @GetMapping("/view/{id}/{date}")
    public ResponseEntity<List<ScheduleViewAllDto>> getAll(@PathVariable String id, @PathVariable Date date) {
        return ResponseEntity.ok(iScheduleService.getAllSchedule(id, date));
    }

    @GetMapping("/view/stylist/{manId}")
    public ResponseEntity<List<StylistListDto>> getAllStylist(@PathVariable String manId) {
        return ResponseEntity.ok(iStylistservice.getStylistLists(manId));
    }

    @DeleteMapping("/delete/{name}/{date}")
    public ResponseEntity<String> deleteSchedule(@PathVariable String name, @PathVariable Date date) {
        iScheduleService.deleteSchedule(name, date);
        return ResponseEntity.ok("Schedule deleted");
    }
}
