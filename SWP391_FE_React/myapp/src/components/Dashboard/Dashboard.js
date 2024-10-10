import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AdminDashboard from "./Admin/AdminDashboard";
import ManageDashboard from "./Manage/ManageDashboard";
import StaffDashboard from "./Staff/StaffDashboard";
import StylistDashboard from "./Stylist/StylistDashboard";

export default function Dashboard() {
  return (
    <div>
      {/* <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManageDashboard />} />
        <Route path="/staff" element={<StaffDashboard />} />
        <Route path="/stylist" element={<StylistDashboard />} />
      </Routes>
      </BrowserRouter> */}
      {/* <AdminDashboard /> */}
      {/* <ManageDashboard /> */}
      {/* <StaffDashboard /> */}
      <StylistDashboard />
    </div>
  );
}
