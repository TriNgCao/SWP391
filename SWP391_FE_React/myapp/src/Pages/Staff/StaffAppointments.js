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
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

// Hàm render nhãn trạng thái
const renderStatusChip = (status) => {
  switch (status) {
    case "Pending":
      return (
        <Chip label="Pending" sx={{ bgcolor: "#FFEB3B", color: "#333" }} />
      );
    case "Ready":
      return <Chip label="Ready" sx={{ bgcolor: "#2196F3", color: "#fff" }} />;
    case "Cancelled":
      return (
        <Chip label="Cancelled" sx={{ bgcolor: "#F44336", color: "#fff" }} />
      );
    case "Processing":
      return (
        <Chip label="Processing" sx={{ bgcolor: "#FFA500", color: "#fff" }} />
      );
    case "Completed":
      return (
        <Chip label="Completed" sx={{ bgcolor: "#4CAF50", color: "#fff" }} />
      );
    default:
      return <Chip label={status} sx={{ bgcolor: "#9E9E9E", color: "#fff" }} />;
  }
};

const StaffAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openPaymentConfirmation, setOpenPaymentConfirmation] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showSuccessSnackbar, setShowSuccessSnackbar] = useState(false);
  const [loyaltyPoint, setLoyaltyPoint] = useState(0); // Điểm loyalty của khách hàng
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0); // Tổng tiền sau khi trừ điểm
  const [useLoyaltyPoint, setUseLoyaltyPoint] = useState(false); // Biến để quản lý việc sử dụng loyaltyPoint
  // Fetch dữ liệu từ API
  const fetchAppointments1 = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/appointment/staff/STA1`
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };
  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/appointment/staff/STA1"
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Failed to fetch appointments:", error);
    }
  };
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/appointment/staff/STA1"
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();
  }, []);
  const handleClosePaymentConfirmation = () => {
    setOpenPaymentConfirmation(false);
    setUseLoyaltyPoint(false);
    fetchAppointments1();
  };

  const handleOpenModal = async (appointment) => {
    setSelectedAppointment(appointment);
    try {
      // Giả sử API trả về loyaltyPoint của khách hàng
      const response = await axios.get(
        `http://localhost:8080/user/customer/point/${appointment.customerId}`
      );
      const loyaltyPoints = response.data || 0; // Lấy loyaltyPoint từ API
      setLoyaltyPoint(loyaltyPoints);
      setTotalAfterDiscount(appointment.totalPrice); // Khởi tạo tổng tiền là totalPrice gốc
    } catch (error) {
      console.error("Failed to fetch loyalty point:", error);
      setLoyaltyPoint(0); // Nếu có lỗi, đặt loyaltyPoint là 0
    }
    setOpenModal(true);
  };

  const handleUpdateStatus = async (newStatus) => {
    if (!selectedAppointment) return;

    try {
      // Gọi API để cập nhật trạng thái mới
      await axios.put(
        `http://localhost:8080/api/appointment/${selectedAppointment.appointmentId}`,
        { status: newStatus }
      );

      // Cập nhật lại danh sách cuộc hẹn từ cơ sở dữ liệu
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.appointmentId === selectedAppointment.appointmentId
            ? { ...appointment, status: newStatus }
            : appointment
        )
      );

      // Đóng modal nếu trạng thái được cập nhật là "Pending" sang "Ready"
      if (newStatus === "Ready" || newStatus === "Cancelled" || newStatus === "Processing") {
        setOpenModal(false);
      }

      // Mở modal thanh toán nếu trạng thái là "Processing"
      if (newStatus === "Completed") {
        setOpenPaymentConfirmation(true);
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };
  // Xử lý đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleOpenPaymentConfirmation = () => {
    setOpenModal(false);

    // Tính tổng tiền sau khi trừ điểm loyalty
    const total = useLoyaltyPoint
      ? selectedAppointment.totalPrice - loyaltyPoint
      : selectedAppointment.totalPrice;

    setTotalAfterDiscount(total); // Cập nhật tổng tiền sau giảm
    setOpenPaymentConfirmation(true);

  };

  const fetchLoyaltyPoint = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/loyalty/${selectedAppointment.customerId}`
      );
      setLoyaltyPoint(response.data.loyaltyPoint);
    } catch (error) {
      console.error("Failed to fetch loyalty points:", error);
    }
  };

  // Gọi API lấy điểm loyalty khi mở modal thanh toán
  useEffect(() => {
    if (openModal && selectedAppointment) {
      fetchLoyaltyPoint();
    }
  }, [openModal, selectedAppointment]);

  const handleConfirmCashPayment = async () => {
    try {
      if (useLoyaltyPoint) {
        console.log("hello");
        await axios.put(`http://localhost:8080/payment/point/${selectedAppointment.customerId}`, {

        });
      }

      await axios.put(
        `http://localhost:8080/api/appointment/${selectedAppointment.appointmentId}`,
        { status: "Completed" }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.appointmentId === selectedAppointment.appointmentId
            ? { ...appointment, status: "Completed" }
            : appointment
        )
      );

      setShowSuccessSnackbar(true);

    } catch (error) {
      console.error("Failed to complete payment:", error);
    }

    setOpenPaymentConfirmation(false);
    fetchAppointments1();
  };
  const handleBankTransfer = async () => {
    try {

      const amountToPay = useLoyaltyPoint ? selectedAppointment.totalPrice - loyaltyPoint : selectedAppointment.totalPrice;
      const response = await axios.get("http://localhost:8080/payment/vn-pay", {
        params: {
          amount: amountToPay,
        },
      });

      const paymentUrl = response.data.data.paymentUrl;
      window.open(paymentUrl, '_blank')


    } catch (error) {
      console.error("Failed to initiate payment:", error);
    }
  };








  const renderPaymentModal = () => (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
        Select Payment Method
      </Typography>
      {
        loyaltyPoint > 0 && (
          <Typography variant="body1" sx={{ mb: 1, textAlign: "center" }}>
            Điểm LoyaltyPoint hiện tại: {loyaltyPoint}
          </Typography>
        )
      }

      {/* Tùy chọn sử dụng LoyaltyPoint */}
      <Button
        variant="outlined"
        sx={{ mb: 2 }}
        onClick={() => setUseLoyaltyPoint(!useLoyaltyPoint)}
      >
        {useLoyaltyPoint ? "Bỏ dùng LoyaltyPoint" : "Dùng LoyaltyPoint"}
      </Button>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#4CAF50", color: "#fff" }}
        onClick={handleOpenPaymentConfirmation}
      >
        Cash
      </Button>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#2196F3", color: "#fff" }}
        onClick={() => { handleOpenPaymentConfirmation(); handleBankTransfer(); }}

      >
        Bank Transfer
      </Button>
    </Box>
  );

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

    return null;
  };

  return (
    <Box sx={{ padding: 4, backgroundColor: "#fff", minHeight: "100vh" }}>
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
            sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
          >
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "#4CAF50",
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
                      <TableCell>{`${appointment.totalPrice} USD`}</TableCell>
                      <TableCell>
                        {appointment.serviceName.join(", ")}
                      </TableCell>
                      <TableCell>
                        {renderStatusChip(appointment.status)}
                      </TableCell>

                      <TableCell>
                        {!["Cancelled", "Completed"].includes(
                          appointment.status
                        ) ? (
                          <Button
                            variant="contained"
                            color="primary"
                            sx={{ backgroundColor: "#4CAF50" }}
                            onClick={() => handleOpenModal(appointment)}
                          >
                            {appointment.status === "Processing"
                              ? "Thanh toán"
                              : "Edit"}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            disabled
                            sx={{ backgroundColor: "#9E9E9E" }}
                          >
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

      {/* Modal chỉnh sửa trạng thái hoặc thanh toán */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <IconButton
            onClick={handleCloseModal}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          {selectedAppointment?.status === "Processing" ? (
            renderPaymentModal()
          ) : (
            <>
              <Typography
                variant="h5"
                fontWeight="bold"
                sx={{ mb: 2, color: "#4CAF50" }}
              >
                Edit Appointment Status
              </Typography>
              {renderStatusButtons()}
            </>
          )}
        </Box>
      </Modal>

      <Modal
        open={openPaymentConfirmation}
        onClose={handleClosePaymentConfirmation}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            Xác nhận thanh toán
          </Typography>

          {/* Hiển thị tổng tiền sau khi trừ LoyaltyPoint */}
          <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
            Tổng tiền: {totalAfterDiscount} USD
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#4CAF50", color: "#fff" }}
              onClick={handleConfirmCashPayment}
            >
              Xác nhận
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#F44336", color: "#fff" }}
              onClick={handleClosePaymentConfirmation}
            >
              Hủy
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Snackbar thông báo thành công */}
      <Snackbar
        open={showSuccessSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSuccessSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={() => setShowSuccessSnackbar(false)} severity="success">
          Thanh toán thành công!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default StaffAppointments;
