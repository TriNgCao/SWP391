import React from "react";
import { Nav } from "react-bootstrap";
import "../sidebar.css";
import { Link } from "react-router-dom";

const SidebarManage = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Link to="profile" className="active">
          Profile
        </Link>
        <Link to="revenue">Revenue</Link>
        <Link to="manage-account">Manage Account</Link>
        <Link to="transaction">Transaction</Link>
        <Link to="payroll">Payroll</Link>
      </Nav>
    </div>
  );
};

export default SidebarManage;
