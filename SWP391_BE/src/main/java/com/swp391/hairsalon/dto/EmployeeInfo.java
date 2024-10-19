package com.swp391.hairsalon.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class EmployeeInfo {
    private String name;
    private int role;
    private int salary;
    private boolean status;
}
