import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import axios from "axios";

// Sample data for team members
const appointmentData = [
  {
    appointmentId: 1,
    customerName: "John Doe",
    stylistName: "Amit Singh",
    date: "2024-10-15",
    services: "Haircut, Styling",
    status: "Complete",
  },
  {
    appointmentId: 2,
    customerName: "Jane Smith",
    stylistName: "Rahul Bhat",
    date: "2024-10-16",
    services: "Coloring",
    status: "Pending",
  },
  {
    appointmentId: 3,
    customerName: "Emily Johnson",
    stylistName: "Harsha TL",
    date: "2024-10-17",
    services: "Manicure, Pedicure",
    status: "Complete",
  },
  {
    appointmentId: 4,
    customerName: "Michael Brown",
    stylistName: "Sandeep Roy",
    date: "2024-10-18",
    services: "Haircut",
    status: "Process",
  },
  {
    appointmentId: 5,
    customerName: "Sarah Wilson",
    stylistName: "Arjun Raj",
    date: "2024-10-19",
    services: "Facial",
    status: "Cancel",
  },
  {
    appointmentId: 6,
    customerName: "David Garcia",
    stylistName: "Priya Sharma",
    date: "2024-10-20",
    services: "Hair Treatment",
    status: "Pending",
  },
  {
    appointmentId: 7,
    customerName: "Linda Martinez",
    stylistName: "Neha Gupta",
    date: "2024-10-21",
    services: "Haircut, Coloring",
    status: "Complete",
  },
  {
    appointmentId: 8,
    customerName: "Robert Rodriguez",
    stylistName: "Ravi Kumar",
    date: "2024-10-22",
    services: "Styling",
    status: "Pending",
  },
  {
    appointmentId: 9,
    customerName: "Jennifer Lee",
    stylistName: "Sita Devi",
    date: "2024-10-23",
    services: "Manicure",
    status: "Complete",
  },
  {
    appointmentId: 10,
    customerName: "William Smith",
    stylistName: "Vikram Singh",
    date: "2024-10-24",
    services: "Pedicure",
    status: "Complete",
  },
];

const ManagerAppointments = () => {
  const [accounts, setAccount] = useState([]);
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      setAccount(response.data);
    });
  }, []);

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
        Appointments Management
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Managing the Team Members
      </Typography>

      {/* Team Table */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            sx={{
              padding: 2,
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
            }}
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
                    <TableCell sx={{ color: "#fff" }}>Appointment ID</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Customer Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Stylist Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Services</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {appointmentData.map((appointment) => (
                    <TableRow key={appointment.appointmentId}>
                      <TableCell>{appointment.appointmentId}</TableCell>
                      <TableCell>{appointment.customerName}</TableCell>
                      <TableCell>{appointment.stylistName}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.services}</TableCell>
                      <TableCell>{appointment.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ManagerAppointments;
