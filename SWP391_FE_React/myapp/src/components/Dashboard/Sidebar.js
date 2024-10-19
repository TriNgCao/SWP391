import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SettingsIcon from "@mui/icons-material/Settings";
import "../layouts/sidebar.css"; // Add custom styles for the sidebar

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage to see if the user is logged in
  useEffect(() => {
    const key = localStorage.getItem("myKey");
    if (key) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="sidebar">
      <ul>
        {/* Default sidebar when user is not logged in */}
        {!isLoggedIn ? (
          <>
            <li>
              <Link to="/user-management">
                <PeopleIcon /> User Management
              </Link>
            </li>
            <li>
              <Link to="/product-management">
                <ProductionQuantityLimitsIcon /> Product Management
              </Link>
            </li>
            <li>
              <Link to="/revenue-management">
                <AttachMoneyIcon /> Revenue Management
              </Link>
            </li>
            <li>
              <Link to="/account-management">
                <SettingsIcon /> Account Management
              </Link>
            </li>
          </>
        ) : (
          // Sidebar when user is logged in
          <>
            <li>
              <Link to="/dashboard">
                <SettingsIcon /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <PeopleIcon /> Profile
              </Link>
            </li>
            <li>
              <Link to="/settings">
                <SettingsIcon /> Settings
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => {
                  localStorage.removeItem("myKey"); // Logout
                  setIsLoggedIn(false); // Update the state
                }}
              >
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
