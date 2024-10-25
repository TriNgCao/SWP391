package com.swp391.hairsalon.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.swp391.hairsalon.dto.LikeRequestDTO;
import com.swp391.hairsalon.dto.LikeResponseDTO;
import com.swp391.hairsalon.pojo.Likes;
import com.swp391.hairsalon.service.definitions.IAccountService;
import com.swp391.hairsalon.service.definitions.IBlogService;
import com.swp391.hairsalon.service.definitions.ICustomerService;
import com.swp391.hairsalon.service.definitions.ILikeService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/like")
public class LikeController {

    @Autowired
    private ILikeService iLikeService;

    @Autowired
    private IAccountService iAccountService;

    @Autowired
    private IBlogService iBlogService;

    @GetMapping("/{blogId}")
    public long countLikeByBlogId(@PathVariable int blogId) {
        return iLikeService.countLikeByBlogId(blogId);
    }

    @GetMapping()
    public LikeResponseDTO findLikeByCustomerIdAndBlogId(@RequestBody LikeRequestDTO likerRequestDTO) {
        try {
            Likes like = iLikeService.findByAccountIdAndBlogId(likerRequestDTO.getAccountId(),
                    likerRequestDTO.getBlogId());
            if (like != null) {
                return new LikeResponseDTO(like.getLikeId(), like.getAccount().getId(), like.getBlog().getBlogId());
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }

    }

    @PostMapping
    public ResponseEntity<String> likeBlog(@RequestBody LikeRequestDTO likerRequestDTO) {
        Likes like = new Likes(iBlogService.getBlogById(likerRequestDTO.getBlogId()),
                iAccountService.getAccountById(likerRequestDTO.getAccountId()));
        try {
            like = iLikeService.updateLikes(like);
            return ResponseEntity.ok("Like created");
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("{likeId}")
    public ResponseEntity<String> deleteLike(@PathVariable int likeId) {
        try {
            iLikeService.deleteLike(iLikeService.getLikeById(likeId));
            return ResponseEntity.ok("Deleted like");
        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().build();
        }
    }

}
