import React from "react";
import Header from "../Header";
import Sidebar from "./SidebarAdmin";

export default function AdminDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div
          style={{ marginLeft: "200px", padding: "20px", flexGrow: 1 }}
        ></div>
      </div>
    </div>
  );
}
