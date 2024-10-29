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
  Chip,
  Button,
  Modal,
  IconButton,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
// Hàm render nhãn trạng thái
const renderStatusChip = (status) => {
  switch (status) {
    case "Pending":
      return <Chip label="Pending" sx={{ bgcolor: "#FFEB3B", color: "#333" }} />;
    case "Ready":
      return <Chip label="Ready" sx={{ bgcolor: "#2196F3", color: "#fff" }} />;
    case "Cancelled":
      return <Chip label="Cancelled" sx={{ bgcolor: "#F44336", color: "#fff" }} />;
    case "Processing":
      return <Chip label="Processing" sx={{ bgcolor: "#FFA500", color: "#fff" }} />;
    case "Completed":
      return <Chip label="Completed" sx={{ bgcolor: "#4CAF50", color: "#fff" }} />;
    default:
      return <Chip label={status} sx={{ bgcolor: "#9E9E9E", color: "#fff" }} />;
  }
};

const StaffAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Fetch dữ liệu từ API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/appointment/staff/STA1");
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Xử lý mở modal
  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setOpenModal(true);
  };

  // Xử lý đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedAppointment(null);
  };

  // Xử lý cập nhật trạng thái
  const handleUpdateStatus = async (newStatus) => {
    if (!selectedAppointment) return;

    // Xác nhận thay đổi trạng thái với nút Cancel
    const confirmUpdate = window.confirm(
      `Are you sure you want to change the status to "${newStatus}"?`
    );

    if (!confirmUpdate) {
      return; // Nếu người dùng chọn Cancel, không làm gì thêm
    }

    try {
      // Cập nhật trạng thái cục bộ ngay lập tức
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.appointmentId === selectedAppointment.appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );

      // Đóng modal ngay lập tức
      handleCloseModal();

      // Gửi yêu cầu cập nhật trạng thái đến API
      const response = await axios.put(
        `http://localhost:8080/api/appointment/${selectedAppointment.appointmentId}`,
        { status: newStatus }
      );

      if (response.status === 200) {
        console.log("Good");
      }
    } catch (error) {
      console.error("Failed to update appointment status:", error);
    }
  };

  // Hiển thị các nút tùy chọn cho trạng thái mới
  const renderStatusButtons = () => {
    if (!selectedAppointment) return null;

    const { status } = selectedAppointment;

    if (status === "Pending") {
      return (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#2196F3", color: "#fff" }}
            onClick={() => handleUpdateStatus("Ready")}
          >
            Approve
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#F44336", color: "#fff" }}
            onClick={() => handleUpdateStatus("Cancelled")}
          >
            Reject
          </Button>
        </Box>
      );
    }

    if (status === "Ready") {
      return (
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#FFA500", color: "#fff" }}
            onClick={() => handleUpdateStatus("Processing")}
          >
            Start Service
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#F44336", color: "#fff" }}
            onClick={() => handleUpdateStatus("Cancelled")}
          >
            Cancel Service
          </Button>
        </Box>
      );
    }

    if (status === "Processing") {
      return (
        <Button
          variant="contained"
          sx={{ backgroundColor: "#4CAF50", color: "#fff" }}
          onClick={() => handleUpdateStatus("Completed")}
        >
          Complete
        </Button>
      );
    }

    return null;
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
        Appointments Management
      </Typography>

      {/* Table của danh sách cuộc hẹn */}
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
                    <TableCell sx={{ color: "#fff" }}>No</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Customer Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Stylist Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Date</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Time</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Total</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Services</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Action</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {appointments.map((appointment, index) => (
                    <TableRow key={appointment.appointmentId}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{appointment.customerName}</TableCell>
                      <TableCell>{appointment.stylistName}</TableCell>
                      <TableCell>{appointment.date}</TableCell>
                      <TableCell>{appointment.startTime}</TableCell>
                      <TableCell>{`${appointment.totalPrice} VNĐ`}</TableCell>
                      <TableCell>{appointment.serviceName.join(", ")}</TableCell>
                      <TableCell>{renderStatusChip(appointment.status)}</TableCell>

                      <TableCell>
                        {!["Cancelled", "Completed"].includes(appointment.status) ? (
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ backgroundColor: "#4CAF50" }}
                            onClick={() => handleOpenModal(appointment)}
                          >
                            Edit
                          </Button>
                        ) : (
                          <Button variant="contained" disabled sx={{ backgroundColor: "#9E9E9E" }}>
                            Edit
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Modal chỉnh sửa trạng thái */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Nút X để tắt modal */}
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 2, color: "#4CAF50", textAlign: "center" }}
          >
            Edit Appointment Status
          </Typography>

          {renderStatusButtons()}
        </Box>
      </Modal>
    </Box>
  );
};

export default StaffAppointments;
