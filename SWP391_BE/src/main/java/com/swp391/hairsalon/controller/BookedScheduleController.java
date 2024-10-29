package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.BookScheduleRequestDto;
import com.swp391.hairsalon.dto.ScheduleTableDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.service.definitions.IBookedScheduleService;
import com.swp391.hairsalon.service.definitions.ISalonServiceService;
import com.swp391.hairsalon.service.definitions.IScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/book-schedule")
public class BookedScheduleController {

    @Autowired
    private IBookedScheduleService iBookedScheduleService;

    @Autowired
    private IScheduleService iScheduleService;

    @Autowired
    private ISalonServiceService iSalonServiceService;

    @GetMapping("/booked/{stylistId}/{date}")
    public ResponseEntity<List<ScheduleTableDto>> getSchedule(@PathVariable int stylistId, @PathVariable Date date) {
        return ResponseEntity.ok(iBookedScheduleService.getScheduleByStylistIdAndDate(stylistId, date));
    }

    @GetMapping("/{date}")
    public ResponseEntity<List<ScheduleTableDto>> getBookedSchdule(@PathVariable Date date) {
        return ResponseEntity.ok(iBookedScheduleService.getAllBookedSchedule(date));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createBookedSchedule(@RequestBody BookScheduleRequestDto bookScheduleRequestDto) {
        Date date = bookScheduleRequestDto.getDate();
        int stylistId = bookScheduleRequestDto.getStylistId();
        int scheduleId = iScheduleService.getScheduleByStylistIdAndDate(stylistId, date);
        int duration = iSalonServiceService.getTotalDurationBySalonId(bookScheduleRequestDto.getServiceId());
        BookedSchedule bookedSchedule = new BookedSchedule();
       bookedSchedule.setBooked(true);
       bookedSchedule.setDuration(duration);
       bookedSchedule.setBookedTime(bookScheduleRequestDto.getBookedTime());
       bookedSchedule.setSchedule(iScheduleService.getScheduleById(scheduleId));
       iBookedScheduleService.addBookedSchedule(bookedSchedule);
    }


}
