import React from "react";
import { Nav } from "react-bootstrap";
import "../sidebar.css";
import { Link } from "react-router-dom";

const SidebarStylist = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Link to="profile" className="active">
          Profile
        </Link>
        <Link to="salary">Salary</Link>
        <Link to="schedule">View Schedule</Link>
      </Nav>
    </div>
  );
};

export default SidebarStylist;
