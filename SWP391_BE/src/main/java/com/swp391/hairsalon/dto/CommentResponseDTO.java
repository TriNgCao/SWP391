package com.swp391.hairsalon.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.google.auto.value.AutoValue.Builder;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CommentResponseDTO {
    private int commentId;
    
    private String accountName;

    private String content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
    private LocalDateTime createDate;

    public CommentResponseDTO(String accountName, String content, LocalDateTime createDate) {
        this.accountName = accountName;
        this.content = content;
        this.createDate = createDate;
    }

    
}
