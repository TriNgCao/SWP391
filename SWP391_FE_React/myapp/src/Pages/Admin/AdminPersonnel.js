import React, { useState } from "react";
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
  Pagination,
} from "@mui/material";

// Sample employee data
const employeeData = [
  {
    id: 1,
    name: "Amit Singh",
    role: "Stylist",
    salary: "$50,000",
    rank: "Senior Stylist",
    status: "Active",
  },
  {
    id: 2,
    name: "Rahul Bhat",
    role: "Manager",
    salary: "$70,000",
    rank: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Harsha TL",
    role: "Staff",
    salary: "$30,000",
    rank: "Junior Staff",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Sandeep Roy",
    role: "Staff",
    salary: "$35,000",
    rank: "Junior Staff",
    status: "Active",
  },
  {
    id: 5,
    name: "Arjun Raj",
    role: "Stylist",
    salary: "$55,000",
    rank: "Senior Stylist",
    status: "Active",
  },
  {
    id: 6,
    name: "Priya Sharma",
    role: "Manager",
    salary: "$60,000",
    rank: "Mid-Level Manager",
    status: "Active",
  },
  {
    id: 7,
    name: "Neha Gupta",
    role: "Staff",
    salary: "$28,000",
    rank: "Junior Staff",
    status: "Active",
  },
  {
    id: 8,
    name: "Ravi Kumar",
    role: "Staff",
    salary: "$33,000",
    rank: "Junior Staff",
    status: "Inactive",
  },
  {
    id: 9,
    name: "Sita Devi",
    role: "Stylist",
    salary: "$52,000",
    rank: "Senior Stylist",
    status: "Active",
  },
  {
    id: 10,
    name: "Vikram Singh",
    role: "Manager",
    salary: "$75,000",
    rank: "Senior Manager",
    status: "Active",
  },
];

const AdminPersonnel = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

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
        Personnel
      </Typography>

      {/* Filter Section */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Stylist">Stylist</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Add Employee Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#4CAF50" }}
        >
          Add Employee
        </Button>
      </Box>

      {/* Employees Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4caf50", color: "#fff" }}>
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Role</TableCell>
              <TableCell sx={{ color: "#fff" }}>Salary</TableCell>
              <TableCell sx={{ color: "#fff" }}>Rank</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employeeData
              .filter(
                (employee) =>
                  (statusFilter === "All" ||
                    employee.status === statusFilter) &&
                  (typeFilter === "All" || employee.role === typeFilter)
              )
              .map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.role}</TableCell>
                  <TableCell>{employee.salary}</TableCell>
                  <TableCell>{employee.rank}</TableCell>
                  <TableCell>
                    {employee.status === "Active" ? "✔️" : "❌"}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "#4CAF50" }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination count={10} color="primary" />
      </Box>
    </Box>
  );
};

export default AdminPersonnel;
