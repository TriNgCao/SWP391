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
    private String userID;
    private int salonId;
    private int stylistId;
    private List<Long> serviceId;
    private Date date;
    private int startTime;
    private String status; 
    private String feedback;
    private int rating;
}
