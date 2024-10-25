import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Hàm giả lập API với Axios
    const fetchBlogs = async () => {
      try {
        const response = await new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              data: [
                {
                  blogId: 1,
                  accountId: '1',
                  managerName: 'Cong Tuong',
                  imageName: 'images/image_1.jpg',
                  title: 'Even the all-powerful Pointing has no control about the blind texts',
                  createDate: '2024-10-24',
                  status: true,
                },
                {
                    blogId: 1,
                    accountId: '1',
                    managerName: 'Cong Tuong',
                    imageName: 'images/image_1.jpg',
                    title: 'Even the all-powerful Pointing has no control about the blind texts',
                    createDate: '2024-10-24',
                    status: true,
                  },
                  {
                    blogId: 1,
                    accountId: '1',
                    managerName: 'Cong Tuong',
                    imageName: 'images/image_1.jpg',
                    title: 'Even the all-powerful Pointing has no control about the blind texts',
                    createDate: '2024-10-24',
                    status: true,
                  },
                  {
                    blogId: 1,
                    accountId: '1',
                    managerName: 'Cong Tuong',
                    imageName: 'images/image_1.jpg',
                    title: 'Even the all-powerful Pointing has no control about the blind texts',
                    createDate: '2024-10-24',
                    status: true,
                  },
                {
                  blogId: 2,
                  accountId: '1',
                  managerName: 'Cong Tuong',
                  imageName: 'images/image_6.jpg',
                  title: 'Another Interesting Title for a Blog Post',
                  createDate: '2024-10-23',
                  status: false,
                },
              ],
            });
          }, 1000);
        });
        setBlogs(response.data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogs();
  }, []);

  const handleBlogClick = (blog) => {
    navigate('/blogpost', { state: { blogId: blog.blogId } });
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
                    style={{ cursor: 'pointer' }}
                  >
                    <div
                      className="block-20 rounded"
                      style={{
                        backgroundImage: `url(${blog.imageName})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    ></div>
                    <div className="text p-4">
                      <div className="meta mb-2">
                        <div><b>{blog.createDate}</b></div>
                        <div><b>{blog.managerName}</b></div>
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

      {/* CSS trong JSX */}
      <style>{`
        .blog-entry {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .blog-entry:hover {
          transform: translateY(-10px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .blog-entry .block-20 {
          transition: opacity 0.3s ease;
        }
        
        .blog-entry:hover .block-20 {
          opacity: 0.9;
        }
        
        .blog-entry .text {
          transition: background-color 0.3s ease;
        }
        
        .blog-entry:hover .text {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default BlogSection;
