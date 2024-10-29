import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const BlogPost = () => {
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);

  const accountId = sessionStorage.getItem("userID");
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("userRole");
  const isLoggedIn = token && accountId && userRole;

  const location = useLocation();
  const blogId = location.state?.blogId;

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        // API to fetch blog details by blogId
        // GET http://localhost:8080/api/blog/{blogId}
        const response = await axios.get(`http://localhost:8080/api/blog/${blogId}`);
        setPostData({
          ...response.data,
          imageUrl: `http://localhost:8080/api/blog/image/${encodeURIComponent(response.data.imageName)}`,
        });
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    const fetchComments = async () => {
      try {
        // API to fetch comments for a specific blog post by blogId
        // GET http://localhost:8080/api/cmt/{blogId}
        const response = await axios.get(`http://localhost:8080/api/cmt/${blogId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    const fetchCommentCount = async () => {
      try {
        // API to fetch the total count of comments for a specific blog post
        // GET http://localhost:8080/api/cmt/count/{blogId}
        const response = await axios.get(`http://localhost:8080/api/cmt/count/${blogId}`);
        setCommentCount(response.data);
      } catch (error) {
        console.error("Error fetching comment count:", error);
      }
    };

    const fetchLikeCount = async () => {
      try {
        // API to fetch the total like count for a specific blog post
        // GET http://localhost:8080/api/like/{blogId}
        const response = await axios.get(`http://localhost:8080/api/like/${blogId}`);
        setLikes(response.data);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    const checkIfLiked = async () => {
      try {
        // API to check if the current user has already liked this blog post
        // GET http://localhost:8080/api/like with parameters { blogId, accountId }
        const response = await axios.get("http://localhost:8080/api/like", {
          params: { blogId, accountId }
        });
        setLiked(response.data !== null);
      } catch (error) {
        console.error("Error checking like status:", error);
      }
    };

    if (blogId) {
      fetchBlogDetail();
      fetchComments();
      fetchCommentCount();
      fetchLikeCount();
      if (isLoggedIn) checkIfLiked();
    }
  }, [blogId, accountId, isLoggedIn]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    try {
      // API to submit a new comment
      // POST http://localhost:8080/api/cmt with payload { blogId, accountId, content }
      const response = await axios.post("http://localhost:8080/api/cmt", {
        blogId,
        accountId,
        content: newComment,
      });
      if (response.status === 200) {
        setComments([
          ...comments,
          { commentId: comments.length + 1, accountName: "You", createDate: new Date().toLocaleString(), content: newComment },
        ]);
        setNewComment("");
        setCommentCount(commentCount + 1);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        // API to check for existing like and delete it if the user clicks 'unlike'
        // GET http://localhost:8080/api/like with parameters { blogId, accountId }
        const response = await axios.get("http://localhost:8080/api/like", { params: { blogId, accountId } });
        if (response.data) {
          // API to delete like by likeId if it exists
          // DELETE http://localhost:8080/api/like/{likeId}
          await axios.delete(`http://localhost:8080/api/like/${response.data.likeId}`);
          setLikes(likes - 1);
          setLiked(false);
        }
      } else {
        // API to add a like when the user clicks 'like'
        // POST http://localhost:8080/api/like with payload { blogId, accountId }
        await axios.post("http://localhost:8080/api/like", { blogId, accountId });
        setLikes(likes + 1);
        setLiked(true);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        {/* Post Content */}
        <div style={styles.postHeader}>
          <h2 style={styles.title}>{postData.title}</h2>
        </div>
        <p style={styles.meta}>
          Posted on: {postData.createDate} | Posted by: {postData.managerName}
        </p>
        <p>
          <img src={postData.imageUrl} alt="Blog" style={styles.image} />
        </p>
        <p style={styles.content}>{postData.content}</p>

        {/* Like and Comment Counts */}
        <div style={styles.likeCommentCounts}>
          {isLoggedIn && (
            <span onClick={handleLikeToggle} style={styles.likeCount}>
              <i className={`fa ${liked ? "fa-thumbs-up" : "fa-thumbs-o-up"}`} aria-hidden="true"></i> {likes}
            </span>
          )}
          <span style={styles.commentCount}>
            <i className="fa fa-commenting-o" aria-hidden="true"></i> {commentCount} Comments
          </span>
        </div>

        {/* Comments */}
        <div style={styles.commentsSection}>
          <h3>Comments</h3>
          {isLoggedIn && (
            <form onSubmit={handleCommentSubmit} style={styles.commentForm}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                style={styles.textarea}
              ></textarea>
              <button type="submit" style={styles.button}>
                Submit Comment
              </button>
            </form>
          )}
          <ul style={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment.commentId} style={styles.comment}>
                <div style={styles.vcard}>
                  <img src="images/person_1.jpg" alt="Person" style={styles.commentImage} />
                </div>
                <div style={styles.commentBody}>
                  <h4>{comment.accountName}</h4>
                  <div style={styles.meta}>{comment.createDate}</div>
                  <p>{comment.content}</p>
                  <p>
                    <Link to="#" style={styles.reply}>
                      Reply
                    </Link>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

// Inline styles
const styles = {
  section: {
    padding: "50px 0",
    backgroundColor: "#f9f9f9",
  },
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  },
  postHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "left",
  },
  likeCommentCounts: {
    display: "flex",
    gap: "10px",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  likeCount: {
    cursor: "pointer",
    fontSize: "24px",
    color: "#007bff",
    userSelect: "none",
  },
  commentCount: {
    fontSize: "24px",
    color: "#007bff",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    marginBottom: "20px",
  },
  content: {
    fontSize: "16px",
    lineHeight: "1.6",
    marginBottom: "20px",
    textAlign: "justify",
  },
  meta: {
    fontStyle: "italic",
    color: "#777",
    textAlign: "left",
    marginBottom: "40px",
  },
  commentsSection: {
    borderTop: "1px solid #ddd",
    paddingTop: "20px",
  },
  commentList: {
    listStyleType: "none",
    paddingLeft: 0,
  },
  comment: {
    display: "flex",
    marginTop: "50px",
    marginBottom: "20px",
  },
  vcard: {
    marginRight: "20px",
  },
  commentImage: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  commentBody: {
    backgroundColor: "#f7f7f7",
    padding: "10px",
    borderRadius: "5px",
    flexGrow: 1,
  },
  textarea: {
    width: "100%",
    padding: "15px",
    marginBottom: "20px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    overflow: "hidden",
    resize: "none",
  },
  button: {
    display: "block",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  reply: {
    fontSize: "14px",
    color: "#007bff",
    cursor: "pointer",
  },
};

export default BlogPost;
