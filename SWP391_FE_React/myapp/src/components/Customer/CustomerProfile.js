import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const validatePhoneNumber = (phoneNumber) => {
  const phonePattern = /^(03|05|07|08|09)\d{8}$/;
  return phonePattern.test(phoneNumber);
};

const validateFullName = (fullName) => {
  const fullNamePattern = /^[a-zA-Z\s]+$/;
  return fullNamePattern.test(fullName);
};

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    loyaltyPoints: 0,
  });
  const [initialUser, setInitialUser] = useState(null);
  const [errors, setErrors] = useState({
    fullName: "",
    phone: "",
  });

  useEffect(() => {
    const userId = sessionStorage.getItem("userID");
    if (userId) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/profile/customer/${userId}`);
          if (response.status === 200) {
            const { name, email, phone, loyaltyPoints } = response.data;
            const userData = {
              fullName: name,
              email: email,
              phone: phone,
              loyaltyPoints: loyaltyPoints,
            };
            setUser(userData);
            setInitialUser(userData);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    let errorMsg = "";
    if (name === "fullName" && !validateFullName(value)) {
      errorMsg = "Full name can only contain letters and spaces.";
    } else if (name === "phone" && !validatePhoneNumber(value)) {
      errorMsg = "Please enter a valid phone number.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const toggleEditMode = async () => {
    if (isEditing) {
      if (JSON.stringify(user) !== JSON.stringify(initialUser)) {
        try {
          const userId = sessionStorage.getItem("userID");
          const response = await axios.put(`http://localhost:8080/user/update/${userId}`, {
            name: user.fullName,
            email: user.email,
            phone: user.phone,
          });
          if (response.status === 200) {
            toast.success("Profile updated successfully!");
            setInitialUser(user);
          }
        } catch (error) {
          toast.error("Failed to update profile!");
        }
      }
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div>
    <ToastContainer autoClose={1300} />
    <div style={{
      padding: "30px",
      border: "2px solid #ddd",
      borderRadius: "12px",
      maxWidth: "500px",
      margin: "auto",
      backgroundColor: "#f7f9fc",
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)"
    }}>
      <h2 style={{
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "20px",
        textAlign: "center"
      }}>User Profile</h2>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "16px", color: "#555" }}>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={user.fullName}
          onChange={handleInputChange}
          disabled={!isEditing}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            margin: "8px 0",
            borderRadius: "8px",
            border: errors.fullName ? "2px solid red" : "2px solid #ccc",
            backgroundColor: isEditing ? "#fff" : "#e9ecef",
            outline: "none"
          }}
        />
        {errors.fullName && <span style={{ color: "red", fontSize: "14px" }}>{errors.fullName}</span>}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "16px", color: "#555" }}>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email}
          disabled
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            margin: "8px 0",
            borderRadius: "8px",
            border: "2px solid #ccc",
            backgroundColor: "#f1f3f5",
            color: "#777",
            outline: "none"
          }}
        />
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "16px", color: "#555" }}>Phone:</label>
        <input
          type="text"
          name="phone"
          value={user.phone}
          onChange={handleInputChange}
          disabled={!isEditing}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            margin: "8px 0",
            borderRadius: "8px",
            border: errors.phone ? "2px solid red" : "2px solid #ccc",
            backgroundColor: isEditing ? "#fff" : "#e9ecef",
            outline: "none"
          }}
        />
        {errors.phone && <span style={{ color: "red", fontSize: "14px" }}>{errors.phone}</span>}
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={{ fontSize: "16px", color: "#555" }}>Loyal Points:</label>
        <input
          type="text"
          name="loyalPoints"
          value={user.loyaltyPoints}
          disabled
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            margin: "8px 0",
            borderRadius: "8px",
            border: "2px solid #ccc",
            backgroundColor: "#f1f3f5",
            color: "#777",
            outline: "none"
          }}
        />
      </div>

      <button
        onClick={toggleEditMode}
        style={{
          padding: "12px 24px",
          fontSize: "18px",
          fontWeight: "bold",
          color: "#fff",
          backgroundColor: isEditing ? "#28a745" : "#007bff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          width: "100%",
          transition: "background-color 0.3s ease"
        }}
      >
        {isEditing ? "Save" : "Edit"}
      </button>
    </div>
    </div>
  );
};

export default UserProfile;
