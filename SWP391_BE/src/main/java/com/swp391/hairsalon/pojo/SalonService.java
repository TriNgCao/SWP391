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


    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "appointment_service", // Tên bảng trung gian
            joinColumns = @JoinColumn(name = "service_id"), // Khóa ngoại cho Appointment
            inverseJoinColumns = @JoinColumn(name = "appointment_id") // Khóa ngoại cho SalonService
    )
    private List<Appointment> appointments;


}
