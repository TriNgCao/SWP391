// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   Box,
//   Grid,
//   Paper,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Pagination,
//   TextField,
//   Modal,
// } from "@mui/material";

// const AdminPersonnel = () => {
//   const [employees, setEmployees] = useState([]);
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [typeFilter, setTypeFilter] = useState("All");
//   const [currentPage, setCurrentPage] = useState(1);
//   const employeesPerPage = 5;

//   // State cho modal thêm nhân viên
//   const [open, setOpen] = useState(false);
//   const [newEmployee, setNewEmployee] = useState({
//     name: "",
//     role: "",
//     salary: "",
//     status: "Active",
//   });

//   useEffect(() => {
//     const fetchEmployees = async () => {
//       try {
//         const response = await axios.get("YOUR_API_URL");
//         setEmployees(response.data);
//       } catch (error) {
//         console.error("Error fetching employee data:", error);
//       }
//     };

//     fetchEmployees();
//   }, []);

//   const addEmployee = async () => {
//     try {
//       const response = await axios.post("YOUR_API_URL", newEmployee);
//       setEmployees([...employees, response.data]);
//       handleClose();
//     } catch (error) {
//       console.error("Error adding employee:", error);
//     }
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setNewEmployee({ name: "", role: "", salary: "", status: "Active" });
//   };

//   const totalPages = Math.ceil(
//     employees.filter(
//       (employee) =>
//         (statusFilter === "All" || employee.status === statusFilter) &&
//         (typeFilter === "All" || employee.role === typeFilter)
//     ).length / employeesPerPage
//   );

//   const paginatedEmployees = employees
//     .filter(
//       (employee) =>
//         (statusFilter === "All" || employee.status === statusFilter) &&
//         (typeFilter === "All" || employee.role === typeFilter)
//     )
//     .slice(
//       (currentPage - 1) * employeesPerPage,
//       currentPage * employeesPerPage
//     );

//   return (
//     <Box
//       sx={{
//         padding: 4,
//         backgroundColor: "#fff",
//         minHeight: "100vh",
//         color: "#333",
//       }}
//     >
//       <Typography variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
//         Manage Personnel Account
//       </Typography>

//       {/* Filter Section */}
//       <Grid container spacing={2} sx={{ mb: 2 }}>
//         <Grid item xs={12} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Status</InputLabel>
//             <Select
//               value={statusFilter}
//               onChange={(e) => setStatusFilter(e.target.value)}
//             >
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="Active">Active</MenuItem>
//               <MenuItem value="Inactive">Inactive</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Role</InputLabel>
//             <Select
//               value={typeFilter}
//               onChange={(e) => setTypeFilter(e.target.value)}
//             >
//               <MenuItem value="All">All</MenuItem>
//               <MenuItem value="Stylist">Stylist</MenuItem>
//               <MenuItem value="Manager">Manager</MenuItem>
//               <MenuItem value="Staff">Staff</MenuItem>
//             </Select>
//           </FormControl>
//         </Grid>
//       </Grid>

//       {/* Add Employee Button */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleOpen}
//           sx={{ backgroundColor: "#4CAF50" }}
//         >
//           Create Personnel Account
//         </Button>
//       </Box>

//       {/* Employees Table */}
//       <TableContainer component={Paper} sx={{ backgroundColor: "#f5f5f5" }}>
//         <Table>
//           <TableHead>
//             <TableRow sx={{ backgroundColor: "#4caf50", color: "#fff" }}>
//               <TableCell sx={{ color: "#fff" }}>No</TableCell>{" "}
//               <TableCell sx={{ color: "#fff" }}>ID</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Name</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Role</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Email</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Status</TableCell>
//               <TableCell sx={{ color: "#fff" }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedEmployees.map((employee, index) => (
//               <TableRow key={employee.id}>
//                 <TableCell>
//                   {(currentPage - 1) * employeesPerPage + index + 1}
//                 </TableCell>{" "}
//                 {/* Tính số thứ tự */}
//                 <TableCell>{employee.id}</TableCell>
//                 <TableCell>{employee.name}</TableCell>
//                 <TableCell>{employee.email}</TableCell>
//                 <TableCell>{employee.role}</TableCell>
//                 <TableCell
//                   sx={{
//                     color: employee.status ? "#4CAF50" : "#F44336",
//                   }}
//                 >
//                   {employee.status ? "Active" : "Inactive"}
//                 </TableCell>
//                 <TableCell>
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     sx={{ backgroundColor: "#4CAF50" }}
//                   >
//                     Edit
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Pagination */}
//       <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
//         <Pagination
//           count={totalPages}
//           page={currentPage}
//           onChange={(event, value) => setCurrentPage(value)}
//           color="primary"
//         />
//       </Box>

//       {/* Modal for Adding Employee */}
//       <Modal open={open} onClose={handleClose}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             borderRadius: 1,
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography variant="h6" mb={2}>
//             Add New Employee
//           </Typography>
//           <TextField
//             label="Name"
//             fullWidth
//             value={newEmployee.name}
//             onChange={(e) =>
//               setNewEmployee({ ...newEmployee, name: e.target.value })
//             }
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Role"
//             fullWidth
//             value={newEmployee.role}
//             onChange={(e) =>
//               setNewEmployee({ ...newEmployee, role: e.target.value })
//             }
//             sx={{ mb: 2 }}
//           />
//           <TextField
//             label="Salary"
//             fullWidth
//             type="number"
//             value={newEmployee.salary}
//             onChange={(e) =>
//               setNewEmployee({ ...newEmployee, salary: e.target.value })
//             }
//             sx={{ mb: 2 }}
//           />
//           <FormControl fullWidth sx={{ mb: 2 }}>
//             <InputLabel>Status</InputLabel>
//             <Select
//               value={newEmployee.status}
//               onChange={(e) =>
//                 setNewEmployee({ ...newEmployee, status: e.target.value })
//               }
//             >
//               <MenuItem value="Active">Active</MenuItem>
//               <MenuItem value="Inactive">Inactive</MenuItem>
//             </Select>
//           </FormControl>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={addEmployee}
//             sx={{ backgroundColor: "#4CAF50" }}
//           >
//             Add
//           </Button>
//         </Box>
//       </Modal>
//     </Box>
//   );
// };

// export default AdminPersonnel;
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
  const [employees, setEmployees] = useState([]);
  const [salons, setSalons] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 5;

  // State cho modal thêm nhân viên
  const [open, setOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    role: "",
    status: "Active",
    salonId: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const employeeResponse = await axios.get("EMPLOYEE_API_URL");
        setEmployees(employeeResponse.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    const fetchSalons = async () => {
      try {
        const salonResponse = await axios.get("SALON_API_URL");
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
      const salonResponse = await axios.post("SALON_API_URL", newEmployee);
      if (salonResponse.status === 201) {
        // Sau khi thêm thành công vào Salon, lấy lại danh sách nhân viên từ API Employee
        const employeeResponse = await axios.get("EMPLOYEE_API_URL");
        setEmployees(employeeResponse.data);
        handleClose();
      }
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
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
        (statusFilter === "All" || employee.status === statusFilter) &&
        (roleFilter === "All" || employee.role === roleFilter)
    ).length / employeesPerPage
  );

  const paginatedEmployees = employees
    .filter(
      (employee) =>
        (statusFilter === "All" || employee.status === statusFilter) &&
        (roleFilter === "All" || employee.role === roleFilter)
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
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
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
              <MenuItem value="Stylist">Stylist</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Add Employee Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
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
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
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
                <TableCell>{employee.id}</TableCell>
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
                    color: employee.status === "Active" ? "#4CAF50" : "#F44336",
                  }}
                >
                  {employee.status}
                </TableCell>
                <TableCell>{employee.salonName}</TableCell>
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
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>

      {/* Modal for Adding Employee */}
      <Modal open={open} onClose={handleClose}>
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
          <TextField
            label="ID"
            fullWidth
            value={newEmployee.id}
            onChange={(e) =>
              setNewEmployee({ ...newEmployee, id: e.target.value })
            }
            sx={{ mb: 2 }}
          />
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
              <MenuItem value="Stylist">Stylist</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
              <MenuItem value="Manager">Manager</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Salon</InputLabel>
            <Select
              value={newEmployee.salonId}
              onChange={(e) =>
                setNewEmployee({ ...newEmployee, salonId: e.target.value })
              }
            >
              {salons.map((salon) => (
                <MenuItem key={salon.id} value={salon.id}>
                  {salon.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={addEmployee}
          >
            Add Employee
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminPersonnel;
