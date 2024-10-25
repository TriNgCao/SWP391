package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.util.List;

@Entity
@NoArgsConstructor
public class Account {

    @Id
    @Column(name = "account_id")
    @Getter
    @Setter
    private String id;

    @Getter
    @Setter
    @Column(name = "name", nullable = true)
    private String name;

    @Getter
    @Setter
    @Column(name = "password", nullable = true)
    private String password;

    @Getter
    @Setter
    @Column(name = "email", nullable = true)
    private String email;

    @Getter
    @Setter
    @Column(name = "phone_number", nullable = true)
    private String phone;

    @Getter
    @Setter
    @Column(name = "role")
    private int role;

    @Getter
    @Setter
    @Column(name = "status")
    private boolean active;

    @Getter
    @Setter
    @Column(name = "register_date", nullable = true)
    private Date registerDate;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Notification> notifications;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Customer customer;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Manager manager;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Staff staff;

    @OneToOne(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Stylist stylist;

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Likes> likes;  // Liên kết tới lượt like của Customer

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Comment> comments;  // Liên kết tới bình luận của Customer

    @OneToMany(mappedBy = "account", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Blog> blogs;  // Liên kết tới blog của Manager
}
