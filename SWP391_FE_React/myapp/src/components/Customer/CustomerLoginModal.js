import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaGoogle } from 'react-icons/fa';

const CustomerLoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm kiểm tra email hợp lệ
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Kiểm tra email hợp lệ trước khi gửi
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return; // Không cho phép submit nếu email không hợp lệ
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: email,
        password: password,
      });

      // Lưu token vào localStorage
      localStorage.setItem('token', response.data.token);
      window.dispatchEvent(new Event('storage'));

      // Đóng modal
      const closeButton = document.querySelector('#customerLoginModal .btn-close');
      if (closeButton) {
        closeButton.click(); // Kích hoạt nút đóng modal
      }

      setLoading(false);

      // Điều hướng về trang chủ hoặc trang mong muốn
      navigate('/');
    } catch (error) {
      // Xử lý lỗi khi đăng nhập thất bại
      setError('Email or Password Incorrect.');
      setLoading(false);
    }
  };

  return (
    <div className="modal-dialog modal-dialog-centered">
      <div
        className="modal-content"
        style={{
          borderRadius: '15px',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div
          className="modal-header"
          style={{
            backgroundColor: '#e0dede',
            borderRadius: '15px 15px 0 0',
          }}
        >
          <h5 className="modal-title text-center w-100" id="loginModalLabel">
            <img
              src="images/logo.png"
              alt="salon icon"
              style={{ width: '50px', marginRight: '10px' }}
            />
            Sign In to Leopard Salon
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div
          className="modal-body"
          style={{ backgroundColor: '#f7f7f7', padding: '30px' }}
        >
          <p
            className="text-center"
            style={{ fontStyle: 'italic', fontSize: '16px' }}
          >
            Welcome to Leopard Salon. Sign in and enjoy booking our exclusive services today!
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className={`form-control ${!validateEmail(email) && email ? 'is-invalid' : ''}`} // Add class for invalid email
                id="email"
                placeholder="Enter your email"
                style={{ borderRadius: '10px', padding: '10px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                style={{ borderRadius: '10px', padding: '10px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="d-flex justify-content-between">
              <Link to="#" className="text-decoration-none">
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              style={{
                borderRadius: '10px',
                backgroundColor: '#6dbe45',
                borderColor: '#6dbe45',
              }}
              disabled={loading} // Không cần disable nút khi email sai, chỉ kiểm tra khi submit
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <div className="text-center mt-3">
            <p>or sign in with</p>
            <div className="d-flex justify-content-center">
              <Link
                to="#"
                className="btn btn-danger mx-4 d-flex justify-content-center align-items-center"
                style={{
                  borderRadius: '50%',
                  width: '50px',
                  height: '50px',
                }}
              >
                <FaGoogle />
              </Link>
            </div>
          </div>
          <div className="text-center mt-3">
            Don't Have Account Yet?
            <Link
              to="#"
              className="text-decoration-none"
              data-bs-toggle="modal"
              data-bs-target="#registerCustomerModal"
              data-bs-dismiss="modal"
            >
              &nbsp; <b>Register Now</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginModal;
