package com.swp391.hairsalon.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class EmployeeInfoDto {
    private String id;
    private String name;
    private String email;
    private int role;
    private boolean status;
    private String salonName;
}
