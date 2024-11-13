import React from "react";
import { Link } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Icon cho Profile
import BarChartIcon from "@mui/icons-material/BarChart"; // Icon cho Manage Appointments
import PaidIcon from "@mui/icons-material/Paid"; // Icon cho Salary

const StaffSidebar = () => {
  return (
    <div className="sidebar" style={sidebarStyle}>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <Link to="staff-profile" style={linkStyle}>
            <AccountCircleIcon /> Profile
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="staff-appointments" style={linkStyle}>
            <BarChartIcon /> Manage Appointments
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="staff-salary" style={linkStyle}>
            <PaidIcon /> View Salary
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="staff-supportTicket" style={linkStyle}>
            <PaidIcon /> Support Ticket
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
  color: "#4CAF50", // Màu chữ chuyển sang xanh lá cây
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
};

// Hover effect
listItemStyle[":hover"] = {
  backgroundColor: "#BCBCBC",
};

export default StaffSidebar;
