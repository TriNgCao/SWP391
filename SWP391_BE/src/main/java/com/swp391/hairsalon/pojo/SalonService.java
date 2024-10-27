package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "SalonService")
public class SalonService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "service_id")
    private Long serviceId;


    @Column(name = "service_name")
    private String serviceName;


    @Column(name = "description")
    private String serviceDescription;

    private String category;

//    @Column(name = "Price")

    @Column(name = "price")
    private double servicePrice;


    @Column(name = "max_time")
    private int maxTime;


    @ManyToMany(mappedBy = "services")
    private List<Appointment> appointments;

    private String imageName;

}
