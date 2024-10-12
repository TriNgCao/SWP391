import React from "react";
import Header from "../Header";

import SidebarStylist from "./SidebarStylist";
import { Outlet } from "react-router-dom";

export default function StylistDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <SidebarStylist />
        <div style={{ marginLeft: "200px", padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
