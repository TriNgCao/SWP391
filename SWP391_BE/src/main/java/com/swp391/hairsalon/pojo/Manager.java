package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter

public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int managerId;

    @OneToOne()
    @JoinColumn(name = "account_id")
    private Account account;

    @OneToOne()
    @JoinColumn(name = "salonId")
    private Salon salon;
}
