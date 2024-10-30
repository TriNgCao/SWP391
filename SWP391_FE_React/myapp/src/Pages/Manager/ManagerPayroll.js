import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import { format } from "date-fns";

// URL của API có id là 1 nha cậu Trí

const API_URL = "http://localhost:8080/api/payroll/salon/manager";

const ManagerPayroll = () => {
  const [payrollData, setPayrollData] = useState([]);

  // Lấy dữ liệu payroll từ API khi tải trang
  useEffect(() => {
    fetchPayrollData();
  }, []);

  // Hàm gọi API để lấy dữ liệu payroll
  const fetchPayrollData = async () => {
    try {
      const response = await axios.get(API_URL);
      setPayrollData(response.data);
    } catch (error) {
      console.error("Error fetching payroll data:", error);
    }
  };

  // Hàm cập nhật trạng thái status của payroll
  const updateStatus = async (payrollId, newStatus) => {
    try {
      // Gọi API PUT để cập nhật trạng thái của payroll
      await axios.put(`http://localhost:8080/api/payroll/${payrollId}`, {
        status: newStatus,
      });
      alert("Status updated successfully.");
      fetchPayrollData(); // Cập nhật lại dữ liệu sau khi thay đổi
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#fff",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 2, color: "#4CAF50" }}
      >
        Payments Details
      </Typography>

      {/* Bảng hiển thị payroll */}
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4caf50", color: "#fff" }}>
              <TableCell sx={{ color: "#fff" }}>No</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
              <TableCell sx={{ color: "#fff" }}>Role</TableCell>
              <TableCell sx={{ color: "#fff" }}>Date</TableCell>
              <TableCell sx={{ color: "#fff" }}>Earnings</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollData.length > 0 ? (
              payrollData.map((row, index) => (
                <TableRow key={row.payrollId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.role === 2 ? "Stylist" : "Other"}</TableCell>
                  <TableCell>
                    {format(new Date(row.payrollDate), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>{row.earning.toLocaleString()} VNĐ</TableCell>
                  <TableCell
                    sx={{
                      color: row.status ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {row.status ? "Đã thanh toán" : "Chưa thanh toán"}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      color={row.status ? "error" : "success"}
                      onClick={() => updateStatus(row.payrollId, !row.status)}
                      sx={{ minWidth: "100px" }}
                    >
                      {row.status ? "Set Pending" : "Set Paid"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManagerPayroll;

// /import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Box,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
// } from "@mui/material";
// import { format } from "date-fns";

// // URL của API
// const API_URL = "http://localhost:8080/api/payroll/salon/1";

// const ManagerPayroll = () => {
//   const [payrollData, setPayrollData] = useState([]);

//   // Lấy dữ liệu payroll từ API khi tải trang
//   useEffect(() => {
//     fetchPayrollData();
//   }, []);

//   // Hàm gọi API để lấy dữ liệu payroll
//   const fetchPayrollData = async () => {
//     try {
//       const response = await axios.get(API_URL);
//       setPayrollData(response.data);
//     } catch (error) {
//       console.error("Error fetching payroll data:", error);
//     }
//   };

//   // Hàm cập nhật trạng thái status của payroll
//   const updateStatus = async (payrollId, newStatus) => {
//     try {
//       // Gọi API PUT để cập nhật trạng thái của payroll
//       await axios.put(`http://localhost:8080/api/payroll/${payrollId}`, {
//         status: newStatus,
//       });
//       alert("Status updated successfully.");
//       fetchPayrollData(); // Cập nhật lại dữ liệu sau khi thay đổi
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         padding: 4,
//         backgroundColor: "#fff",
//         minHeight: "100vh",
//         color: "#333",
//       }}
//     >
//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         sx={{ mb: 2, color: "#4CAF50" }}
//       >
//         Payments Details
//       </Typography>

//       {/* Bảng hiển thị payroll */}
//       <TableContainer
//         component={Paper}
//         sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#4caf50", color: "#fff" }}>
//               <TableCell sx={{ color: "#fff" }}>No</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Name</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Email</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Role</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Date</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Earnings</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Status</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {payrollData.length > 0 ? (
//               payrollData.map((row, index) => (
//                 <TableRow key={row.payrollId}>
//                   <TableCell>{index + 1}</TableCell>
//                   <TableCell>{row.name}</TableCell>
//                   <TableCell>{row.email}</TableCell>
//                   <TableCell>{row.phone}</TableCell>
//                   <TableCell>{row.role === 2 ? "Stylist" : "Other"}</TableCell>
//                   <TableCell>
//                     {format(new Date(row.payrollDate), "yyyy-MM-dd")}
//                   </TableCell>
//                   <TableCell>{row.earning.toLocaleString()} VNĐ</TableCell>
//                   <TableCell
//                     sx={{
//                       color: row.status ? "green" : "red",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {row.status ? "Đã thanh toán" : "Chưa thanh toán"}
//                   </TableCell>
//                   <TableCell>
//                     <Button
//                       variant="contained"
//                       color={row.status ? "error" : "success"}
//                       onClick={() => updateStatus(row.payrollId, !row.status)}
//                       sx={{ minWidth: "100px" }}
//                     >
//                       {row.status ? "Set Pending" : "Set Paid"}
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell colSpan={9} align="center">
//                   No data found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ManagerPayroll;
