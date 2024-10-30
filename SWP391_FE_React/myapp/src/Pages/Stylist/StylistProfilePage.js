import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Paper,
  Container,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

// Mock staff data for demonstration
const fetchStaffData = (accountId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock data
      const data = {
        1: {
          name: "Danish Helium",
          email: "danish@example.com",
          phone: "+1234567890",
          aboutMe: "Lorem ipsum dolor sit amet...",
        },
      };
      resolve(data[accountId] || null); // Return null if accountId not found
    }, 1000); // Simulated delay
  });
};

const StylistProfilePage = () => {
  // State to store uploaded images
  const [backgroundImage, setBackgroundImage] = useState(
    "https://img.freepik.com/free-photo/businessman-texting_53876-89027.jpg?t=st=1728840437~exp=1728844037~hmac=8ba97c28f10568b7da0b5652516f85b9689e65c5d5cde3afa13579a1edcbdae1&w=1380"
  );
  const [profileImage, setProfileImage] = useState(
    "https://img.freepik.com/free-vector/elegant-businessman-office-scene_24877-57719.jpg?t=st=1728840469~exp=1728844069~hmac=84913255acd309d8247d0267f01afc6ac8b4f1f826c30cc4b4f1d7cfce135819&w=740"
  );
  const accountId = sessionStorage.getItem("userID");
  // State for staff data
  const [staffData, setStaffData] = useState({});

  // Fetch staff data when the component mounts
  useEffect(() => {
    const accountId = sessionStorage.getItem("account_id");
    if (accountId) {
      fetchStaffData(accountId).then((data) => {
        if (data) {
          setStaffData(data);
        } else {
          console.error("No data found for account ID:", accountId);
        }
      });

      // MO CAI NAY RA DE THAY API VAO NHA TH HOI NGU
      // TODO: Replace the mock API call with your real API call.
      // Example:
      // fetch(`https://your-api.com/staff/${accountId}`)
      //   .then((response) => response.json())
      //   .then((data) => {
      //     setStaffData(data);
      //   })
      //   .catch((error) => console.error("Error fetching staff data:", error));
    }
  }, []);

  // Handle background image upload
  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Convert file to URL
      setBackgroundImage(imageUrl); // Update state with new background image
    }
  };

  // Handle profile image upload
  const handleProfileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Convert file to URL
      setProfileImage(imageUrl); // Update state with new profile image
    }
  };

  return (
    <Container maxWidth="md">
      {/* Header Section */}
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Profile
        </Typography>
      </Box>

      {/* Profile Section */}
      <Paper elevation={3}>
        <Box
          sx={{
            position: "relative",
            height: "200px",
            background: `url(${backgroundImage}) center/cover no-repeat`,
          }}
        >
          <IconButton
            color="primary"
            sx={{ position: "absolute", top: 10, right: 10 }}
            aria-label="edit background"
            component="label"
          >
            <EditIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleBackgroundUpload}
            />
          </IconButton>
        </Box>

        <Box sx={{ textAlign: "center", padding: 3 }}>
          <Avatar
            src={profileImage}
            alt="Profile Image"
            sx={{
              width: 150,
              height: 150,
              marginTop: "-75px",
              border: "4px solid white",
              display: "inline-block",
            }}
          />
          <IconButton
            color="primary"
            sx={{
              position: "relative",
              marginTop: "-25px",
              transform: "translateY(-10px)",
            }}
            aria-label="edit profile image"
            component="label"
          >
            <EditIcon />
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleProfileUpload}
            />
          </IconButton>

          <Typography
            variant="h5"
            component="h2"
            sx={{ marginTop: 1, fontWeight: "bold" }}
          >
            {staffData.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Email: {staffData.email}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Phone: {staffData.phone}
          </Typography>

          {/* About Section */}
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6" fontWeight="bold">
              About Me
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: 2 }}
            >
              {staffData.aboutMe}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default StylistProfilePage;
