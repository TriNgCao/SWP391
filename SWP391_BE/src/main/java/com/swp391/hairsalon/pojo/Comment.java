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
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int commentId;  // Thay đổi kiểu dữ liệu thành int

    @ManyToOne
    @JoinColumn(name = "blog_id", nullable = false)
    private Blog blog;  // Liên kết tới bài blog mà bình luận

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account customer;  // Liên kết tới tài khoản Customer đã bình luận

    @Lob  // Có thể lưu nội dung dài
    @Column(nullable = false)
    private String content;  // Nội dung bình luận

    @Column(nullable = false)
    private LocalDateTime commentDate;  // Ngày giờ bình luận

    // Hàm khởi tạo với các trường cần thiết
    public Comment(Blog blog, Account customer, String content) {
        this.blog = blog;
        this.customer = customer;
        this.content = content;
        this.commentDate = LocalDateTime.now() ;  // Tự động lấy thời gian khi bình luận
    }
}
    