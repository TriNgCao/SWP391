package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SalonService")
public class SalonService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter
    @Setter
    @Column(name = "service_id")
    private Long serviceId;

    @Getter
    @Setter
    @Column(name = "service_name")
    private String serviceName;

    @Getter
    @Setter
    @Column(name = "description")
    private String serviceDescription;

    @Getter
    @Setter
    @Column(name = "price")
    private double servicePrice;

    @Getter
    @Setter
    @Column(name = "max_time")
    private int maxTime;

    
    @ManyToMany(mappedBy = "services")
    private List<Appointment> appointments;
}
