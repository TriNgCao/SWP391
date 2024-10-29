import React, { useEffect, useState } from "react";
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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Pagination,
  TextField,
  Modal,
} from "@mui/material";

const AdminPersonnel = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [salons, setSalons] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;
  const [selectedEmployee, setSelectedEmployee] = useState(null); // For editing

  const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState({
    id: "",
    name: ""
  });

  // State cho modal thêm nhân viên
  const [open, setOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: ""
  });


  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeResponse = await axios.get("http://localhost:8080/user/fetchAllEmployees");
        setEmployees(employeeResponse.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    const fetchSalons = async () => {
      try {
        const salonResponse = await axios.get("http://localhost:8080/salon/salon-active");
        setSalons(salonResponse.data);
      } catch (error) {
        console.error("Error fetching salon data:", error);
      }
    };

    fetchEmployees();
    fetchSalons();
  }, []);

  const addEmployee = async () => {
    try {
      // Gửi yêu cầu thêm nhân viên đến API Salon

      // const salonResponse = await axios.post("http://localhost:8080/user/insert/${selectedId}");
      const salonResponse = await axios.post(`http://localhost:8080/user/insert/${selectedId}`, newEmployee);

      if (salonResponse.status === 201) {
        // Sau khi thêm thành công vào Salon, lấy lại danh sách nhân viên từ API Employee
        const employeeResponse = await axios.get("http://localhost:8080/user/fetchAllEmployees");
        setEmployees(employeeResponse.data);
        handleClose();
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const updateEmployee = async () => {
    try {

      const response = await axios.put(`http://localhost:8080/user/update-status/${newEmployee.id}`, null, {
        params: {
          status: newEmployee.status
        }
      });
      if (response.status === 200) {
        const employeeResponse = await axios.get("http://localhost:8080/user/fetchAllEmployees");
        setEmployees(employeeResponse.data);
        handleClose();
      }
    } catch (error) {
      console.error("Error updating employee:", error);
    }
  };



  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleOpenEditModal = () => setOpenEditModal(true);

  const handleClose = () => {
    setOpenAddModal(false);
    setOpenEditModal(false);
    setNewEmployee({
      id: "",
      name: "",
      email: "",
      password: "",
      role: "",
      status: "Active",
      salonId: "",
    });
  };

  const totalPages = Math.ceil(
    employees.filter(
      (employee) =>
        (statusFilter === "All" || employee.status === (statusFilter === "true")) &&
        (roleFilter === "All" || employee.role.toString() === roleFilter)
    ).length / employeesPerPage
  );

  const paginatedEmployees = employees
    .filter(
      (employee) =>
        (statusFilter === "All" || employee.status === (statusFilter === "true")) &&
        (roleFilter === "All" || employee.role.toString() === roleFilter)
    )
    .slice(
      (currentPage - 1) * employeesPerPage,
      currentPage * employeesPerPage
    );

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
        Manage Personnel Account
      </Typography>

      {/* Filter Section */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="2">Stylist</MenuItem>
              <MenuItem value="3">Staff</MenuItem>
              <MenuItem value="4">Manager</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Add Employee Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddModal}
          sx={{ backgroundColor: "#4CAF50" }}
        >
          Create Personnel Account
        </Button>
      </Box>

      {/* Employees Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#4caf50", color: "#fff" }}>
              <TableCell sx={{ color: "#fff" }}>No</TableCell>
              {/* <TableCell sx={{ color: "#fff" }}>ID</TableCell> */}
              <TableCell sx={{ color: "#fff" }}>Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Email</TableCell>
              <TableCell sx={{ color: "#fff" }}>Role</TableCell>

              <TableCell sx={{ color: "#fff" }}>Status</TableCell>
              <TableCell sx={{ color: "#fff" }}>Salon</TableCell>
              <TableCell sx={{ color: "#fff" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEmployees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell>
                  {(currentPage - 1) * employeesPerPage + index + 1}
                </TableCell>
                {/* <TableCell>{employee.id}</TableCell> */}
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>
                  {employee.role === 2
                    ? "Stylist"
                    : employee.role === 3
                      ? "Staff"
                      : employee.role === 4
                        ? "Manager"
                        : "Unknown"}
                </TableCell>
                <TableCell
                  sx={{
                    color: employee.status ? "#4CAF50" : "#F44336",
                  }}
                >
                  {employee.status ? "Active" : "Inactive"}
                </TableCell>
                <TableCell>{employee.salonName}</TableCell>
                <TableCell>
                  {employee.status ? (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "#F44336" }}  // Nút Disable có màu đỏ
                      onClick={() => {
                        setNewEmployee({
                          id: employee.id,
                          status: false  // Cập nhật trạng thái thành false khi disable
                        });
                        handleOpenEditModal();  // Mở modal xác nhận
                      }}
                    >
                      Disable
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ backgroundColor: "#4CAF50" }}  // Nút Active có màu xanh
                      onClick={() => {
                        setNewEmployee({
                          id: employee.id,
                          status: true  // Cập nhật trạng thái thành true khi active
                        });
                        handleOpenEditModal();  // Mở modal xác nhận
                      }}
                    >
                      Active
                    </Button>
                  )}
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage
            (value)}
          color="primary"
        />
      </Box>


      {/* Modal for Adding Employee */}
      <Modal open={openAddModal} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: 1,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" mb={2}>
            Add New Employee
          </Typography>
          {/* <TextField
            label="ID"
            fullWidth
            value={newEmployee.id}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, id: e.target.value })
            }
            sx={{ mb: 2 }}
          /> */}
          <TextField
            label="Name"
            fullWidth
            value={newEmployee.name}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, name: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Email"
            fullWidth
            value={newEmployee.email}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, email: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            value={newEmployee.password}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, password: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={newEmployee.role}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, role: e.target.value })
              }
            >
              <MenuItem value="2">Stylist</MenuItem>
              <MenuItem value="3">Staff</MenuItem>
              <MenuItem value="4">Manager</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Salon</InputLabel>
            <Select
              value={selectedId || ''}
              onChange={(e) => {
                const id = e.target.value; // Lấy id của salon đã chọn
                const selectedSalon = salons.find((salon) => salon.id === id); // Tìm salon trong danh sách
                setSelected({ ...selectedSalon }); // Cập nhật selected với salon đã chọn
                setSelectedId(id); // Lưu selectedId là biến toàn cục
                setSelected({ ...selected, name: e.target.value })


                // const selectedSalon = salons.find((salon) => salon.id === selectedId);
                // setSelected(selected);
              }
              }
            >
              {salons.map((salon) => (
                <MenuItem key={salon.id} value={salon.id}>
                  {salon.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ color: "#F44336", borderColor: "#F44336" }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={addEmployee}
            >
              Add Employee
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={handleClose}>
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, bgcolor: "background.paper", borderRadius: 1, boxShadow: 24, p: 4 }}>
          <Typography variant="h6" mb={2}>
            {newEmployee.status ? "Are you sure to activate this account?" : "Are you sure to disable this account?"}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ color: "#F44336", borderColor: "#F44336" }}
            >
              No
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: "#4CAF50" }}
              onClick={updateEmployee}
            >
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminPersonnel;
