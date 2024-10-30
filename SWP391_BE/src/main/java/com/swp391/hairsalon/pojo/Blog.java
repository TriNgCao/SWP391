package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.sql.Date;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Getter
@Setter
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int blogId;

    @Column(nullable = false)
    private String title;

    @Lob  
    @Column(nullable = false)
    private String content;

    @Column(nullable = true) 
    private String imageName;

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    @JsonIgnore
    private Account account;  

    @Column(nullable = false)
    private Date createDate;

    @Column(name = "status")
    private boolean status;

    @PrePersist
    protected void onCreate() {
        this.createDate = Date.valueOf(LocalDate.now());
    }

    public Blog(){}

  
    public Blog(String title, String content, Account account, String imageName) {
        this.title = title;
        this.content = content;
        this.account = account;
        this.imageName = imageName;  
        this.status = true;
    }

    
}
