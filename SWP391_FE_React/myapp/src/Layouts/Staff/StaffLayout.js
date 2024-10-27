import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import StaffSidebar from "./StaffSidebar";
import BreadcrumbsHeader from "../../components/Dashboard/breadcum";
import Header from "../../components/Dashboard/Header";
import { Typography } from "@mui/material";

const StaffLayout = () => {
  const location = useLocation(); // Lấy thông tin route hiện tại

  // Kiểm tra nếu đang ở trang chính của Staff Dashboard
  const isDashboard = location.pathname === "/staff";

  return (
    <div style={mainWrapperStyle}>
      <Header /> {/* Giữ nguyên header */}
      <div style={breadcrumbWrapperStyle}>
        <BreadcrumbsHeader /> {/* Breadcrumb nằm ngay dưới header */}
      </div>
      <div style={managerLayoutStyle}>
        <StaffSidebar /> {/* Sidebar dành cho Staff */}
        <div style={managerContentStyle}>
          {/* Chỉ hiển thị phần chào mừng khi ở trang chính */}
          {isDashboard && (
            <div style={backgroundContainerStyle}>
              <div style={overlayStyle}>
                <Typography variant="h4" style={welcomeTextStyle}>
                  Welcome to Staff Dashboard
                </Typography>
                <Typography variant="h6" style={quoteTextStyle}>
                  "Teamwork makes the dream work. Together, we achieve more."
                </Typography>
              </div>
            </div>
          )}

          {/* Phần Outlet để render các trang con */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// Styles
const mainWrapperStyle = {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
};

const breadcrumbWrapperStyle = {
  width: "100%",
  padding: "10px 20px",
  backgroundColor: "#f5f5f5",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
};

const managerLayoutStyle = {
  display: "flex",
  flex: 1,
  overflow: "hidden",
};

const managerContentStyle = {
  flex: 1,
  padding: "0px", // Loại bỏ padding để nền phủ kín
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
};

// Nền và overlay cho Staff
const backgroundContainerStyle = {
  flex: 1,
  backgroundImage:
    'url("https://levityhairstudio.com/wp-content/uploads/2020/01/Levity-Hair-Salon-Employees.jpg")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

const overlayStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay xám
  padding: "40px",
  borderRadius: "12px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
  animation: "fadeIn 2s ease-in-out", // Hiệu ứng động cho overlay
};

const welcomeTextStyle = {
  color: "#fff",
  fontWeight: "bold",
  fontSize: "2.5rem",
  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
  marginBottom: "10px",
  animation: "slideIn 1.5s ease-in-out",
};

const quoteTextStyle = {
  fontStyle: "italic",
  color: "#fff",
  textShadow: "1px 1px 3px rgba(0, 0, 0, 0.7)",
  animation: "fadeIn 2.5s ease-in-out",
};

export default StaffLayout;
