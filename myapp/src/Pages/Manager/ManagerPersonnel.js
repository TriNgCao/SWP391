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


// Sample transactions data
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
    role: "Stylist",
    salary: "$45,000",
    rank: "Mid-Level Stylist",
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
    role: "Stylist",
    salary: "$48,000",
    rank: "Mid-Level Stylist",
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
    role: "Staff",
    salary: "$32,000",
    rank: "Junior Staff",
    status: "Active",
  },
];

const ManagerPersonnel = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [accountFilter, setAccountFilter] = useState("All");

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
              <MenuItem value="Complete">Complete</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Type</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Income">Income</MenuItem>
              <MenuItem value="Expense">Expense</MenuItem>
              <MenuItem value="Uncategorized Income">
                Uncategorized Income
              </MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Account</InputLabel>
            <Select
              value={accountFilter}
              onChange={(e) => setAccountFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Savings">Savings</MenuItem>
              <MenuItem value="Cash on Hand">Cash on Hand</MenuItem>
              <MenuItem value="Cash Management">Cash Management</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Add Income and Expense Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#4CAF50" }}
        >
          Add
        </Button>
      </Box>

      {/* Transactions Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#4caf50",
                color: "#fff",
              }}
            >
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
            {employeeData.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>{employee.salary}</TableCell>
                <TableCell>{employee.rank}</TableCell>
                <TableCell
                  sx={{
                    color: employee.status === "Active" ? "#4CAF50" : "#F44336",
                  }}
                >
                  {employee.status}
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

export default ManagerPersonnel;
