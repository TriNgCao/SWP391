import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserIconDropdown = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <li
      className="nav-item dropdown d-flex align-items-center"
      style={{ marginLeft: "50px", position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} 
    >
      {/* User Icon */}
      <Link to="#" className="nav-link" id="userDropdown">
        <img
          src="images/user.png"
          alt="User"
          style={{
            width: "30px",
            borderRadius: "50%",
            verticalAlign: "middle",
          }}
        />
      </Link>

      {isDropdownOpen && (
        <div
          className="dropdown-menu dropdown-menu-right"
          aria-labelledby="userDropdown"
          style={{
            position: "absolute",
            top: "100%",
            display: "block",
          }}
        >
          <Link className="dropdown-item" to="profile.html">
            <i className="fa-solid fa-user"></i> View Profile
          </Link>
          <Link className="dropdown-item" to="#">
            <i className="fa-solid fa-medal"></i> Loyal Point
          </Link>
          <Link className="dropdown-item" to="#">
            <i className="fa-solid fa-right-from-bracket"></i> Logout
          </Link>
        </div>
      )}
    </li>
  );
};

export default UserIconDropdown;
