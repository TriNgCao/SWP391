import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BlogPost = () => {
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([
    {
      id: 1,
      name: "John Doe",
      date: "April 7, 2020 at 10:05pm",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem.",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false); // Track like status

  useEffect(() => {
    const fetchData = async () => {
      const mockData = {
        blogId: 1,
        managerName: "Cong Tuong",
        imageName: "images/image_1.jpg",
        title: "Title of post",
        content:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reiciendis, eius mollitia suscipit, quisquam doloremque distinctio perferendis.",
        createDate: "2024-10-23",
        status: false,
      };
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPostData(mockData);
    };

    fetchData();
  }, []);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: comments.length + 1,
      name: "Anonymous",
      date: new Date().toLocaleString(),
      comment: newComment,
    };

    setComments([...comments, newCommentData]);
    setNewComment("");
  };

  const handleLike = () => {
    setLikes((prevLikes) => (liked ? prevLikes - 1 : prevLikes + 1));
    setLiked(!liked);
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
        <p>
          <img src={postData.imageName} alt="Blog" style={styles.image} />
        </p>
        <p style={styles.content}>{postData.content}</p>
        <div style={styles.likeCommentCounts}>
          <span onClick={handleLike} style={styles.likeCount}>
            <i
              className={`fa ${liked ? "fa-thumbs-up" : "fa-thumbs-o-up"}`}
              aria-hidden="true"
            ></i>{" "}
            {likes}
          </span>
          <span style={styles.commentCount}>
            <i className="fa fa-commenting-o" aria-hidden="true"></i>{" "}
            {comments.length} Comments
          </span>
        </div>
        <div style={styles.commentsSection}>
          <h3>Comments</h3>
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
          <ul style={styles.commentList}>
            {comments.map((comment) => (
              <li key={comment.id} style={styles.comment}>
                <div style={styles.vcard}>
                  <img
                    src="images/person_1.jpg"
                    alt="Person"
                    style={styles.commentImage}
                  />
                </div>
                <div style={styles.commentBody}>
                  <h4>{comment.name}</h4>
                  <div style={styles.meta}>{comment.date}</div>
                  <p>{comment.comment}</p>
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
