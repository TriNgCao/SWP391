import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
} from "@mui/material";
import { format } from "date-fns";

const API_URL = "http://localhost:8080/api/payroll/salon/manager";

const ManagerPayroll = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPayrollId, setSelectedPayrollId] = useState(null);

  useEffect(() => {
    fetchPayrollData();
  }, []);

  const fetchPayrollData = async () => {
    try {
      const response = await axios.get(API_URL);
      setPayrollData(response.data);
    } catch (error) {
      console.error("Error fetching payroll data:", error);
    }
  };

  const updateStatus = async (payrollId) => {
    try {
      await axios.put(`http://localhost:8080/api/payroll/${payrollId}/true`);
      fetchPayrollData();
      toast.success("Paid Successfully!")
      closeModal();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleOpenModal = (payrollId) => {
    setSelectedPayrollId(payrollId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedPayrollId(null);
  };
  const styles = {
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "400px",
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      zIndex: 1001,
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      textAlign: "center",
    },
    confirmButton: {
      backgroundColor: "#4caf50",
      color: "white",
      minWidth: "80px",
    },
    cancelButton: {
      backgroundColor: "gray",
      color: "white",
      marginRight: "10px",
    },
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
        Payments Details
      </Typography>

      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#f5f5f5", borderRadius: "8px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4caf50", color: "#fff" }}>
              <TableCell sx={{ color: "#fff" }}>No</TableCell>
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Phone</TableCell>
              <TableCell sx={{ color: "#fff" }}>Role</TableCell>
              <TableCell sx={{ color: "#fff" }}>Date</TableCell>
              <TableCell sx={{ color: "#fff" }}>Earnings</TableCell>
              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payrollData.length > 0 ? (
              payrollData.map((row, index) => (
                <TableRow key={row.payrollId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.role === 2 ? "Stylist" : "Other"}</TableCell>
                  <TableCell>
                    {format(new Date(row.payrollDate), "yyyy-MM-dd")}
                  </TableCell>
                  <TableCell>{row.earning.toLocaleString()} VNĐ</TableCell>
                  <TableCell
                    sx={{
                      color: row.status ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {row.status ? "Paid" : "Not Yet"}
                  </TableCell>

                  <TableCell>
                    {/* Show button only if status is "Not Yet" */}
                    {!row.status && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleOpenModal(row.payrollId)}
                        sx={{ minWidth: "100px" }}
                      >
                        Set Paid
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  No data found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Modal */}
      <Modal open={modalOpen} onClose={closeModal}>
        <Box sx={styles.modal}>
          <Typography variant="h6" component="h2" gutterBottom>
            Are you sure you want to set this payroll as paid?
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2}> 
            <Button
              variant="outlined"
              sx={styles.cancelButton}
              onClick={closeModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={styles.confirmButton}
              onClick={() => updateStatus(selectedPayrollId)}
              style={{ marginLeft: '10px' }}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManagerPayroll;
