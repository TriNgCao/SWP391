package com.swp391.hairsalon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.swp391.hairsalon.pojo.Blog;

@Repository
public interface IBlogRepository extends JpaRepository<Blog,Integer> {
    
}
