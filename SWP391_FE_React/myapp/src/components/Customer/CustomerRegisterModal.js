import React, { useState, useEffect } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const CustomerRegisterModal = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^(03|05|07|08|09)\d{8}$/;
    return phonePattern.test(phoneNumber);
  };

  const validateFullName = (fullName) => {
    const fullNamePattern = /^[a-zA-Z\s]+$/;
    return fullNamePattern.test(fullName);
  };

  const validatePassword = (password) => {
    return password.length >= 6 && !/\s/.test(password);
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setOtp("");
    setPhoneNumber("");
    setPassword("");
    setConfirmPassword("");
    setError("");
    setStep(1);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }
    setError("");
    setIsLoading(true);
  
    try {
      const response = await axios.post(`http://localhost:8080/api/email/send-code/register/${encodeURIComponent(email)}`);
      
      if (response.status === 200) {
        setStep(2);
        setIsLoading(false);

        toast.success("OTP sent to your email");
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response?.data?.error || "An error occurred");
    }
  };
  

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      const response = await axios.post(`http://localhost:8080/api/email/verify-code/${encodeURIComponent(email)}/${encodeURIComponent(otp)}`);
      
      if (response.status === 200) {
        setStep(3);
      setIsLoading(false);

        toast.success("OTP verified successfully");
      } else {
        setError("Invalid OTP, please try again.");
      }
    } catch (error) {
      setError("An error occurred while verifying OTP.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFullName(fullName)) {
      setError("Full name must not contain special characters.");
    } else if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid phone number.");
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
        const response = await axios.post("http://localhost:8080/auth/register", {
          name: fullName,
          email: email,
          phone: phoneNumber,
          password: password,
        });

        if (response.status === 200) {
          const { token, userID, userRole } = response.data;
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userID", userID);
          sessionStorage.setItem("userRole", userRole);
          window.dispatchEvent(new Event("storage"));

          setIsLoading(false);
          toast.success("Register successfully! Welcome to Leopard salon!");

          const closeButton = document.querySelector(
            "#registerCustomerModal .btn-close"
          );
          if (closeButton) {
            closeButton.click();
          }

          navigate("/");
        } else if (response.data.errorCode === 409) {
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
          <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
            {step > 1 && (
              <FaArrowCircleLeft
                onClick={() => {
                  setStep(step - 1);
                  if (step === 2) setOtp("");
                }}
                style={{
                  fontSize: "28px",
                  cursor: "pointer",
                  color: "#6dbe45",
                  marginRight: "5px",
                }}
              />
            )}
            <h5
              className="modal-title text-center w-100"
              id="registerModalLabel"
            >
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
              onClick={resetForm}
            ></button>
          </div>
        </div>
        <div
          className="modal-body"
          style={{
            backgroundColor: "#f7f7f7",
            padding: "30px",
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          <p
            className="text-center"
            style={{ fontStyle: "italic", fontSize: "16px" }}
          >
            Welcome to Leopard Salon. Register to use our awesome service!
          </p>
          <form
            onSubmit={
              step === 1
                ? handleSendOtp
                : step === 2
                ? handleVerifyOtp
                : handleSubmit
            }
          >
            {step === 1 && (
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
                  required
                />
              </div>
            )}
            {step === 2 && (
              <>
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
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    OTP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    placeholder="Enter OTP sent to your email"
                    style={{ borderRadius: "10px", padding: "10px" }}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            {step === 3 && (
              <>
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
                    disabled // Vô hiệu hóa trường email
                  />
                </div>
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
                    required
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
                    required
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
                    required
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="customerConfirmPassword"
                    className="form-label"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="customerConfirmPassword"
                    placeholder="Confirm your password"
                    style={{ borderRadius: "10px", padding: "10px" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            {error && <div className="text-danger">{error}</div>}
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              style={{
                borderRadius: "10px",
                backgroundColor: "#6dbe45",
                borderColor: "#6dbe45",
              }}
              disabled={isLoading}
            >
              {isLoading
                ? "Loading..."
                : step === 1
                ? "Send OTP"
                : step === 2
                ? "Verify OTP"
                : "Register"}
            </button>
          </form>
        </div>
        <div
          className="modal-footer"
          style={{ borderTop: "none", justifyContent: "center" }}
        >
          <p style={{ marginBottom: 0 }}>
            Already have an account?{" "}
            <Link
              to="#"
              className="text-decoration-none"
              data-bs-toggle="modal"
              data-bs-target="#customerLoginModal"
              data-bs-dismiss="modal"
            >
              &nbsp; <b>Login Now</b>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegisterModal;
