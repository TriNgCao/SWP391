import React from "react";
import { Nav } from "react-bootstrap";
import "../sidebar.css";

const SidebarStylist = () => {
  return (
    <div className="sidebar">
      <Nav className="flex-column">
        <Nav.Link href="#manage-appointments" className="active">
          Profile
        </Nav.Link>
        <Nav.Link href="#payroll">Salary</Nav.Link>
        <Nav.Link href="#manage-account">View Schedule</Nav.Link>
      </Nav>
    </div>
  );
};

export default SidebarStylist;
