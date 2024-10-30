import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Modal,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Stack,
  InputLabel,
} from "@mui/material";

const ManagerSalon = () => {
  const [openModal, setOpenModal] = useState(false);
  const [salonList, setSalonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    salonId: "",
    salonName: "",
    salonAddress: "",
    salonStatus: "Active",
  });

  useEffect(() => {
    fetchSalonData();
  }, []);

  const fetchSalonData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/salon/salons");
      setSalonList(response.data);
    } catch (err) {
      setError("Error fetching salon data");
    } finally {
      setLoading(false);
    }
  };

  // Modal handlers
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    resetFormData();
  };

  // Reset form data
  const resetFormData = () => {
    setFormData({
      salonId: "",
      salonName: "",
      salonAddress: "",
      salonStatus: "Inactive",
    });
  };

  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/salon/create", formData);
      fetchSalonData(); // Làm mới danh sách salon
      handleCloseModal();
    } catch (err) {
      // Ghi lại toàn bộ lỗi để kiểm tra
      console.error(err);

      // Kiểm tra xem lỗi có phản hồi và trích xuất thông điệp
      const errorMessage = err.response && err.response.data
        ? (typeof err.response.data === 'string' ? err.response.data : JSON.stringify(err.response.data))
        : err.message;

      setError(`Lỗi khi thêm salon mới: ${errorMessage}`);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4, backgroundColor: "#fff", minHeight: "100vh", color: "#333" }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Salon Management
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Managing the Salon
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#4CAF50" }}
          onClick={handleOpenModal}
        >
          Add Salon
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#4caf50", color: "#fff" }}>
                    <TableCell sx={{ color: "#fff" }}>Salon ID</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Salon Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Address</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salonList.map((salon) => (
                    <TableRow key={salon.salonId}>
                      <TableCell>{salon.salonId}</TableCell>
                      <TableCell>{salon.salonName}</TableCell>
                      <TableCell>{salon.salonAddress}</TableCell>
                      <TableCell sx={{ color: salon.salonStatus ? "#4CAF50" : "#F44336" }}>
                        {salon.salonStatus ? "Active" : "Inactive"}
                      </TableCell>

                      <TableCell>
                        <Button variant="contained" color="primary" sx={{ backgroundColor: "#4CAF50" }}>
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      {/* Add Salon Modal */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="add-salon-modal"
        aria-describedby="modal-to-add-new-salon"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 3 }}>
            Add New Salon
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Salon ID"
                name="salonId"
                value={formData.salonId}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Salon Name"
                name="salonName"
                value={formData.salonName}
                onChange={handleChange}
                required
              />
              <TextField
                fullWidth
                label="Address"
                name="salonAddress"
                value={formData.salonAddress}
                onChange={handleChange}
                required
              />
              <FormControl fullWidth>
                <Select
                  name="salonStatus"


                  value={formData.salonStatus}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="true" >Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={{ color: "#F44336", borderColor: "#F44336" }}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="contained" sx={{ bgcolor: "#4CAF50" }}>
                  Add Salon
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ManagerSalon;
