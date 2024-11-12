package com.swp391.hairsalon.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class AccountProfileDTO {
    private String name;
    private String email;
    private String phone;
}
