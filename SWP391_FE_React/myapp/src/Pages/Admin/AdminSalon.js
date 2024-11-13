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
  Stack
} from "@mui/material";

const AdminSalon = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [salonList, setSalonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(""); // URL của ảnh hiện tại
  const [formData, setFormData] = useState({
    salonId: "",
    salonName: "",
    salonAddress: "",
    salonStatus: "true",
  });

  useEffect(() => {
    fetchSalonData();
  }, []);

  const fetchSalonData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/salon/salons");
      const updatedSalons = response.data.map((salon) => ({
        ...salon,
        imageUrl: `http://localhost:8080/salon/image/${encodeURIComponent(salon.imageName)}`,
      }));
      setSalonList(updatedSalons);
    } catch (err) {
      setError("Error fetching salon data");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setFormData({
      salonId: "",
      salonName: "",
      salonAddress: "",
      salonStatus: "true",
    });
    setSelectedImage(null);
    setCurrentImageUrl("");
    setOpenAddModal(true);
  };

  const handleOpenEditModal = (salon) => {
    setFormData({
      salonId: salon.id,
      salonName: salon.name,
      salonAddress: salon.address,
      salonStatus: salon.active ? "true" : "false",
    });
    setSelectedImage(null);
    setCurrentImageUrl(salon.imageUrl);
    setOpenEditModal(true);
  };

  const handleCloseModal = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setSelectedImage(null);
    setCurrentImageUrl("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setCurrentImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.salonId) {
        // Cập nhật thông tin salon
        await axios.put(`http://localhost:8080/salon/update/${formData.salonId}`, {
          salonName: formData.salonName,
          salonAddress: formData.salonAddress,
          salonStatus: formData.salonStatus === "true",
        });

        // Upload ảnh nếu có ảnh mới
        if (selectedImage) {
          const formDataUpload = new FormData();
          formDataUpload.append("image", selectedImage);
          console.log(formData.salonId)
          const uploadResponse = await axios.post(
            `http://localhost:8080/salon/image/upload/${formData.salonId}`,
            formDataUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log(uploadResponse);
        }

      } else {
        // Thêm salon mới
        const createResponse = await axios.post("http://localhost:8080/salon/create", {
          salonName: formData.salonName,
          salonAddress: formData.salonAddress,
          salonStatus: formData.salonStatus === "true",
        });

        // Upload ảnh nếu có
        if (selectedImage) {
          const formDataUpload = new FormData();
          formDataUpload.append("image", selectedImage);

          await axios.post(
            `http://localhost:8080/salon/image/upload/${createResponse.data.salonId}`,
            formDataUpload,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
      }

      fetchSalonData();
      handleCloseModal();
    } catch (err) {
      console.error("Error saving salon:", err);
      setError("Failed to save salon.");
    }
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
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Salon Management
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ backgroundColor: "#4CAF50" }}
          onClick={handleOpenAddModal}
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
                    <TableCell sx={{ color: "#fff" }}>No</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Salon Name</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Address</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Status</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Image</TableCell>
                    <TableCell sx={{ color: "#fff" }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {salonList.map((salon, index) => (
                    <TableRow key={salon.id}>

                      <TableCell>
                        {index + 1}
                      </TableCell>
                      <TableCell>{salon.name}</TableCell>
                      <TableCell>{salon.address}</TableCell>
                      <TableCell sx={{ color: salon.active ? "#4CAF50" : "#F44336" }}>
                        {salon.active ? "Active" : "Inactive"}
                      </TableCell>
                      <TableCell>
                        {salon.imageUrl ? (
                          <img
                            src={salon.imageUrl}
                            alt={salon.name}
                            style={{ width: "50px", height: "50px" }}
                          />
                        ) : (
                          "No image"
                        )}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{ backgroundColor: "#4CAF50" }}
                          onClick={() => handleOpenEditModal(salon)}
                        >
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

      {/* Modal for Add/Edit Salon */}
      <Modal
        open={openAddModal || openEditModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
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
            {openEditModal ? "Edit Salon" : "Add New Salon"}
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
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
                  <MenuItem value="true">Active</MenuItem>
                  <MenuItem value="false">Inactive</MenuItem>
                </Select>
              </FormControl>

              {currentImageUrl && !selectedImage && (
                <Box sx={{ mt: 2 }}>
                  <Typography>Current Image:</Typography>
                  <img
                    src={currentImageUrl}
                    alt={formData.salonName}
                    style={{ width: "100%", height: "auto", marginTop: 8 }}
                  />
                </Box>
              )}

              <Typography>Upload Image:</Typography>
              <input type="file" onChange={handleImageChange} />

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
                  {openEditModal ? "Save changes" : "Add Salon"}
                </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminSalon;