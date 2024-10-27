package com.swp391.hairsalon.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StylistInfoForBooking {
    private String stylistName;
    private int stylistId;
    private String imageName;
}

