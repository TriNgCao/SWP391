import React, { useState, useEffect } from "react";
import axios from "axios";
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
  TextField,
  FormControl,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

const ManagerSalon = () => {
  const [openModal, setOpenModal] = useState(false);
  const [salonList, setSalonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    salonName: "",
    address: "",
    status: "Active",
  });

  useEffect(() => {
    fetchSalonData();
  }, []);

  const fetchSalonData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("YOUR_API_ENDPOINT_HERE");
      setSalonList(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching salon data");
      setLoading(false);
    }
  };

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      id: "",
      salonName: "",
      address: "",
      status: "Active",
    });
  };

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
      const response = await axios.post("YOUR_API_ENDPOINT_HERE", formData);
      setSalonList((prevList) => [...prevList, response.data]);
      handleCloseModal();
    } catch (err) {
      setError("Error adding new salon");
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

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
        Salon Management
      </Typography>
      <Paper
        sx={{ padding: 2, backgroundColor: "#f5f5f5", borderRadius: "8px" }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#4caf50" }}>
                <TableCell sx={{ color: "#fff" }}>Salon ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>Salon Name</TableCell>
                <TableCell sx={{ color: "#fff" }}>Address</TableCell>
                <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                <TableCell sx={{ color: "#fff" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salonList.length > 0 ? (
                salonList.map((salon) => (
                  <TableRow key={salon.id}>
                    <TableCell>{salon.id}</TableCell>
                    <TableCell>{salon.salonName}</TableCell>
                    <TableCell>{salon.address}</TableCell>
                    <TableCell
                      sx={{
                        color:
                          salon.status === "Active" ? "#4CAF50" : "#F44336",
                      }}
                    >
                      {salon.status}
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
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography
                      variant="subtitle1"
                      sx={{ mb: 2, color: "#FF0000" }}
                    >
                      Empty Data
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "#4CAF50" }}
                      onClick={handleOpenModal}
                    >
                      Add
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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
                name="id"
                value={formData.id}
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
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <FormControl fullWidth>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="true">Active</MenuItem>
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
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#4CAF50" }}
                >
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
