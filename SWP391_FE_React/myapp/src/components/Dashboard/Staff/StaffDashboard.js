import React from "react";
import Header from "../Header";

import SidebarStaff from "./SidebarStaff";

export default function StaffDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <SidebarStaff />
        <div
          style={{ marginLeft: "200px", padding: "20px", flexGrow: 1 }}
        ></div>
      </div>
    </div>
  );
}
