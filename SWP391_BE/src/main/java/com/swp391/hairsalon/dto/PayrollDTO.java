package com.swp391.hairsalon.dto;

import com.google.auto.value.AutoValue.Builder;

import lombok.AllArgsConstructor;
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
public class PayrollDTO {
    private int employeeId;
    private String name;
    private int role;
    private String phoneNumber;
    private String email;
    private double earning;
    private boolean status;   
}
