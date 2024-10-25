import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaGoogle } from 'react-icons/fa';

const InternalLoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleInternalLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email: email,
        password: password,
      });

      const { token, userID, userRole } = response.data;

      if (userRole === 1) {
        setError('Your account does not have internal login permissions. Please select customer login.');
        setLoading(false);
        return;
      }

      if (token && userID && userRole) {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('userID', userID);
        sessionStorage.setItem('userRole', userRole);
        window.dispatchEvent(new Event('storage'));

        const closeButton = document.querySelector('#internalLoginModal .btn-close');
        if (closeButton) {
          closeButton.click();
        }

        setLoading(false);
        toast.success("Login Successfully!");

        switch (userRole) {
          case 2:
            navigate('/stylist');
            break;
          case 3:
            navigate('/staff');
            break;
          case 4:
            navigate('/manager');
            break;
          case 5:
            navigate('/admin');
            break;
          default:
            setError('Access Denied: Invalid role for internal login.');
        }
      } else {
        setError('Access Denied: This login is for internal staff only.');
        setLoading(false);
      }
    } catch (error) {
      setError('Username or Password Incorrect.');
      setLoading(false);
    }
  };

  return (
    <div className="modal-dialog modal-dialog-centered">
      <div
        className="modal-content"
        style={{
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="modal-header"
          style={{
            backgroundColor: "#e0dede",
            borderRadius: "15px 15px 0 0",
          }}
        >
          <h5
            className="modal-title text-center w-100"
            id="internalLoginModalLabel"
          >
            <img
              src="images/logo.png"
              alt="salon icon"
              style={{ width: "50px", marginRight: "10px" }}
            />
            Internal Staff Login
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
          style={{ backgroundColor: "#f7f7f7", padding: "30px" }}
        >
          <p
            className="text-center"
            style={{ fontStyle: "italic", fontSize: "16px" }}
          >
            This Login Only For Internal Staff!!
          </p>
          <form onSubmit={handleInternalLogin}>
            <div className="mb-3">
              <label htmlFor="internalUsername" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="internalUsername"
                placeholder="Enter your username"
                style={{ borderRadius: "10px", padding: "10px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="internalPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="internalPassword"
                placeholder="Enter your password"
                style={{ borderRadius: "10px", padding: "10px" }}
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
              className="btn btn-primary w-100"
              style={{
                borderRadius: "10px",
                backgroundColor: "#6dbe45",
                borderColor: "#6dbe45",
              }}
              disabled={loading}
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
        </div>
      </div>
    </div>
  );
};

export default InternalLoginModal;
