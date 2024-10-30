package com.swp391.hairsalon.dto;

import lombok.*;

import java.sql.Date;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookedScheduleCancelRequestDto {
    private int stylistId;
    private Date date;
    private LocalTime bookedTime;
}
