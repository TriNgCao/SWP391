import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { RiVipDiamondLine } from "react-icons/ri";
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
          <FaRegUserCircle/> View Profile
          </Link>
          <Link className="dropdown-item" to="#">
          <RiVipDiamondLine /> Loyal Point
          </Link>
          <Link className="dropdown-item" to="#">
          <HiOutlineLogout /> Logout
          </Link>
        </div>
      )}
    </li>
  );
};

export default UserIconDropdown;
