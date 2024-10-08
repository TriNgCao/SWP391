package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "Account")
@NoArgsConstructor
@Getter
@Setter
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column (name = "account_id")
    private String id;

    @Column (name = "name")
    private String name;

    @Column (name = "password")
    private String password;

    @Column (name = "email")
    private String email;

    @Column (name = "phone_number")
    private String phone;

    @Column (name = "role")
    private int role;

    @Column (name = "status")
    private boolean active;

    @Column (name = "register_date")
    private Date registerDate;
}
