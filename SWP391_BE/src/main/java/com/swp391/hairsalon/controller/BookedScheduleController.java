package com.swp391.hairsalon.controller;

import com.swp391.hairsalon.dto.BookScheduleRequestDto;
import com.swp391.hairsalon.dto.BookedScheduleCancelRequestDto;
import com.swp391.hairsalon.dto.ScheduleTableDto;
import com.swp391.hairsalon.pojo.BookedSchedule;
import com.swp391.hairsalon.service.definitions.IAccountService;
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
    private IAccountService iAccountService;

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
        int duration = iSalonServiceService.getTotalDurationBySalonId(bookScheduleRequestDto.getServiceId());
        int stylistId = bookScheduleRequestDto.getStylistId();
        if (stylistId == 0) {
            stylistId = iBookedScheduleService.chooseRandomAvailableStylist((bookScheduleRequestDto.getBookedTime()), duration, bookScheduleRequestDto.getSalonId(), date);
        }
        int scheduleId = 0;

            scheduleId = iScheduleService.getScheduleByStylistIdAndDate(stylistId, date);



        BookedSchedule bookedSchedule = new BookedSchedule();
        bookedSchedule.setBooked(true);
        bookedSchedule.setDuration(duration);
        bookedSchedule.setBookedTime(bookScheduleRequestDto.getBookedTime());
        bookedSchedule.setSchedule(iScheduleService.getScheduleById(scheduleId));
        iBookedScheduleService.addBookedSchedule(bookedSchedule);

    }

    @PutMapping("/cancel")
    public void cancelBookedSchedule(@RequestBody BookedScheduleCancelRequestDto b) {


        int scheduleId = iScheduleService.getScheduleByStylistIdAndDate(b.getStylistId(), b.getDate());

        System.out.println(scheduleId);

        int id = iBookedScheduleService.getBookedId(b.getBookedTime().getHour(), scheduleId);
        iBookedScheduleService.updateStatusBookedSchedule(id);
    }


}
