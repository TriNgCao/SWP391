package com.swp391.hairsalon.pojo;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Payroll {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int payrollId;

    private int employeeId; // ID của stylist hoặc staff

    private double earning; // Lương tính được

    private LocalDate payrollDate; // Ngày tính lương

    private boolean status; // Trạng thái (đã thanh toán hay chưa)

    @ManyToOne
    @JoinColumn(name = "salon_id")
    @JsonIgnore // Liên kết với bảng Salon
    private Salon salon; // Đối tượng Salon

    private String name; // Tên nhân viên
    private String email; // Email nhân viên
    private String phone; // Số điện thoại nhân viên
    private int role; // Vai trò (2 cho stylist, 3 cho staff)
}
