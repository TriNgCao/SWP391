import React, { useState } from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordModal = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);

  const validateEmail = (email) =>
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  const resetForm = () => {
    setEmail("");
    setOtp("");
    setPassword("");
    setConfirmPassword("");
    setStep(1);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://example.com/api/send-email", {
        email,
      });
      if (response.status === 200) {
        setStep(2);
        toast.success("OTP sent to your email");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://example.com/api/verify-otp", {
        email,
        otp,
      });
      if (response.status === 200) {
        setStep(3);
        toast.success("OTP verified, please enter new password");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://example.com/api/reset-password",
        { email, password }
      );
      if (response.status === 200) {
        toast.success("Password reset successful");
        document.getElementById("backToLoginLink").click();
        resetForm();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="modal-dialog modal-dialog-centered" onHide={resetForm}>
      <Link
        to="#"
        id="backToLoginLink"
        data-bs-toggle="modal"
        data-bs-target="#customerLoginModal"
        data-bs-dismiss="modal"
        style={{ display: "none" }}
      ></Link>
      <div
        className="modal-content"
        style={{
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          className="modal-header"
          style={{ backgroundColor: "#e0dede", borderRadius: "15px 15px 0 0" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {step === 1 ? (
              <Link
                to="#"
                className="text-decoration-none"
                data-bs-toggle="modal"
                data-bs-target="#customerLoginModal"
                data-bs-dismiss="modal"
                style={{ display: "flex", alignItems: "center" }}
              >
                <FaArrowCircleLeft
                  style={{
                    fontSize: "28px",
                    color: "#6dbe45",
                    marginRight: "5px",
                    cursor: "pointer",
                  }}
                />
                <span style={{ fontSize: "12px", color: "#6dbe45" }}>Back</span>
              </Link>
            ) : (
              <FaArrowCircleLeft
                onClick={() => {
                  if (step > 1) {
                    setStep(step - 1);
                    if (step === 3) setOtp("");
                  }
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
              id="loginModalLabel"
              style={{ marginLeft: "65px" }}
            >
              <img
                src="images/logo.png"
                alt="salon icon"
                style={{ width: "50px", marginRight: "10px" }}
              />
              Forgot Password
            </h5>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            onClick={resetForm}
          ></button>
        </div>
        <div
          className="modal-body"
          style={{ backgroundColor: "#f7f7f7", padding: "30px" }}
        >
          <form
            onSubmit={
              step === 1
                ? handleSendEmail
                : step === 2
                ? handleSubmitOtp
                : handleResetPassword
            }
          >
            {step === 1 && (
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className={`form-control ${
                    !validateEmail(email) && email ? "is-invalid" : ""
                  }`}
                  id="email"
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
                  <label htmlFor="emailDisabled" className="form-label">
                    Email
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="emailDisabled"
                    style={{
                      borderRadius: "10px",
                      padding: "10px",
                      backgroundColor: "#e9ecef",
                      color: "#6c757d",
                    }}
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
                  <label htmlFor="password" className="form-label">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter new password"
                    style={{ borderRadius: "10px", padding: "10px" }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                    placeholder="Confirm new password"
                    style={{ borderRadius: "10px", padding: "10px" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <button
              type="submit"
              className="btn btn-primary w-100 mt-3"
              style={{
                borderRadius: "10px",
                backgroundColor: "#6dbe45",
                borderColor: "#6dbe45",
              }}
            >
              {step === 1
                ? "Send Email"
                : step === 2
                ? "Submit OTP"
                : "Reset Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
