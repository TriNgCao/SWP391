package com.swp391.hairsalon.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StylistEarningsDTO {
    // Getters and Setters
    private double salary;
    private double commission;
    private double commissionAmount;
    private String name;
    private double earning;
    private LocalDate payrollDate;

}

