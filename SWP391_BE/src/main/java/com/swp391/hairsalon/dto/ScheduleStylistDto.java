package com.swp391.hairsalon.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleStylistDto {
    private int startTime;
    private int endTime;
    private Date date;
    private List<Integer> stylistIds;
}
