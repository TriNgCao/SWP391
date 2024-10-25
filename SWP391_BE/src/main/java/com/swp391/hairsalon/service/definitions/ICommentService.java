package com.swp391.hairsalon.service.definitions;

import java.util.List;

import org.springframework.stereotype.Service;

import com.swp391.hairsalon.pojo.Comment;

@Service
public interface ICommentService {
    public Comment createAComment(Comment comment);

    public Comment editAComment(Comment comment);

    public List<Comment> getCommentByBlogId(int blogId);

    public int getNumberOfCommentByBlogId(int blog);

    public Comment getCommentById(int id);

    public void delete (int id);

}
