import React from "react";
import Header from "../Header";

import SidebarManage from "./SidebarManage";

export default function ManageDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <SidebarManage />
        <div
          style={{ marginLeft: "200px", padding: "20px", flexGrow: 1 }}
        ></div>
      </div>
    </div>
  );
}
