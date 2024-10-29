import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import BreadcrumbsHeader from "../../components/Dashboard/breadcum";
import StylistSidebar from "./StylistSidebar";
import { Typography } from "@mui/material";
import Header from "../../components/Dashboard/Header";

const StylistLayout = () => {
  const location = useLocation(); // Lấy thông tin route hiện tại

  // Kiểm tra nếu đang ở trang chính của Stylist Dashboard
  const isDashboard = location.pathname === "/stylist";

  return (
    <div style={mainWrapperStyle}>
      <Header />
      <div style={managerLayoutStyle}>
        <StylistSidebar /> {/* Sidebar dành cho Stylist */}
        <div style={managerContentStyle}>
          <BreadcrumbsHeader /> {/* Breadcrumb nằm ngay dưới header */}
          {/* Chỉ hiển thị phần chào mừng khi ở trang chính */}
          {isDashboard && (
            <div style={backgroundContainerStyle}>
              <div style={overlayStyle}>
                <Typography variant="h4" style={welcomeTextStyle}>
                  Welcome to Stylist Dashboard
                </Typography>
                <Typography variant="h6" style={quoteTextStyle}>
                  "Creativity is intelligence having fun. Express your passion."
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

// Nền và overlay cho Stylist
const backgroundContainerStyle = {
  flex: 1,
  backgroundImage:
    'url("https://media.licdn.com/dms/image/v2/C5612AQGjJtV7K0cXlw/article-cover_image-shrink_600_2000/article-cover_image-shrink_600_2000/0/1520134958715?e=2147483647&v=beta&t=TseHQbOQyQYpESrGwdfnWkK-WjWC1b2SnU6NcaazU9o")',
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

export default StylistLayout;
