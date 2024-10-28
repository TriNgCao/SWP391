package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookedSchedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private int bookedTime;
    private int duration;
    private boolean booked;

    @ManyToOne
    @JoinColumn(name = "schedule_id")
    private Schedule schedule;
}
