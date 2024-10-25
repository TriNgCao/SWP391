import React, { useState } from "react";

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

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "0912345678",
    loyalPoints: 1200,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    // Validate inputs
    let errorMsg = "";
    if (name === "fullName" && !validateFullName(value)) {
      errorMsg = "Full name can only contain letters and spaces.";
    } else if (name === "email" && !validateEmail(value)) {
      errorMsg = "Please enter a valid email address.";
    } else if (name === "phone" && !validatePhoneNumber(value)) {
      errorMsg = "Please enter a valid phone number.";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMsg }));
  };

  const toggleEditMode = () => {
    if (isEditing) {
      if (!errors.fullName && !errors.email && !errors.phone) {
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  return (
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
          onChange={handleInputChange}
          disabled={!isEditing}
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            margin: "8px 0",
            borderRadius: "8px",
            border: errors.email ? "2px solid red" : "2px solid #ccc",
            backgroundColor: isEditing ? "#fff" : "#e9ecef",
            outline: "none"
          }}
        />
        {errors.email && <span style={{ color: "red", fontSize: "14px" }}>{errors.email}</span>}
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
          value={user.loyalPoints}
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
  );
};

export default UserProfile;
