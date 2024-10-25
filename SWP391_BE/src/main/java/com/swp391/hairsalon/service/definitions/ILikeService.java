package com.swp391.hairsalon.service.definitions;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.swp391.hairsalon.pojo.Likes;

import java.util.List;
@Service
public interface ILikeService {
    public List<Likes> getAllLikes();

    

    public Likes updateLikes(Likes like);

    public Likes getLikeById(int id);

    public void deleteLike(Likes like);

    public long countLikeByBlogId(int id);

    public Likes findByAccountIdAndBlogId(String accountId, int blogId);

}
