package com.swp391.hairsalon.dto;
import java.sql.Date;

import com.google.auto.value.AutoValue.Builder;
import com.swp391.hairsalon.pojo.Comment;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class BlogResponseDTO {
    private int blogId;
    private String accountId;
    private String managerName;
    private String imageName;
    private String title;
    private String content;
    private Date createDate;
    private boolean status;
    private boolean isLikeByAccount;
    private int likeId;
    

}
