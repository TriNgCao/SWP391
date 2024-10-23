import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import BreadcrumbsHeader from "../../components/Dashboard/breadcum";

const AdminLayout = () => {
  return (
    <div style={mainWrapperStyle}>
      <div style={managerLayoutStyle}>
        <AdminSidebar />
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

export default AdminLayout;
