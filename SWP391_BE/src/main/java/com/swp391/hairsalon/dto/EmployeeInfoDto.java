
package com.swp391.hairsalon.dto;

import lombok.*;
@Builder
@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeInfoDto {
    private String id;

private String name;
    private String email;
    private int role;

    private boolean status;
    private String salonName;
//    private String imageName;

}