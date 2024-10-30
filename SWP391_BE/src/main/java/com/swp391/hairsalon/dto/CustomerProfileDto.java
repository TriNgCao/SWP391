package com.swp391.hairsalon.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerProfileDto {
    private String id;
    private String name;
    private String email;
    private String phone;
    private int loyaltyPoints;
}
