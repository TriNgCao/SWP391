import React from "react";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group"; // Icon cho Profile
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"; // Icon cho View Salary
import EventIcon from "@mui/icons-material/Event"; // Icon cho View Schedule

const StylistSidebar = () => {
  return (
    <div className="sidebar" style={sidebarStyle}>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <Link to="stylist-profile" style={linkStyle}>
            <GroupIcon /> Profile
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="stylist-schedule" style={linkStyle}>
            <EventIcon /> View Schedule
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="stylist-salary" style={linkStyle}>
            <AttachMoneyIcon /> View Salary
          </Link>
        </li>
      </ul>
    </div>
  );
};

// Sidebar styling
const sidebarStyle = {
  width: "240px",
  backgroundColor: "#E8E8E8",
  height: "100vh", // Đảm bảo sidebar phủ toàn bộ chiều cao
};

// List styling
const listStyle = {
  listStyleType: "none",
  padding: 12,
  color: "#333",
  backgroundColor: "#DFDFDF",
};

// List item styling
const listItemStyle = {
  padding: "20px 0",
  borderBottom: "1px solid grey",
  fontWeight: "bold",
  textAlign: "left",
  transition: "background 0.3s",
};

// Link styling
const linkStyle = {
  textDecoration: "none",
  color: "#4CAF50", // Thay đổi màu chữ sang xanh lá cây
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
};

// Hover effect
listItemStyle[":hover"] = {
  backgroundColor: "#BCBCBC",
};

export default StylistSidebar;
