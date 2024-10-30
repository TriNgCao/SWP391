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
public class AppointmentResponseDTO {
    private int appointmentId;
    private int customerId;
    private String customerName;
    private int stylistId;
    private String stylistName;
    private Date date;
    private LocalTime startTime;
    private LocalTime endTime;
    private List<String> serviceName;
    private double totalPrice;
    private String status;
    private int rating;
    private String feedback;
    private String salonName;
}
