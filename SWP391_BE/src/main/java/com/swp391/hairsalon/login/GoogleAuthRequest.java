package com.swp391.hairsalon.login;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class GoogleAuthRequest {
    private String idToken;
}
