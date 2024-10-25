package com.swp391.hairsalon.service.definitions;
import java.util.List;

import com.swp391.hairsalon.pojo.Blog;
public interface IBlogService {
    public List<Blog> getAllBlog();
    public Blog getBlogById(int id);
    public Blog addBlog(Blog blog);
    public void deleteBlog(int id);
    public Blog updateBlog(Blog blog);
    
}
