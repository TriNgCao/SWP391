package com.swp391.hairsalon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.swp391.hairsalon.pojo.Blog;
import com.swp391.hairsalon.repository.IBlogRepository;
import com.swp391.hairsalon.service.definitions.IBlogService;

@Service
public class BlogService implements IBlogService {
    @Autowired
    private IBlogRepository iBlogRepository;

    @Override
    public List<Blog> getAllBlog() {
        return iBlogRepository.findAll();
    }

    @Override
    public Blog getBlogById(int id) {
        return iBlogRepository.getReferenceById(id);
    }

    @Override
    public Blog addBlog(Blog blog) {
        return iBlogRepository.save(blog);
    }

    @Override
    public void deleteBlog(int id) {
        iBlogRepository.delete(getBlogById(id));
    }

    @Override
    public Blog updateBlog(Blog blog) {
        return iBlogRepository.saveAndFlush(blog);
    }

}
