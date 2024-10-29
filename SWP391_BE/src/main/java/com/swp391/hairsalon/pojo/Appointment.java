package com.swp391.hairsalon.pojo;

import java.sql.Date;
import java.time.LocalTime;
import java.util.List;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "appointment_id")
    private int id;

    @ManyToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "cus_id")
    private Customer customer;

    @ManyToOne(cascade = CascadeType.PERSIST,fetch = FetchType.EAGER)
    @JoinColumn(name = "stylist_id") // Khóa ngoại liên kết với Stylist
    private Stylist stylist;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "branch_id")
    private Salon branch;

    @ManyToMany(mappedBy = "appointments")
    private List<SalonService> services;

    @Column(name = "appointment_date")
    private Date date;

    @Column(name = "start_time")
    private LocalTime startTime;

    @Column(name = "end_time")
    private LocalTime endTime;

    @Column(name = "status")
    private String status;

    @Column(name = "rating")
    private int rating = 0;

    @Column(name = "feedback")
    private String feedback;

    public Appointment() {
    }

    

    public Appointment(Customer customer, Stylist stylist, Salon branch, List<SalonService> services, Date date,
            LocalTime startTime, String status, int rating, String feedback) {
        this.customer = customer;
        this.stylist = stylist;
        this.branch = branch;
        this.services = services;
        this.date = date;
        this.startTime = startTime;
        this.endTime = calculateEndTime();
        this.status = status;
        this.rating = rating;
        this.feedback = feedback;
    }



    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Stylist getStylist() {
        return stylist;
    }

    public void setStylist(Stylist stylist) {
        this.stylist = stylist;
    }

    public Salon getBranch() {
        return branch;
    }

    public void setBranch(Salon branch) {
        this.branch = branch;
    }

    public List<SalonService> getServices() {
        return services;
    }

    public void setServices(List<SalonService> services) {
        this.services = services;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public LocalTime getStartTime() {
        this.endTime = calculateEndTime();
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
        this.endTime = calculateEndTime();
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getFeedback() {
        return feedback;
    }

    public void setFeedback(String feedback) {
        this.feedback = feedback;
    }

    public LocalTime calculateEndTime() {
        if (this.startTime==null){
            return null;
        }
        // Tổng thời gian từ tất cả các dịch vụ trong Appointment (phút)
        int totalServiceTimeInMinutes = services.stream().mapToInt(SalonService::getMaxTime).sum();

        // Tính toán endTime
        return startTime.plusMinutes(totalServiceTimeInMinutes * 60);
    }

}
