import React from "react";
import { Nav } from "react-bootstrap";
import "../sidebar.css";

const SidebarAdmin = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="#manage-appointments" className="active">
          Profile
        </Nav.Link>
        <Nav.Link href="#manage-appointments">Manage Appointments</Nav.Link>
        <Nav.Link href="#transaction">Transaction</Nav.Link>
        <Nav.Link href="#payroll">Payroll</Nav.Link>
        <Nav.Link href="#manage-account">Manage Account</Nav.Link>
      </Nav>
    </div>
  );
};

export default SidebarAdmin;
