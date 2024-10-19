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
const services = [
  {
    serviceID: 1,
    serviceImg: "https://example.com/images/haircut.jpg",
    serviceName: "Basic Haircut",
    price: "$25",
    timeToFinish: "30 minutes",
    status: "Active",
  },
  {
    serviceID: 2,
    serviceImg: "https://example.com/images/shave.jpg",
    serviceName: "Shaving",
    price: "$15",
    timeToFinish: "20 minutes",
    status: "Active",
  },
  {
    serviceID: 3,
    serviceImg: "https://example.com/images/hair-color.jpg",
    serviceName: "Hair Coloring",
    price: "$50",
    timeToFinish: "60 minutes",
    status: "Active",
  },
  {
    serviceID: 4,
    serviceImg: "https://example.com/images/hair-treatment.jpg",
    serviceName: "Hair Treatment",
    price: "$45",
    timeToFinish: "45 minutes",
    status: "Not Active",
  },
  {
    serviceID: 5,
    serviceImg: "https://example.com/images/facial.jpg",
    serviceName: "Facial Treatment",
    price: "$60",
    timeToFinish: "40 minutes",
    status: "Active",
  },
  {
    serviceID: 6,
    serviceImg: "https://example.com/images/massage.jpg",
    serviceName: "Full Body Massage",
    price: "$80",
    timeToFinish: "90 minutes",
    status: "Active",
  },
  {
    serviceID: 7,
    serviceImg: "https://example.com/images/beard-trim.jpg",
    serviceName: "Beard Trim",
    price: "$20",
    timeToFinish: "15 minutes",
    status: "Not Active",
  },
  {
    serviceID: 8,
    serviceImg: "https://example.com/images/nail-care.jpg",
    serviceName: "Nail Care",
    price: "$30",
    timeToFinish: "25 minutes",
    status: "Active",
  },
  {
    serviceID: 9,
    serviceImg: "https://example.com/images/makeup.jpg",
    serviceName: "Makeup",
    price: "$70",
    timeToFinish: "50 minutes",
    status: "Active",
  },
  {
    serviceID: 10,
    serviceImg: "https://example.com/images/hair-styling.jpg",
    serviceName: "Hair Styling",
    price: "$40",
    timeToFinish: "35 minutes",
    status: "Not Active",
  },
];

const ManagerServices = () => {
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
        Services
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
          Add Services
        </Button>
      </Box>

      {/* Transactions Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4CAF50" }}>
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Image</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Price</TableCell>
              <TableCell sx={{ color: "#fff" }}>TimetoFinish</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service) => (
              <TableRow key={service.serviceID}>
                <TableCell>{service.serviceID}</TableCell>
                <TableCell>{service.serviceImg}</TableCell>
                <TableCell>{service.serviceName}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>{service.timeToFinish}</TableCell>
                <TableCell>{service.status}</TableCell>
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

export default ManagerServices;
