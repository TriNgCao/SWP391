package com.swp391.hairsalon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swp391.hairsalon.dto.CommentRequestDTO;
import com.swp391.hairsalon.dto.CommentResponseDTO;
import com.swp391.hairsalon.pojo.Blog;
import com.swp391.hairsalon.pojo.Comment;
import com.swp391.hairsalon.service.definitions.IAccountService;
import com.swp391.hairsalon.service.definitions.IBlogService;
import com.swp391.hairsalon.service.definitions.ICommentService;

import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("api/cmt")
public class CommentController {
    @Autowired
    private ICommentService iCommentService;
    @Autowired
    private IBlogService iBlogService;
    @Autowired
    private IAccountService iAccountService;

    @GetMapping("/{blogId}")
    public List<CommentResponseDTO> getCommentsByBlogId(@PathVariable int blogId) {
        List<Comment> commentsList = iCommentService.getCommentByBlogId(blogId);
        List<CommentResponseDTO> commentResponseDTOs = new ArrayList<>();
        if (commentsList != null) {
            for (Comment comment : commentsList) {
                commentResponseDTOs.add(new CommentResponseDTO(comment.getCommentId(),comment.getCustomer().getName(), comment.getContent(), comment.getCommentDate()));
            }
            return commentResponseDTOs;
        } else {
            return null;
        }
    }

    @GetMapping("/count/{blogId}")
    public long getNumberOfCommentByBlogId(@PathVariable int blogId){
        Blog blog = iBlogService.getBlogById(blogId);
        if (blog != null) {
            return iCommentService.getNumberOfCommentByBlogId(blogId) ;
        } else {
            return -1;
        }
    }

    @PostMapping
    public ResponseEntity<String> addComment(@RequestBody CommentRequestDTO commentRequestDTO) {
        Comment comment = new Comment(iBlogService.getBlogById(commentRequestDTO.getBlogId()),
                iAccountService.getAccountById(commentRequestDTO.getAccountId()), commentRequestDTO.getContent());
        try {
            comment = iCommentService.createAComment(comment);
            return ResponseEntity.ok("Add comment successfully!");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<String> editComment (@PathVariable int commentId, @RequestBody CommentRequestDTO commentRequestDTO){
        Comment comment = iCommentService.getCommentById(commentId);
        if (comment!=null){
            try {
                comment.setContent(commentRequestDTO.getContent());
                comment = iCommentService.editAComment(comment);
                return ResponseEntity.ok("Edit successfully!");
            } catch (Exception e) {
                // TODO: handle exception
                return ResponseEntity.badRequest().build();
            }
        } else {
            return ResponseEntity.badRequest().build();
        }
        
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable int commentId){
        Comment comment = iCommentService.getCommentById(commentId);
    
    // Kiểm tra nếu comment không tồn tại
    if (comment == null) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Comment not found.");
    }

    // Thử xóa và xử lý ngoại lệ nếu xảy ra lỗi
    try {
        iCommentService.delete(commentId);
        return ResponseEntity.ok("Delete successfully!");
    } catch (Exception e) {
        // Log chi tiết lỗi nếu cần
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting the comment.");
    }
    }
}
