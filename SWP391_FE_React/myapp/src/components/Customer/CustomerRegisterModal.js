import React, { useState, useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const CustomerRegisterModal = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^(03|05|07|08|09)\d{8}$/;
    return phonePattern.test(phoneNumber);
  };

  const validateFullName = (fullName) => {
    const fullNamePattern = /^[a-zA-Z\s]+$/;// no special
    return fullNamePattern.test(fullName);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && !/\s/.test(password); //at least 6, no space
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFullName(fullName)) {
      setError("Full name must not contain special characters.");
    } else if (!validateEmail(email)) {
      setError("Please enter valid email format.");
    } else if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter valid phone number.");
    } else if (!validatePassword(password)) {
      setError(
        "Password must be at least 6 characters and cannot contain spaces."
      );
    } else if (password !== confirmPassword) {
      setError("Password and confirm password do not match.");
    } else {
      setError("");
      setIsLoading(true);

      try {
        const response = await axios.post('api/register', {
          fullName: fullName,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
        });

        if (response.data.message === "Registration successful") {
          setIsLoading(false);
          toast.success("Register successfully! Please log in.");

          const closeButton = document.querySelector('#registerCustomerModal .btn-close');
          if (closeButton) {
            closeButton.click();
          }

          const loginLink = document.querySelector('a[data-bs-target="#customerLoginModal"]');
          if (loginLink) {
            loginLink.click();
          }
        } else if (response.data.errorCode === 400) {
          setIsLoading(false);
          toast.error(response.data.message);
        }
      } catch (error) {
        setIsLoading(false);
        setError("An error occurred. Please try again.");
        console.error("Error registering user:", error);
      }
    }
  };

  useEffect(() => {
    const modalElement = document.getElementById("registerCustomerModal");

    const handleModalClose = () => {
      resetForm();
    };

    modalElement.addEventListener("hidden.bs.modal", handleModalClose);

    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleModalClose);
    };
  }, []);

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
          <h5 className="modal-title text-center w-100" id="registerModalLabel">
            <img
              src="images/logo.png"
              alt="salon icon"
              style={{ width: "50px", marginRight: "10px" }}
            />
            Register to Leopard Salon
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
            Welcome to Leopard Salon. Register to use our awesome service!
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="customerName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                placeholder="Enter your full name"
                style={{ borderRadius: "10px", padding: "10px" }}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerEmail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="customerEmail"
                placeholder="Enter your email"
                style={{ borderRadius: "10px", padding: "10px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerPhone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control"
                id="customerPhone"
                placeholder="Enter your phone number"
                style={{ borderRadius: "10px", padding: "10px" }}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="customerPassword" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="customerPassword"
                placeholder="Enter your password"
                style={{ borderRadius: "10px", padding: "10px" }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm your password"
                style={{ borderRadius: "10px", padding: "10px" }}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button
              type="submit"
              className="btn btn-primary w-100"
              style={{
                borderRadius: "10px",
                backgroundColor: "#6dbe45",
                borderColor: "#6dbe45",
              }}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <div className="text-center mt-3">
              <p>or register with</p>
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
              Already have an account?
              <Link
                to="#"
                className="text-decoration-none"
                data-bs-toggle="modal"
                data-bs-target="#customerLoginModal"
                data-bs-dismiss="modal"
              >
                &nbsp; <b>Login Now</b>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegisterModal;
