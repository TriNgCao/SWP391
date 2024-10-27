package com.swp391.hairsalon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;
import com.swp391.hairsalon.dto.BlogRequestDTO;
import com.swp391.hairsalon.dto.BlogResponseDTO;
import com.swp391.hairsalon.pojo.Blog;
import com.swp391.hairsalon.service.definitions.IAccountService;
import com.swp391.hairsalon.service.definitions.IBlogService;
import com.swp391.hairsalon.service.definitions.IFileService;
import java.io.InputStream;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/api/blog")
public class BlogController {
    @Autowired
    private IBlogService iBlogService;
    
    @Autowired
    private IAccountService iAccountService;
    
    @Value("${project.image}")
    private String path;
    @Autowired
    private IFileService iFileService;

    @GetMapping
    public List<Blog> getAllBlog() {
        return iBlogService.getAllBlog();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BlogResponseDTO> getBlogById(@PathVariable int id) {
        Blog blog = iBlogService.getBlogById(id);
        BlogResponseDTO responseDTO = new BlogResponseDTO(id, blog.getAccount().getId(), blog.getAccount().getName(), blog.getImageName(), blog.getTitle(), blog.getContent(), blog.getCreateDate(), blog.isStatus());
        return ResponseEntity.ok(responseDTO);
    }

    @PostMapping
    public ResponseEntity<Integer> addBlog(@RequestBody BlogRequestDTO blogRequestDTO) {
        Blog blog = new Blog();
        blog.setAccount(iAccountService.getAccountById(blogRequestDTO.getAccountId()));
        blog.setContent(blogRequestDTO.getContent());
        blog.setTitle(blogRequestDTO.getTitle());
        try {
            iBlogService.addBlog(blog);
            
            return ResponseEntity.ok(blog.getBlogId());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("image/upload/{id}")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<String> updateImageForBlog(@RequestParam("image") MultipartFile image, @PathVariable int id) throws IOException{
        String fileName = iFileService.uploadImage(path, image);
        Blog blog =iBlogService.getBlogById(id);
        blog.setImageName(fileName);
        blog = iBlogService.updateBlog(blog);
        return ResponseEntity.ok("Add image success!");

    }
    
    

    @GetMapping(value = "/image/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
    public void downloadImage(@PathVariable("imageName") String imageName, HttpServletResponse response) throws IOException {
        InputStream resource = iFileService.downloadImage(path, imageName);
        response.setContentType(MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(resource, response.getOutputStream());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable int id, @RequestBody BlogRequestDTO blogRequestDTO ) {
        //TODO: process PUT request
        Blog blog = iBlogService.getBlogById(id);
        blog.setContent(blogRequestDTO.getContent());
        blog.setTitle(blogRequestDTO.getTitle());
        try {
            iBlogService.updateBlog(blog);
            
            return ResponseEntity.ok(iBlogService.updateBlog(blog));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable int id){
        try {
            iBlogService.deleteBlog(id);
            return ResponseEntity.ok("Deleted successfully!");
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().build();
        }
        
    }

}
