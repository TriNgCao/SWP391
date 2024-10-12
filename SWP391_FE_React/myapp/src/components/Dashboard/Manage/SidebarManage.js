import React from "react";
import { Nav } from "react-bootstrap";
import "../sidebar.css";
import { Link } from "react-router-dom";

const SidebarManage = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Link to="revenue" className="active">
          Revenue
        </Link>
        <Link to="profile">Profile</Link>
        <Link to="manage-appointments">Manage Appointments</Link>
        <Link to="transaction">Transaction</Link>
        <Link to="payroll">Payroll</Link>
        <Link to="manage-account">Manage Account</Link>
      </Nav>
    </div>
  );
};

export default SidebarManage;
