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
@Getter
@Setter
@Table(name = "salon")
public class Salon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int salonId;

    private String salonName;

    private String salonAddress;

    private boolean salonStatus;

    private String imageName;

    @OneToOne(mappedBy = "salon", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Manager manager;

    @OneToMany(mappedBy = "salon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Staff> staffs = new ArrayList<Staff>();

    @OneToMany(mappedBy = "salon", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Stylist> stylists = new ArrayList<Stylist>();

}
