package com.swp391.hairsalon.dto;

import lombok.*;

import java.sql.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BookScheduleRequestDto {
    private int stylistId;
    private List<Integer> serviceId;
    private Date date;
    private int bookedTime;
}
