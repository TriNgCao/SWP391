package com.swp391.hairsalon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swp391.hairsalon.pojo.Comment;
import com.swp391.hairsalon.repository.ICommentRepository;
import com.swp391.hairsalon.service.definitions.ICommentService;

import jakarta.transaction.Transactional;

@Service
public class CommentService implements ICommentService {
    
    @Autowired
    ICommentRepository iCommentRepository;

    @Override
    @Transactional
    public Comment createAComment(Comment comment) {
        return iCommentRepository.save(comment);
    }

    @Override
    @Transactional
    public Comment editAComment(Comment comment) {
        return iCommentRepository.saveAndFlush(comment);
    }

    @Override
    public List<Comment> getCommentByBlogId(int blogId) {
        return iCommentRepository.findByBlog_BlogId(blogId);
    }

    @Override
    public int getNumberOfCommentByBlogId(int blogId) {
        return iCommentRepository.countCommentByBlogId(blogId);
    }

    @Override
    public Comment getCommentById(int id) {
        return iCommentRepository.getReferenceById(id);
    }

    @Override
    @Transactional
    public void delete(int id) {
        iCommentRepository.delete(getCommentById(id));
    }

}
