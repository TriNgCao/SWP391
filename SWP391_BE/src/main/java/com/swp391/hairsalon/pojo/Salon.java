package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor

@Table(name = "salon")
public class Salon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "salon_id")
    private int salonId;

    @Getter
    @Setter
    @Column(name = "salon_name")
    private String salonName;

    @Getter
    @Setter
    @Column(name = "salon_address")
    private String salonAddress;

    @Getter
    @Setter
    @Column(name = "status")
    private boolean salonStatus;


    @OneToOne(mappedBy = "salon", cascade = CascadeType.ALL)
    private Manager manager;

    @OneToMany(mappedBy = "salon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Staff> staffs = new ArrayList<Staff>();

    @OneToMany(mappedBy = "salon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Stylist> stylists = new ArrayList<Stylist>();

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Appointment> appointments = new ArrayList<>();


}
