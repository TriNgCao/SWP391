import React from "react";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BarChartIcon from "@mui/icons-material/BarChart";
import PaidIcon from "@mui/icons-material/Paid";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
const ManagerSidebar = () => {
  return (
    <div className="sidebar" style={sidebarStyle}>
      <ul style={listStyle}>
        <li style={listItemStyle}>
          <Link to="manager-profile" style={linkStyle}>
            <GroupIcon /> Profile
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="manager-revenue" style={linkStyle}>
            <BarChartIcon /> Manage Revenue
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="manager-personnel" style={linkStyle}>
            <AccountBalanceIcon /> Manage Personnel
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="manager-services" style={linkStyle}>
            <PaidIcon /> Manage Services
          </Link>
        </li>
        <li style={listItemStyle}>
          <Link to="manager-payroll" style={linkStyle}>
            <PaidIcon /> Manage Payroll
          </Link>
        </li>
        {/* <li style={listItemStyle}>
          <Link to="manager-transaction" style={linkStyle}>
            <AccountBalanceIcon /> Manage Transaction
          </Link>
        </li> */}
        <li style={listItemStyle}>
          <Link to="manager-appointments" style={linkStyle}>
            <SupervisorAccountIcon /> Manage Appointmnets
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
};

// List styling
const listStyle = {
  listStyleType: "none",
  padding: 12,
  color: "#4CAF50", // Changed to match the text color
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

// Link styling - changed color to black
const linkStyle = {
  textDecoration: "none", // Remove the underline
  color: "#000", // Set the color to black
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
};

// Hover effect
listItemStyle[":hover"] = {
  backgroundColor: "#BCBCBC",
};

export default ManagerSidebar;
