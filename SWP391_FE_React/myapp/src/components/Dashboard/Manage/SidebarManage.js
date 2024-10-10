import React from "react";
import { Nav } from "react-bootstrap";
import "../sidebar.css";

const SidebarManage = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="#manage-appointments" className="active">
          Revenue
        </Nav.Link>
        <Nav.Link href="#manage-appointments">Profile</Nav.Link>
        <Nav.Link href="#transaction">Manage Appointments</Nav.Link>
        <Nav.Link href="#payroll">Transaction</Nav.Link>
        <Nav.Link href="#payroll">Payroll</Nav.Link>
        <Nav.Link href="#manage-account">Manage Account</Nav.Link>
      </Nav>
    </div>
  );
};

export default SidebarManage;
