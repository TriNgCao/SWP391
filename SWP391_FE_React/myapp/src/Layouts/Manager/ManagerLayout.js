import React from "react";
import { Outlet } from "react-router-dom";
import ManagerSidebar from "./ManagerSidebar";
import Header from "../../components/Dashboard/Header";
import BreadcrumbsHeader from "../../components/Dashboard/breadcum";

const ManagerLayout = () => {
  return (
    <div style={mainWrapperStyle}>
      <div style={managerLayoutStyle}>
        <ManagerSidebar />
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

export default ManagerLayout;
