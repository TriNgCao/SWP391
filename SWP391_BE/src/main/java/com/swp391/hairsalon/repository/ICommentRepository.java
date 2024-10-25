package com.swp391.hairsalon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.swp391.hairsalon.pojo.Comment;
import java.util.List;
@Repository
public interface ICommentRepository extends JpaRepository<Comment, Integer> {
    public List<Comment> findByBlog_BlogId(int blogId);

    @Query("SELECT COUNT(c) FROM Comment c WHERE c.blog.blogId = :blogId")
    public int countCommentByBlogId(@Param("blogId") int id);
}
