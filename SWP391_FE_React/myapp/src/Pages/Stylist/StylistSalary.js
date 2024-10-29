import React, { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Grid } from "@mui/material";

export default function StylistSalary() {
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dữ liệu giả cho lương cá nhân stylist
  const fakeData = {
    name: "Nguyễn Văn A",
    position: "Senior Stylist",
    baseSalary: 8000000,
    bonus: 2000000,
  };

  useEffect(() => {
    // Giả lập việc tải dữ liệu
    const fetchData = () => {
      setTimeout(() => {
        setSalary(fakeData);
        setLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        padding: 4,

        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Overlay màu đen mờ */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay màu đen với độ trong suốt
        }}
      />

      <Box
        sx={{
          position: "relative", // Đặt lại vị trí cho Box nội dung
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: "600px", // Giới hạn chiều rộng tối đa
          zIndex: 1, // Đảm bảo nội dung hiển thị trên overlay
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Khung nội dung trong suốt
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 3, textAlign: "center", color: "#4CAF50" }} // Màu chữ xanh lá cây
        >
          Personal Salary Overview
        </Typography>

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="60vh"
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ textAlign: "center", color: "#4CAF50" }} // Màu chữ xanh lá cây
              >
                Stylist Name:
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, textAlign: "center", color: "#333" }} // Màu chữ tối cho giá trị
              >
                {salary.name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ textAlign: "center", color: "#4CAF50" }} // Màu chữ xanh lá cây
              >
                Position:
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, textAlign: "center", color: "#333" }} // Màu chữ tối cho giá trị
              >
                {salary.position}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ textAlign: "center", color: "#4CAF50" }} // Màu chữ xanh lá cây
              >
                Base Salary:
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, textAlign: "center", color: "#333" }} // Màu chữ tối cho giá trị
              >
                {salary.baseSalary.toLocaleString()} VNĐ
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ textAlign: "center", color: "#4CAF50" }} // Màu chữ xanh lá cây
              >
                Bonus:
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, textAlign: "center", color: "#333" }} // Màu chữ tối cho giá trị
              >
                {salary.bonus.toLocaleString()} VNĐ
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ textAlign: "center", color: "#4CAF50" }} // Màu chữ xanh lá cây
              >
                Total Salary:
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginBottom: 2, textAlign: "center", color: "#333" }} // Màu chữ tối cho giá trị
              >
                {(salary.baseSalary + salary.bonus).toLocaleString()} VNĐ
              </Typography>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
}
