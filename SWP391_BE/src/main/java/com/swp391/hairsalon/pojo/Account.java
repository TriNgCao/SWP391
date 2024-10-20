package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@NoArgsConstructor

public class Account {

    @Id
    @Column (name = "account_id")
    @Getter
    @Setter
    private String id;

    @Getter
    @Setter
    @Column (name = "name", nullable = true)
    private String name;

    @Getter
    @Setter
    @Column (name = "password", nullable = true)
    private String password;

    @Getter
    @Setter
    @Column (name = "email", nullable = true)
    private String email;

    @Getter
    @Setter
    @Column (name = "phone_number", nullable = true)
    private String phone;

    @Getter
    @Setter
    @Column (name = "role")
    private int role;

    @Getter
    @Setter
    @Column (name = "status")
    private boolean active;

    @Getter
    @Setter
    @Column (name = "register_date", nullable = true)
    private Date registerDate;

    
    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private Customer customer;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private Manager manager;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private Staff staff;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL)
    private Stylist stylist;
}
