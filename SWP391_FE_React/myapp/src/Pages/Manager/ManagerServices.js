import React, { useEffect, useState } from "react";
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
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ManagerServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [category, setCategory] = useState("");
  const [serviceId, setServiceId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState("");
  const [creating, setCreating] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setServiceName("");
    setServiceDescription("");
    setServicePrice("");
    setMaxTime("");
    setCategory("");
    setServiceId(null);
    setSelectedImage(null);
    setCurrentImageUrl("");
    setEditing(false);
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/services/fetchAll"
      );
      const updatedServices = response.data.map((service) => ({
        ...service,
        imageUrl: `http://localhost:8080/services/image/${encodeURIComponent(
          service.imageName
        )}`,
      }));
      setServices(updatedServices);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreateService = async () => {
    setCreating(true);
    try {
      const response = await axios.post("http://localhost:8080/services/add", {
        serviceName,
        serviceDescription,
        servicePrice: parseFloat(servicePrice),
        maxTime: parseInt(maxTime),
        category,
      });
      setServiceId(response.data.serviceId);
      setCreating(false);
      fetchServices();
      handleClose();
    } catch (error) {
      console.error("Error creating service:", error);
      setCreating(false);
    }
  };

  const handleEditService = (service) => {
    setServiceId(service.serviceId);
    setServiceName(service.serviceName);
    setServiceDescription(service.serviceDescription);
    setServicePrice(service.servicePrice);
    setMaxTime(service.maxTime);
    setCategory(service.category);
    setCurrentImageUrl(service.imageUrl);
    setEditing(true);
    handleOpen();
  };

  const handleUpdateService = async () => {
    try {
      console.log("Bắt đầu cập nhật dịch vụ...");

      // Cập nhật thông tin dịch vụ
      const updateResponse = await axios.put(
        `http://localhost:8080/services/${serviceId}`,
        {
          serviceName: serviceName,
          serviceDescription: serviceDescription,
          servicePrice: servicePrice,
          maxTime: maxTime,
          category,
        }
      );
      console.log("Kết quả cập nhật dịch vụ:", updateResponse);

      // Tải lên ảnh nếu có ảnh mới
      if (selectedImage) {
        console.log("Bắt đầu tải lên ảnh...");
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadResponse = await axios.post(
          `http://localhost:8080/services/image/upload/${serviceId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      alert("Service updated successfully");
      fetchServices(); // Cập nhật lại danh sách dịch vụ
      handleClose(); // Đóng modal
    } catch (error) {
      // Thêm log chi tiết lỗi
      if (error.response) {
        console.error("Error response data:", error.response.data);
        console.error("Error response status:", error.response.status);
        alert(`Failed to update service: ${error.response.data}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        alert("Failed to update service: No response from server.");
      } else {
        console.error("Error message:", error.message);
        alert(`Failed to update service: ${error.message}`);
      }
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
    setCurrentImageUrl(""); // Reset URL ảnh hiện có khi chọn ảnh mới
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
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, color: "#4CAF50" }}>
        Services
      </Typography>

      <Button
        variant="contained"
        sx={{ backgroundColor: "#4CAF50", color: "#fff" }}
        onClick={handleOpen}
      >
        Add Service
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 400,
            margin: "auto",
            marginTop: "10%",
            backgroundColor: "#fff",
            padding: 4,
            maxHeight: "65vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            {editing ? "Edit Service" : "Add New Service"}
          </Typography>
          <TextField
            fullWidth
            label="Service Name"
            value={serviceName}
            onChange={(e) => setServiceName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Description"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Price"
            value={servicePrice}
            onChange={(e) => setServicePrice(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Max Time (hours)"
            value={maxTime}
            onChange={(e) => setMaxTime(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
            >
              <MenuItem value="Hair Styling">Hair Styling</MenuItem>
              <MenuItem value="Hair Coloring">Hair Coloring</MenuItem>
              <MenuItem value="Hair Treatment">Hair Treatment</MenuItem>
              <MenuItem value="Spa Skin Treatment">Spa Skin Treatment</MenuItem>
            </Select>
          </FormControl>

          {currentImageUrl && !selectedImage && (
            <Box sx={{ mt: 2 }}>
              <Typography>Current Image:</Typography>
              <img
                src={currentImageUrl}
                alt={serviceName}
                style={{ width: "100%", height: "auto", marginTop: 8 }}
              />
            </Box>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={editing ? handleUpdateService : handleCreateService}
            sx={{ mt: 2 }}
          >
            {editing ? "Update" : creating ? <CircularProgress size={24} /> : "Next"}
          </Button>

          {serviceId && (
            <>
              <Typography sx={{ mt: 2 }}>Upload Image:</Typography>
              <input type="file" onChange={handleImageChange} />
            </>
          )}
        </Box>
      </Modal>

      {loading ? (
        <Typography variant="h6">Loading...</Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: "#f5f5f5", mt: 4 }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#4CAF50" }}>
                <TableCell sx={{ color: "#fff" }}>ID</TableCell>
                <TableCell sx={{ color: "#fff" }}>Image</TableCell>
                <TableCell sx={{ color: "#fff" }}>Name</TableCell>
                <TableCell sx={{ color: "#fff" }}>Description</TableCell>
                <TableCell sx={{ color: "#fff" }}>Category</TableCell>
                <TableCell sx={{ color: "#fff" }}>Price</TableCell>
                <TableCell sx={{ color: "#fff" }}>Max Time</TableCell>
                <TableCell sx={{ color: "#fff" }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.serviceId}>
                  <TableCell>{service.serviceId}</TableCell>
                  <TableCell>
                    {service.imageUrl ? (
                      <img
                        src={service.imageUrl}
                        alt={service.serviceName}
                        style={{ width: "50px", height: "50px" }}
                      />
                    ) : (
                      "Loading..."
                    )}
                  </TableCell>
                  <TableCell>{service.serviceName}</TableCell>
                  <TableCell>{service.serviceDescription}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>{service.servicePrice}</TableCell>
                  <TableCell>{service.maxTime} hours</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "#4CAF50" }}
                      onClick={() => handleEditService(service)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ManagerServices;
