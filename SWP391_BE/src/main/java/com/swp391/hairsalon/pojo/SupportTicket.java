package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Support_tickets")
public class SupportTicket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Customer name cannot be blank")
    private String fullName;
    private String email;
    @Pattern(regexp = "^0[0-9]{9}$", message = "Phone number must start with 0 and be exactly 10 digits.")
    private String phone;
    @NotBlank(message = "Subject cannot be blank")
    private String subject;
    private String message;
    private boolean status;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
