package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@Getter
@Setter
public class Likes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int likeId;

    @ManyToOne
    @JoinColumn(name = "blog_id", nullable = false)
    private Blog blog;  

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account; 

    @Column(nullable = false)
    private LocalDateTime likeDate;  

    public Likes(Blog blog, Account account) {
        this.blog = blog;
        this.account = account;
        this.likeDate = LocalDateTime.now(); 
    }
}
