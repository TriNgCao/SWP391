package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor

public class Stylist {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    private int stylistId;
    @Getter
    @Setter
    private int salary;
    @Getter
    @Setter
    private double commission;

    @OneToOne()
    @JoinColumn(name = "account_id")
    @Getter
    @Setter
    private Account account;

    @ManyToOne
    @JoinColumn(name = "salonId")
    @Getter
    @Setter
    private Salon salon;

    @OneToMany(mappedBy = "stylist", cascade = CascadeType.ALL)
    private List<Appointment> appointments;
}
