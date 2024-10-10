import React from "react";
import { Nav } from "react-bootstrap";
import "../sidebar.css";

const SidebarStaff = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="#manage-appointments" className="active">
          Profile
        </Nav.Link>
        <Nav.Link href="#transaction">Manage Appointments</Nav.Link>
        <Nav.Link href="#payroll">Transaction</Nav.Link>
        <Nav.Link href="#payroll">Salary</Nav.Link>
      </Nav>
    </div>
  );
};

export default SidebarStaff;
