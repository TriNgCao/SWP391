import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await axios.get("http://localhost:8080/api/blog");

        const updatedBlogs = response.data.map((blog) => ({
          ...blog,
          imageUrl: `http://localhost:8080/api/blog/image/${encodeURIComponent(
            blog.imageName
          )}`,
        }));

        setBlogs(updatedBlogs);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    }

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    navigate("/blogpost", { state: { blogId: blog.blogId } });
  };

  return (
    <div>
      <section className="ftco-section bg-light">
        <div className="container">
          <div className="row d-flex">
            {blogs
              .filter((blog) => blog.status)
              .map((blog) => (
                <div key={blog.blogId} className="col-md-4 d-flex">
                  <div
                    className="blog-entry align-self-stretch"
                    onClick={() => handleBlogClick(blog)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="block-20 rounded"
                      style={{
                        backgroundImage: `url(${blog.imageUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                    <div className="text p-4">
                      <div className="meta mb-2">
                        <div>
                          <b>{blog.createDate}</b>
                        </div>
                        <div>
                          <b>{blog.managerName}</b>
                        </div>
                        <div>
                          <span className="meta-chat">
                            <span className="fa fa-comment"></span> 3
                          </span>
                        </div>
                      </div>
                      <h3 className="heading">{blog.title}</h3>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <style>{`
  .blog-entry {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .blog-entry .block-20 {
    transition: opacity 0.3s ease;
    height: 250px; /* Chiều cao cố định cho phần hình ảnh */
    background-size: cover;
    background-position: center;
  }

  .blog-entry .text {
    margin-top: 10px; /* Đảm bảo khoảng cách ngay dưới hình ảnh */
    transition: background-color 0.3s ease;
  }

  .meta {
    margin-bottom: 10px;
  }

  .blog-entry:hover {
    transform: translateY(-10px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }

  .blog-entry:hover .block-20 {
    opacity: 0.9;
  }

  .blog-entry:hover .text {
    background-color: #f8f9fa;
  }
`}</style>
    </div>
  );
};

export default BlogSection;
