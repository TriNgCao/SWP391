package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "SalonService")
public class SalonService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Id")
    private int serviceId;

    @Column(name = "Name")
    private String serviceName;

    @Column(name = "Description")
    private String serviceDescription;

    private String category;

    @Column(name = "Price")
    private double servicePrice;

    @Column(name = "Duration")
    private int maxTime;

    private String imageName;

}
