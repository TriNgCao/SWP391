package com.swp391.hairsalon.dto;

import java.sql.Date;
import java.time.LocalTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class AppointmentRequestDTO {
    private int cusId;
    private int salonId;
    private int stylistId;
    private List<Long> serviceId;
    private Date date;
    private LocalTime startTime;
    private String status; 
    private String feedback;
    private int rating;
}
