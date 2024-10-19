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
    private int salonId;
    @Getter
    @Setter
    private String salonName;
    @Getter
    @Setter
    private String salonAddress;
    @Getter
    @Setter
    private boolean salonStatus;


    @OneToOne(mappedBy = "salon", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Manager manager;

    @OneToMany(mappedBy = "salon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Staff> staffs = new ArrayList<Staff>();

    @OneToMany(mappedBy = "salon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Stylist> stylists = new ArrayList<Stylist>();

}
