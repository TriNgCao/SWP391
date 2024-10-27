package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
    @Setter
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    
    private int customerId;

    
    @Column(name = "loyalty_points")
    private int loyaltyPoints;

    
    @OneToOne()
    @JoinColumn(name = "account_id")
    private Account account;

    
    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore 
    private List<Appointment> appointments;
}
