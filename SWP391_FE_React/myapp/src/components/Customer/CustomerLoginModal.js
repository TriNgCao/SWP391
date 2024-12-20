import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { FaArrowCircleLeft, FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CustomerLoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email: email,
        password: password,
      });

      const { token, userID, userRole } = response.data;
      if (token && userID && userRole === 1) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("userID", userID);
        sessionStorage.setItem("userRole", userRole);
        window.dispatchEvent(new Event("storage"));

        const closeButton = document.querySelector(
          "#customerLoginModal .btn-close"
        );
        if (closeButton) {
          closeButton.click();
        }

        setLoading(false);
        navigate("/");
        toast.success("Login Successfully!");
      } else {
        setError("Email or Password Incorrect. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setError("Email or Password Incorrect.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };


  useEffect(() => {
    const handleGoogleCallback = async () => {
      setLoading(true);
      setError("");

      const params = new URLSearchParams(window.location.search);
      const email = params.get('token');
      console.log(email);

      if (email) {
        try {
          const response = await axios.post("http://localhost:8080/auth/google", {
            idToken: email,
          });

          const { token, userID, userRole } = response.data;
          if (token && userID && userRole === 1) {
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("userID", userID);
            sessionStorage.setItem("userRole", userRole);
            window.dispatchEvent(new Event("storage"));

            const closeButton = document.querySelector(
              "#customerLoginModal .btn-close"
            );
            if (closeButton) {
              closeButton.click();
            }

            navigate("/");
            toast.success("Login Successfully!");
          } else {
            setError("Google login failed. Please try again.");
          }
        } catch (error) {
          console.error("Error logging in with Google:", error);
        }
      }
      setLoading(false);
    };
    const params = new URLSearchParams(window.location.search);
    const email = params.get("token");

    if (email) {
      handleGoogleCallback(email);
    }
  }, [navigate]);



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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <FaArrowCircleLeft
                onClick={() => {
                  navigate("/");
                  const closeButton = document.querySelector(
                    "#customerLoginModal .btn-close"
                  );
                  if (closeButton) {
                    closeButton.click();
                  }
                }}
                style={{
                  fontSize: "28px",
                  cursor: "pointer",
                  color: "#6dbe45",
                  marginRight: "5px",
                }}
              />
              <span
                style={{
                  fontSize: "12px",
                  color: "#6dbe45",
                  marginLeft: "-5px",
                }}
              >
                Back
              </span>
            </div>

            <h5
              className="modal-title text-center w-100"
              id="loginModalLabel"
              style={{ marginLeft: "45px" }}
            >
              <img
                src="images/logo.png"
                alt="salon icon"
                style={{ width: "50px", marginRight: "10px" }}
              />
              Sign In to Leopard Salon
            </h5>
          </div>
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
            Welcome to Leopard Salon. Sign in and enjoy booking our exclusive
            services today!
          </p>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className={`form-control ${!validateEmail(email) && email ? "is-invalid" : ""
                  }`}
                id="email1"
                placeholder="Enter your email"
                style={{ borderRadius: "10px", padding: "10px" }}
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
                id="rememberMe1"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="d-flex justify-content-between">
              <Link
                to="#"
                className="text-decoration-none"
                data-bs-toggle="modal"
                data-bs-target="#forgotPasswordModal"
                data-bs-dismiss="modal"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              style={{
                borderRadius: "10px",
                backgroundColor: "#6dbe45",
                borderColor: "#6dbe45",
              }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div className="text-center mt-3">
            <p>or sign in with</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-danger mx-4 d-flex justify-content-center align-items-center"
                style={{
                  borderRadius: "50%",
                  width: "50px",
                  height: "50px",
                }}
                onClick={handleGoogleLogin}
              >
                <FaGoogle />
              </button>
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
