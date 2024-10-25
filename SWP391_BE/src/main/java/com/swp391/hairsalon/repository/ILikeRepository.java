package com.swp391.hairsalon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.swp391.hairsalon.pojo.Likes;
import java.util.List;

@Repository
public interface ILikeRepository extends JpaRepository<Likes, Integer> {
    public List<Likes> findByBlog_BlogId(int blogId);
    
    public Likes findByAccount_IdAndBlog_BlogId(String accountId, int blogId);

    @Query("SELECT COUNT(l) FROM Likes l WHERE l.blog.blogId = :blogId")
    public long countLikeByBlogId(@Param("blogId") int id);

}
