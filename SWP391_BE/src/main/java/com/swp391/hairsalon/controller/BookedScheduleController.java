package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.ScheduleTableDto;
import com.swp391.hairsalon.service.definitions.IBookedScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/book-schedule")
public class BookedScheduleController {
    @Autowired
    private IBookedScheduleService iBookedScheduleService;

    @GetMapping("/booked/{stylistId}/{date}")
    public ResponseEntity<List<ScheduleTableDto>> getSchedule(@PathVariable int stylistId, @PathVariable Date date) {
        return ResponseEntity.ok(iBookedScheduleService.getScheduleByStylistIdAndDate(stylistId, date));
    }

    @GetMapping("/{date}")
    public ResponseEntity<List<ScheduleTableDto>> getBookedSchdule(@PathVariable Date date) {
        return ResponseEntity.ok(iBookedScheduleService.getAllBookedSchedule(date));
    }


}
