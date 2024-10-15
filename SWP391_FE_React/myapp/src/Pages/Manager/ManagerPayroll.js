import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

// Sample payroll data
const payrollData = [
  {
    id: 1,
    invoiceNo: "180001",
    employeeName: "Amit Singh",
    employeeId: "12324",
    phone: "9515456478",
    email: "amitsingh@gmail.com",
    transactionId: "VJ00423BHW2",
    earnings: "₹ 1,40,600.00",
    status: "Completed",
  },
  {
    id: 2,
    invoiceNo: "180002",
    employeeName: "Rahul Bhat",
    employeeId: "45789",
    phone: "9514456478",
    email: "rahulb@gmail.com",
    transactionId: "VJ00423FDRS",
    earnings: "₹ 1,00,000.00",
    status: "Pending",
  },
  {
    id: 3,
    invoiceNo: "180003",
    employeeName: "Harsha TL",
    employeeId: "70538",
    phone: "9512456478",
    email: "harsha@gmail.com",
    transactionId: "VJ00423ERQE",
    earnings: "₹ 1,80,000.00",
    status: "Completed",
  },
  {
    id: 4,
    invoiceNo: "180004",
    employeeName: "Sandeep Roy",
    employeeId: "98456",
    phone: "9515456479",
    email: "sandeep@gmail.com",
    transactionId: "RJSDER93449",
    earnings: "₹ 1,60,000.00",
    status: "Completed",
  },
  {
    id: 5,
    invoiceNo: "180005",
    employeeName: "Arjun Raj",
    employeeId: "2417",
    phone: "9515456478",
    email: "arjun@gmail.com",
    transactionId: "SHJERE84747",
    earnings: "₹ 1,30,000.00",
    status: "Pending",
  },
  {
    id: 6,
    invoiceNo: "180006",
    employeeName: "Neha Sharma",
    employeeId: "32415",
    phone: "9512456487",
    email: "neha@gmail.com",
    transactionId: "JKL432AOWE",
    earnings: "₹ 1,25,000.00",
    status: "Completed",
  },
  {
    id: 7,
    invoiceNo: "180007",
    employeeName: "Ravi Kumar",
    employeeId: "67534",
    phone: "9513456789",
    email: "ravi.kumar@gmail.com",
    transactionId: "ERTU78294A",
    earnings: "₹ 1,75,000.00",
    status: "Pending",
  },
];

const ManagerPayroll = () => {
  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#fff",
        minHeight: "100vh",
        color: "#333",
      }}
    >
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Payments Details
      </Typography>

      {/* Filter Section and Download Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#4CAF50" }}
        >
          Download
        </Button>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel>This Month</InputLabel>
          <Select defaultValue="This Month">
            <MenuItem value="This Month">This Month</MenuItem>
            <MenuItem value="Last Month">Last Month</MenuItem>
            <MenuItem value="Last 3 Months">Last 3 Months</MenuItem>
            <MenuItem value="This Year">This Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Payroll Table */}
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4caf50", color: "#fff" }}>
              <TableCell sx={{ color: "#fff" }}>Invoice No</TableCell>
              <TableCell sx={{ color: "#fff" }}>Employee Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Employee ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Phone No</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Transaction ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Earnings</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.invoiceNo}</TableCell>
                <TableCell>{row.employeeName}</TableCell>
                <TableCell>{row.employeeId}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.transactionId}</TableCell>
                <TableCell>{row.earnings}</TableCell>
                <TableCell
                  sx={{
                    color: row.status === "Completed" ? "#4CAF50" : "#F44336",
                  }}
                >
                  {row.status}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ backgroundColor: "#4CAF50" }}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ManagerPayroll;
