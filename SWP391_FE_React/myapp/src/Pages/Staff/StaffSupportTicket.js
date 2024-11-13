import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";

export default function StaffSupportTicket() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); // State để quản lý trạng thái loading
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Fetch data from API
  const fetchTickets = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const response = await axios.get("http://localhost:8080/support-tickets"); // Thay URL bằng URL API thực tế của bạn
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  // Update ticket status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:8080/support-tickets/update/${id}`, {
        status: newStatus,
      });
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === id ? { ...ticket, status: newStatus } : ticket
        )
      );

      // Cập nhật thông báo snackbar
      setSnackbarMessage(
        newStatus ? "Has Supported" : "Not Supported Yet"
      );
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error updating ticket status:", error);
      setSnackbarMessage("Failed to update status");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  // Đóng snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 3, color: "#4CAF50" }}
      >
        Staff Support Tickets
      </Typography>

      {/* Hiển thị loading nếu dữ liệu đang được tải */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#4CAF50" }}>
                <TableCell sx={{ color: "#fff" }}>ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>Full Name</TableCell>
                <TableCell sx={{ color: "#fff" }}>Email</TableCell>
                <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
                <TableCell sx={{ color: "#fff" }}>Subject</TableCell>
                <TableCell sx={{ color: "#fff" }}>Message</TableCell>
                <TableCell sx={{ color: "#fff" }}>Created At</TableCell>
                <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                <TableCell sx={{ color: "#fff" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell>{ticket.id}</TableCell>
                  <TableCell>{ticket.fullName || "N/A"}</TableCell>
                  <TableCell>{ticket.email || "N/A"}</TableCell>
                  <TableCell>{ticket.phone || "N/A"}</TableCell>
                  <TableCell>{ticket.subject || "N/A"}</TableCell>
                  <TableCell>{ticket.message || "N/A"}</TableCell>
                  <TableCell>
                    {new Date(ticket.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {ticket.status ? "Has Supported" : "Not Supported Yet"}
                  </TableCell>
                  <TableCell>
  <Button
    variant="contained"
    color={ticket.status ? "error" : "success"}
    onClick={() => updateStatus(ticket.id, !ticket.status)}
  >
    {ticket.status ? "Not Done" : "Done"}
  </Button>
</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Snackbar thông báo */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={1200}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
