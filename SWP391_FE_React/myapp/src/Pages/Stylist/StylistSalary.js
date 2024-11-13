import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  PaginationItem,
} from "@mui/material";
import axios from "axios";

export default function StylistSalary() {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Bắt đầu từ trang 1
  const rowsPerPage = 5; // Số dòng trên mỗi trang cố định là 5
  const currentYear = new Date().getFullYear();
  const accountID = sessionStorage.getItem("userID");

  useEffect(() => {
    // Lấy dữ liệu lương của stylist từ API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/salary/stylist/${accountID}`
        );
        console.log("Dữ liệu lương:", response.data);

        // Lọc dữ liệu chỉ lấy những bản ghi trong năm hiện tại
        const filteredData = response.data.filter((salary) => {
          const salaryYear = new Date(salary.payrollDate).getFullYear();
          return salaryYear === currentYear;
        });

        setSalaryData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu lương:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [accountID, currentYear]);

  // Tổng số trang dựa trên số dữ liệu và số dòng trên mỗi trang
  const pageCount = Math.ceil(salaryData.length / rowsPerPage);

  // Xử lý thay đổi trang
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box
      sx={{
        padding: 4,
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ width: "100%", maxWidth: "800px" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 3, textAlign: "center", color: "#4CAF50" }}
          >
            Personal Salary Overview - {currentYear}
          </Typography>

          {/* Bảng lương */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#4CAF50" }}>
                  <TableCell sx={{ color: "#fff" }}>Payroll Date</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Position</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Salary (Hourly)</TableCell>
                  <TableCell sx={{ color: "#fff" }}>Commission (%)</TableCell>
                  <TableCell sx={{ color: "#fff" }}>
                    Commission Amount
                  </TableCell>
                  <TableCell sx={{ color: "#fff" }}>Total Earnings</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salaryData
                  .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                  .map((salary, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(salary.payrollDate).toLocaleDateString(
                          "vi-VN"
                        )}
                      </TableCell>
                      <TableCell>{salary.name || "N/A"}</TableCell>
                      <TableCell>
                        {salary.salary
                          ? salary.salary.toLocaleString() + " VNĐ"
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {salary.commission
                          ? (salary.commission * 100).toFixed(1) + " %"
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {salary.commissionAmount
                          ? salary.commissionAmount.toLocaleString() + " VNĐ"
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {salary.earning
                          ? salary.earning.toLocaleString() + " VNĐ"
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Phân trang */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 2,
            }}
          >
            <Pagination
              count={pageCount}
              page={page}
              onChange={handleChangePage}
              color="primary"
              renderItem={(item) => (
                <PaginationItem
                  {...item}
                  sx={{
                    "&.Mui-selected": {
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                    },
                  }}
                />
              )}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
}
