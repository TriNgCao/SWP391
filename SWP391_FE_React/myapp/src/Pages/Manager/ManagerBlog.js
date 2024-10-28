

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Modal,
  TextField,
  CircularProgress,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  DialogContent,
  DialogContentText,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import CommentIcon from "@mui/icons-material/Comment";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


const ManagerBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newBlog, setNewBlog] = useState({
    accountId: "4",
    title: "",
    content: "",
    image: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [creating, setCreating] = useState(false);
  const [likesCount, setLikesCount] = useState({});
  const [commentsCount, setCommentsCount] = useState({});
  const [newComment, setNewComment] = useState(""); // Thêm state cho comment mới
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // Modal xác nhận xóa
  const [blogToDelete, setBlogToDelete] = useState(null); // Blog sẽ bị xóa
  const [editedComment, setEditedComment] = useState("");
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");


  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };


  const handleDetailModalClose = () => setDetailModalOpen(false);
  // -----------------------------------------------------------------------
  // Mở modal chỉnh sửa bình luận
  const openEditModal = (comment) => {
    if (comment.accountId === "4") {
      setCommentToEdit(comment);
      setEditedComment(comment.content);
    } else {
      alert("You can only edit your own comments.");
    }
  };
const filterBlogs = blogs.filter((blog) => blog.title.toLowerCase().includes(searchKeyword.toLowerCase()));

  // Đóng modal chỉnh sửa bình luận
  const closeEditModal = () => {
    setCommentToEdit(null);
    setEditedComment("");
  };
  // Chỉnh sửa bình luận
  const handleEditComment = async () => {
    if (!editedComment.trim()) {
      alert("Please enter a comment.");
      return;
    }


    try {
      await axios.put(
        `http://localhost:8080/api/cmt/${commentToEdit.commentId}`,
        {
          content: editedComment,
        }
      );
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.commentId === commentToEdit.commentId
            ? { ...comment, content: editedComment }
            : comment
        )
      );
      closeEditModal();
      alert("Comment edited successfully!");
    } catch (error) {
      console.error("Error editing comment:", error);
      alert("Failed to edit comment.");
    }
  };
  // Mở popup xác nhận xóa
  const openDeleteConfirm = (commentId) => {
    setCommentToDelete(commentId);
    setDeleteConfirmOpen(true);
  };


  // Đóng popup xác nhận xóa
  const closeDeleteConfirm = () => {
    setCommentToDelete(null);
    setDeleteConfirmOpen(false);
  };


  // Xóa bình luận
  const handleDeleteComment = async () => {
    if (!commentToDelete) return;


    try {
      await axios.delete(`http://localhost:8080/api/cmt/${commentToDelete}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.commentId !== commentToDelete)
      );
      closeDeleteConfirm();
      alert("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment.");
    }
  };
  //------------------------------------------------------------------------
  const resetForm = () => {
    setNewBlog({ accountId: "4", title: "", content: "", image: null });
    setCurrentBlog(null);
    setSelectedImage(null);
  };


  const fetchBlogs = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/blog");
      const sortedDate = response.data.sort((a,b) => new Date(b.createDate) - new Date(a.createDate));
      setBlogs(sortedDate);
      response.data.forEach((blog) => {
        fetchLikeCount(blog.blogId);
        fetchCommentCount(blog.blogId);
      });
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };


  const fetchLikeCount = async (blogId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/like/${blogId}`
      );
      setLikesCount((prev) => ({ ...prev, [blogId]: response.data }));
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };


  const fetchCommentCount = async (blogId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cmt/count/${blogId}`
      );
      setCommentsCount((prev) => ({ ...prev, [blogId]: response.data }));
    } catch (error) {
      console.error("Error fetching comment count:", error);
    }
  };


  const fetchComments = async (blogId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/cmt/${blogId}`
      );
      const sortedComments = response.data.sort(
        (a, b) => new Date(b.createDate) - new Date(a.createDate)
      );
      setComments(sortedComments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


  useEffect(() => {
    fetchBlogs();
  }, []);

const handleSearchChange = (e) =>{
  setSearchKeyword(e.target.value);
};
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };


  const handleSaveBlog = async () => {
    if (!newBlog.title || !newBlog.content) {
      alert("Please fill in all fields.");
      return;
    }


    setCreating(true);


    try {
      let blogId = null;


      if (currentBlog) {
        // Cập nhật blog hiện tại
        const response = await axios.put(
          `http://localhost:8080/api/blog/${currentBlog.blogId}`,
          {
            accountId: currentBlog.accountId,
            title: newBlog.title,
            content: newBlog.content,
          }
        );
        blogId = response.data.blogId || currentBlog.blogId;
      } else {
        // Tạo blog mới
        const response = await axios.post("http://localhost:8080/api/blog", {
          accountId: newBlog.accountId,
          title: newBlog.title,
          content: newBlog.content,
        });
        blogId = response.data;
      }


      // Chỉ upload ảnh nếu có ảnh mới
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);


        await axios.put(
          `http://localhost:8080/api/blog/image/upload/${blogId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }


      fetchBlogs();
      handleClose();
      alert("Blog saved successfully!");
    } catch (error) {
      console.error("Error saving blog:", error);
      alert("Failed to save blog.");
    } finally {
      setCreating(false);
    }
  };


  const handleEditBlog = (blog) => {
    setCurrentBlog(blog);
    setNewBlog({
      accountId: blog.accountId,
      title: blog.title,
      content: blog.content,
    });


    setSelectedImage(null);
    setOpen(true);
  };


  const handleCardClick = (blog) => {
    setSelectedBlog(blog);
    fetchComments(blog.blogId);
    setDetailModalOpen(true);
  };


  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert("Please enter a comment.");
      return;
    }


    const commentData = {
      accountId: "4",
      blogId: selectedBlog.blogId,
      content: newComment,
    };


    try {
      await axios.post("http://localhost:8080/api/cmt", commentData);
      setNewComment("");
      fetchComments(selectedBlog.blogId);
      alert("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment.");
    }
  };
  // Mở modal xác nhận xóa
  const openDeleteModal = (blog) => {
    setBlogToDelete(blog);
    setDeleteModalOpen(true);
  };


  // Đóng modal xác nhận xóa
  const closeDeleteModal = () => {
    setBlogToDelete(null);
    setDeleteModalOpen(false);
  };


  // Xử lý xóa blog
  const handleDeleteBlog = async () => {
    if (!blogToDelete) return;


    try {
      await axios.delete(
        `http://localhost:8080/api/blog/${blogToDelete.blogId}`
      );
      setDeleteModalOpen(false);
      setBlogToDelete(null);
      fetchBlogs(); // Làm mới danh sách blog
      alert("Blog deleted successfully!");
    } catch (error) {
      console.error("Error deleting blog:", error);
      alert("Failed to delete blog.");
    }
  };


  return (
    <Box sx={{ padding: 4, backgroundColor: "#fff", minHeight: "100vh" }}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#4CAF50",
          mb: 2,
          "&:hover": { backgroundColor: "#388E3C" },
        }}
        onClick={handleOpen}
      >
        Add Blog
      </Button>
      <TextField 
      fullWidth
      label="Search By Title"
      variant="outlined"
      value={searchKeyword}
      onChange={handleSearchChange }
      sx= {{mb:2}}
        
/>
      <Grid container spacing={2}>
        {filterBlogs.map((blog) => (
          <Grid item xs={12} md={4} key={blog.blogId}>
            <Card
              sx={{
                height: 350,
                position: "relative",
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: 2,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: 5,
                  cursor: "pointer",
                },
              }}
              onClick={() => handleCardClick(blog)}
            >
              {blog.imageName && (
                <CardMedia
                  component="img"
                  height="190"
                  image={`http://localhost:8080/api/blog/image/${blog.imageName}`}
                  alt={blog.title}
                  sx={{ objectFit: "cover" }}
                />
              )}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  padding: 2,
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#4CAF50",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {blog.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    mb: 1,
                  }}
                >
                  {blog.content}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  {blog.createDate}
                </Typography>
                <Box display="flex" alignItems="center" mt={1}>
                  <ThumbUpAltIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    {likesCount[blog.blogId] || 0}
                  </Typography>
                  <CommentIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">
                    {commentsCount[blog.blogId] || 0}
                  </Typography>
                </Box>
                <Typography variant="caption" color="textSecondary" sx={{mt:1.5}}>
                  {blog.managerName}
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 8,
                    right: 8,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      backgroundColor: "#4CAF50",
                      "&:hover": { backgroundColor: "#388E3C" },
                    }}
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn việc mở modal chi tiết
                      handleEditBlog(blog);
                    }}
                  >
                    Edit
                  </Button>
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation(); // Ngăn việc mở modal chi tiết
                      openDeleteModal(blog);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>


      {/* Modal Chi tiết Blog */}
      <Modal open={detailModalOpen} onClose={handleDetailModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            height: 950,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY:"auto"
            
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 8, right: 8 }}
            onClick={handleDetailModalClose}
          >
            <CloseIcon />
          </IconButton>
          {selectedBlog && (
            <>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", fontSize:"35px", textAlign:"center" }}>
                {selectedBlog.title}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold", fontSize:"15px", textAlign:"right" }}>
                {`${selectedBlog.managerName}, ${selectedBlog.createDate}`}
              </Typography>

              {selectedBlog.imageName && (
                <CardMedia
                  component="img"
                  height="500"
                  image={`http://localhost:8080/api/blog/image/${selectedBlog.imageName}`}
                  alt={selectedBlog.title}
                  sx={{ objectFit: "cover", mb: 2, borderRadius: 2 }}
                />
              )}


              <Typography variant="body1" color="text.primary" sx={{ mb: 2 }}>
                {selectedBlog.content}
              </Typography>


              <Divider sx={{ my: 2 }} />

              <Box display="flex" alignItems="center" mt={1}>
                  <ThumbUpAltIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2" sx={{ mr: 2 }}>
                    {likesCount[selectedBlog.blogId] || 0}
                  </Typography>
                  <CommentIcon fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">
                    {commentsCount[selectedBlog.blogId] || 0}
                  </Typography>
                </Box>
              <Typography variant="subtitle1" sx={{ mb: 1 }}>
                Comments:
              </Typography>
              <TextField
                fullWidth
                label="Add a comment..."
                variant="outlined"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#4CAF50",
                  mb: 2,
                  "&:hover": { backgroundColor: "#388E3C" },
                }}
                onClick={handleCommentSubmit}
              >
                Submit Comment
              </Button>


              <List
                sx={{
                  maxHeight: 300, // Giới hạn chiều cao của danh sách (300px là ví dụ)
                  overflowY: "auto", // Thêm thanh cuộn dọc nếu danh sách dài
                }}
              >
                {comments.length > 0 ? (
                  comments.map((comment) => (
                    <ListItem
                      key={comment.commentId}
                      alignItems="flex-start"
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <ListItemText
                        primary={`${
                          comment.accountId === "4" ? "Me" : comment.accountName
                        } (${comment.createDate})`}
                        secondary={
                          <Box
                            sx={{
                              maxHeight: 60, // Giới hạn chiều cao của nội dung comment (60px là ví dụ)
                              overflowY: "auto", // Thêm thanh cuộn dọc nếu nội dung dài
                            }}
                          >
                            {comment.content}
                          </Box>
                        }
                      />
                      <Box sx={{ display: "flex", gap: 1 }}>
                        {comment.accountId === "4" && (
                          <IconButton
                            edge="end"
                            aria-label="edit"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(comment);
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        )}
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={(e) => {
                            e.stopPropagation();
                            openDeleteConfirm(comment.commentId);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </ListItem>
                  ))
                ) : (
                  <Typography variant="body2" color="textSecondary">
                    No comments available.
                  </Typography>
                )}
              </List>


              {/* Popup xác nhận xóa */}
              <Dialog open={deleteConfirmOpen} onClose={closeDeleteConfirm}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete this comment?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closeDeleteConfirm} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleDeleteComment} color="error">
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>


              {/* Modal chỉnh sửa bình luận */}
              {commentToEdit && commentToEdit.accountId === "4" && (
                <Dialog open={Boolean(commentToEdit)} onClose={closeEditModal}>
                  <DialogTitle>Edit Comment</DialogTitle>
                  <DialogContent>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                      autoFocus
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closeEditModal} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleEditComment} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>
              )}
            </>
          )}
        </Box>
      </Modal>


      {/* Modal Thêm hoặc Chỉnh sửa Blog */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            {currentBlog ? "Edit Blog" : "Add New Blog"}
          </Typography>
          <TextField
            fullWidth
            label="Title"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Content"
            multiline
            rows={4}
            value={newBlog.content}
            onChange={(e) =>
              setNewBlog({ ...newBlog, content: e.target.value })
            }
            sx={{ mb: 2 }}
          />


          {currentBlog?.imageName && !selectedImage && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Current Image:
              </Typography>
              <img
                src={`http://localhost:8080/api/blog/image/${currentBlog.imageName}`}
                alt={newBlog.title}
                style={{ width: "100%", height: "auto", marginBottom: 8 }}
              />
            </Box>
          )}


          <input type="file" onChange={handleImageChange} />
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: "#4CAF50" }}
            onClick={handleSaveBlog}
            disabled={creating}
          >
            {creating ? <CircularProgress size={24} /> : "Save"}
          </Button>
        </Box>
      </Modal>
      <Dialog open={deleteModalOpen} onClose={closeDeleteModal}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteModal} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteBlog} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};


export default ManagerBlogs;



