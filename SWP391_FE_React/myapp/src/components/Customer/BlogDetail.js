

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

const BlogPost = () => {
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [commentCount, setCommentCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const accountId = sessionStorage.getItem("userID");
  const token = sessionStorage.getItem("token");
  const userRole = sessionStorage.getItem("userRole");
  const isLoggedIn = token && accountId && userRole;

  const location = useLocation();
  const blogId = location.state?.blogId;

  useEffect(() => {
    const fetchAllData = async () => {
      await fetchBlogDetail();
      await fetchComments();
      await fetchCommentCount();
      await fetchLikeCount();
    };

    const fetchBlogDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/blog/${blogId}/${accountId}`);
        setPostData({
          ...response.data,
          imageUrl: response.data.imageName ?
            `http://localhost:8080/api/blog/image/${encodeURIComponent(response.data.imageName)}` : null
        });
        // Update state for likes and likeId based on fetched data
        setLiked(response.data.likeByAccount);
        setLikeId(response.data.likeId); // Set likeId from response
      } catch (error) {
        console.error("Error fetching blog data:", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is done
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cmt/${blogId}`);

        // Sort comments by createDate in descending order (latest first)
        const sortedComments = response.data.sort((a, b) => {
          // Convert createDate strings to Date objects
          const dateA = new Date(a.createDate.replace(" ", "T")); // Replace space with 'T' for ISO format
          const dateB = new Date(b.createDate.replace(" ", "T"));
          return dateB.getTime() - dateA.getTime(); // Compare timestamps
        });

        setComments(sortedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };




    const fetchCommentCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/cmt/count/${blogId}`);
        setCommentCount(response.data);
      } catch (error) {
        console.error("Error fetching comment count:", error);
      }
    };

    const fetchLikeCount = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/like/${blogId}`);
        setLikes(response.data);
      } catch (error) {
        console.error("Error fetching like count:", error);
      }
    };

    if (blogId && isLoggedIn) {
      fetchAllData();
    }
  }, [blogId, accountId, isLoggedIn]);

  const handleCommentSubmit = async (e) => {
  e.preventDefault();
  if (newComment.trim() === "") return;

  try {
    const response = await axios.post("http://localhost:8080/api/cmt", {
      blogId,
      accountId,
      content: newComment,
    });
    
    if (response.status === 200) {
      // Create a new comment object
      const newCommentData = {
        commentId: response.data.commentId, // Assuming the response returns the new comment's ID
        accountName: "You",
        createDate: new Date().toLocaleString(),
        content: newComment,
      };

      // Prepend the new comment to the existing comments array
      setComments((prevComments) => [newCommentData, ...prevComments]);
      setNewComment("");
      setCommentCount(prevCount => prevCount + 1); // Update comment count
    }
  } catch (error) {
    console.error("Error submitting comment:", error);
  }
};

  const handleLikeToggle = async () => {
    try {
      if (liked) {
        // If user has liked the post, delete the like
        if (likeId) {
          await axios.delete(`http://localhost:8080/api/like/${likeId}`);
          setLikes((prevLikes) => prevLikes - 1); // Decrement likes
          setLiked(false); // Update liked status
          setLikeId(null); // Reset likeId
        }
      } else {
        // If user hasn't liked yet, add a like
        const response = await axios.post("http://localhost:8080/api/like", {
          blogId,
          accountId,
        });
        setLikes((prevLikes) => prevLikes + 1); // Increment likes
        setLiked(true); // Update liked status
        setLikeId(response.data.likeId); // Save new likeId
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.postHeader}>
          <h2 style={styles.title}>{postData.title}</h2>
        </div>
        <p style={styles.meta}>
          Posted on: {postData.createDate} | Posted by: {postData.managerName}
        </p>
        {postData.imageUrl && (
          <p>
            <img src={postData.imageUrl} alt="Blog" style={styles.image} />
          </p>
        )}
        <p style={styles.content}>{postData.content}</p>

        <div style={styles.likeCommentCounts}>
          {isLoggedIn && !loading && (
            <span onClick={handleLikeToggle} style={styles.likeCount}>
              <i className={`fa ${liked ? "fa-thumbs-up" : "fa-thumbs-o-up"}`} aria-hidden="true"></i> {likes}
            </span>
          )}
          <span style={styles.commentCount}>
            <i className="fa fa-commenting-o" aria-hidden="true"></i> {commentCount} Comments
          </span>
        </div>

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
