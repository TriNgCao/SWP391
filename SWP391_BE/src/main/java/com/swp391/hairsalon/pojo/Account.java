package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Account {

    @Id
    @Column (name = "account_id")
    private String id;

    @Column (name = "name", nullable = true)
    private String name;

    @Column (name = "password", nullable = true)
    private String password;

    @Column (name = "email", nullable = true)
    private String email;

    @Column (name = "phone_number", nullable = true)
    private String phone;

    @Column (name = "role")
    private int role;

    @Column (name = "status")
    private boolean active;

    @Column (name = "register_date", nullable = true)
    private Date registerDate;


    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Customer customer;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Manager manager;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Staff staff;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Stylist stylist;
}
