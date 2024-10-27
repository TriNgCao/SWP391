package com.swp391.hairsalon.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleTableDto {
    private int startTime;
    private int endTime;
    private int bookedTime;
    private int duration;
}
