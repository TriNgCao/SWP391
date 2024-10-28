package com.swp391.hairsalon.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SalonInfoDto {
    private int id;
    private String name;
    private String address;
    private boolean active;
    private String imageName;
}
