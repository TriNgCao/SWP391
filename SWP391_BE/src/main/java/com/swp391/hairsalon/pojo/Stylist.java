package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

import java.util.HashSet;
import java.util.Set;
import java.util.ArrayList;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Stylist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int stylistId;

    private int salary;

    private double commission;
    private String imageName;

    @OneToOne()
    @JoinColumn(name = "account_id")

    private Account account;

    @ManyToOne
    @JoinColumn(name = "salonId")

    private Salon salon;

    @OneToMany(mappedBy = "stylist", cascade = CascadeType.ALL)
    private List<Appointment> appointments;

    @OneToMany(mappedBy = "stylist", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Schedule> schedules = new ArrayList<>();
}