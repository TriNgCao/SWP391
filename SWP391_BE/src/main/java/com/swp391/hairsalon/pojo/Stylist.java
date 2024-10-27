package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name = "salonId")
    private Salon salon;

//    @ManyToMany(mappedBy = "stylists")
//    private Set<Schedule> dates = new HashSet<>();
}
