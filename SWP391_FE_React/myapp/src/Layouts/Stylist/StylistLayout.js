import React from "react";
import { Outlet } from "react-router-dom";
import StaffSidebar from "./StylistSidebar";
import BreadcrumbsHeader from "../../components/Dashboard/breadcum";
import StylistSidebar from "./StylistSidebar";

const StylistLayout = () => {
  return (
    <div style={mainWrapperStyle}>
      <div style={managerLayoutStyle}>
        <StylistSidebar />
        <div style={managerContentStyle}>
          <BreadcrumbsHeader />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const mainWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

const managerLayoutStyle = {
  display: "flex",
  flex: 1,
  overflow: "hidden",
};

const managerContentStyle = {
  flex: 1,
  padding: "20px",
  backgroundColor: "#ECECEC",
  overflowY: "auto",
};

export default StylistLayout;
