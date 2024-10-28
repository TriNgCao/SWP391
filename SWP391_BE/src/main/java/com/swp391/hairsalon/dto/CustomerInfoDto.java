package com.swp391.hairsalon.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerInfoDto {
    private String id;
    private String name;
    private String email;

private String phone;
    private boolean status;
    private Date registerDate;
}
