package com.swp391.hairsalon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swp391.hairsalon.pojo.Likes;
import com.swp391.hairsalon.repository.ILikeRepository;
import com.swp391.hairsalon.service.definitions.ILikeService;

import jakarta.transaction.Transactional;

@Service
public class LikeService implements ILikeService {

    @Autowired
    private ILikeRepository iLikeRepository;

    @Override
    public List<Likes> getAllLikes() {
        return iLikeRepository.findAll();
    }

    @Override
    @Transactional
    public Likes updateLikes(Likes like) {
        return iLikeRepository.save(like);
        
    }

    @Override
    public long countLikeByBlogId(int id) {
        return iLikeRepository.countLikeByBlogId(id);
    }

    @Override
    public Likes getLikeById(int id) {
        return iLikeRepository.getReferenceById(id);
    }

    @Override
    @Transactional
    public void deleteLike(Likes like) {
        iLikeRepository.delete(like);
    }

    @Override
    public Likes findByAccountIdAndBlogId(String accountId, int blogId) {
        return iLikeRepository.findByAccount_IdAndBlog_BlogId(accountId, blogId);
    }

}
