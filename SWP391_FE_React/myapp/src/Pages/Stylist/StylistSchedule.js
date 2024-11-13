import React, { useState, useEffect } from "react";
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
  Modal,
} from "@mui/material";
import axios from "axios";

export default function StylistSchedule() {
  const [scheduleData, setScheduleData] = useState([]); // Dữ liệu lịch làm việc
  const [selectedDate, setSelectedDate] = useState(""); // Ngày đã chọn
  const [appointments, setAppointments] = useState([]); // Dữ liệu các cuộc hẹn
  const [open, setOpen] = useState(false); // Điều khiển modal

  // Lấy accountID từ sessionStorage
  const accountID = sessionStorage.getItem("userID");

  // Fetch lịch trình của stylist (API thứ nhất)
  const fetchStylistSchedule = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/schedule/view/STL1` // Giữ nguyên API này
      );
      setScheduleData(response.data); // Lưu lịch làm việc vào state
    } catch (error) {
      console.error("Error fetching stylist schedule:", error);
    }
  };

  // Fetch chi tiết các cuộc hẹn cho ngày đã chọn (API thứ hai)
  const fetchAppointments = async (date) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/appointment/stylist/STL1`
      );

      // Lọc các cuộc hẹn trùng với ngày đã chọn
      const filteredAppointments = response.data.filter(
        (appointment) => appointment.date === date
      );
      setAppointments(filteredAppointments); // Lưu các cuộc hẹn vào state
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  // Khi người dùng nhấn "View" cho một ngày
  const handleSelectDate = (date) => {
    setSelectedDate(date); // Lưu ngày đã chọn
    fetchAppointments(date); // Gọi API thứ hai để lấy cuộc hẹn cho ngày đó
    setOpen(true); // Mở modal để hiển thị các cuộc hẹn
  };

  // Đóng modal
  const handleClose = () => {
    setOpen(false);
    setSelectedDate("");
    setAppointments([]);
  };

  useEffect(() => {
    fetchStylistSchedule(); // Fetch lịch làm việc khi component mount
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ mb: 3, textAlign: "center", color: "#4CAF50" }}
      >
        Stylist Schedule
      </Typography>

      {/* Schedule Table */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <TableContainer
          component={Paper}
          sx={{ width: "80%", maxWidth: "800px" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#4CAF50" }}>
                <TableCell
                  sx={{ color: "#fff", textAlign: "center", width: "50%" }}
                >
                  <strong>Date</strong>
                </TableCell>
                <TableCell
                  sx={{ color: "#fff", textAlign: "center", width: "50%" }}
                >
                  <strong>View Appointments</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scheduleData.length > 0 ? (
                scheduleData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ textAlign: "center" }}>{item}</TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button
                        variant="contained"
                        onClick={() => handleSelectDate(item)} // Gọi hàm khi chọn ngày
                        sx={{
                          backgroundColor: "#4CAF50",
                          color: "white",
                          "&:hover": {
                            backgroundColor: "#388E3C",
                          },
                        }}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No schedule available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal to show detailed appointments */}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ mb: 2, textAlign: "center", color: "#4CAF50" }}
          >
            Appointments on {selectedDate}
          </Typography>

          {appointments.length > 0 ? (
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#4CAF50" }}>
                    <TableCell sx={{ color: "#fff" }}>
                      <strong>Customer Name</strong>
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      <strong>Start Time</strong>
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      <strong>End Time</strong>
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      <strong>Service Name</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment, index) => (
                    <TableRow key={index}>
                      <TableCell>{appointment.customerName}</TableCell>
                      <TableCell>{appointment.startTime}</TableCell>
                      <TableCell>{appointment.endTime}</TableCell>
                      <TableCell>
                        {appointment.serviceName && appointment.serviceName.length > 0
                          ? appointment.serviceName.join(", ") // Nối các dịch vụ bằng dấu phẩy
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography sx={{ textAlign: "center", mt: 2 }}>
              No appointments available.
            </Typography>
          )}

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleClose}
              sx={{
                backgroundColor: "#4CAF50",
                color: "white",
                "&:hover": {
                  backgroundColor: "#388E3C",
                },
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
