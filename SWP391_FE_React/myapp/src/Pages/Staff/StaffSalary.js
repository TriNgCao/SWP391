import React from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// Sample salary data
const salaryData = [
  {
    id: 1,
    name: "Amit Singh",
    basicSalary: "$50,000",
    bonus: "$5,000",
    hoursWorked: 160,
    commission: "$1,000",
  },
  {
    id: 2,
    name: "Rahul Bhat",
    basicSalary: "$45,000",
    bonus: "$4,500",
    hoursWorked: 150,
    commission: "$800",
  },
  {
    id: 3,
    name: "Harsha TL",
    basicSalary: "$30,000",
    bonus: "$3,000",
    hoursWorked: 140,
    commission: "$600",
  },
  {
    id: 4,
    name: "Sandeep Roy",
    basicSalary: "$35,000",
    bonus: "$3,500",
    hoursWorked: 170,
    commission: "$700",
  },
  {
    id: 5,
    name: "Arjun Raj",
    basicSalary: "$55,000",
    bonus: "$5,500",
    hoursWorked: 180,
    commission: "$1,200",
  },
];

// Assume staff ID is 1 (for demonstration)
const currentStaffId = 1;

const StaffSalary = () => {
  // Find the current staff member's salary information
  const currentStaffSalary = salaryData.find(
    (staff) => staff.id === currentStaffId
  );

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
        Staff Salary
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        View your salary, commission, and working hours
      </Typography>

      {/* Salary Table */}
      <Paper
        sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                <TableCell sx={{ color: "#fff" }}>Basic Salary</TableCell>
                <TableCell sx={{ color: "#fff" }}>Bonus</TableCell>
                <TableCell sx={{ color: "#fff" }}>Hours Worked</TableCell>
                <TableCell sx={{ color: "#fff" }}>Commission</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentStaffSalary && (
                <TableRow>
                  <TableCell>{currentStaffSalary.name}</TableCell>
                  <TableCell>{currentStaffSalary.basicSalary}</TableCell>
                  <TableCell>{currentStaffSalary.bonus}</TableCell>
                  <TableCell>{currentStaffSalary.hoursWorked}</TableCell>
                  <TableCell>{currentStaffSalary.commission}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default StaffSalary;
