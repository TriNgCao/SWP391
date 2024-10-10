import React from "react";
import Header from "../Header";

import SidebarStylist from "./SidebarStylist";

export default function StylistDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <SidebarStylist />
        <div
          style={{ marginLeft: "200px", padding: "20px", flexGrow: 1 }}
        ></div>
      </div>
    </div>
  );
}
