// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Modal,
// } from "@mui/material";

// export default function StylistSchedule() {
//   // Lịch làm việc do Manager sắp xếp
//   const scheduleData = [
//     {
//       date: "2024-10-30",
//       appointments: [
//         { customer: "Nguyễn Văn A", startTime: "09:00", endTime: "10:00" },
//         { customer: "Trần Thị B", startTime: "11:00", endTime: "12:00" },
//       ],
//     },
//     {
//       date: "2024-10-31",
//       appointments: [
//         { customer: "Lê Văn C", startTime: "14:00", endTime: "15:00" },
//         { customer: "Phạm Thị D", startTime: "15:30", endTime: "16:30" },
//       ],
//     },
//     {
//       date: "2024-11-01",
//       appointments: [
//         { customer: "Nguyễn Thị E", startTime: "09:00", endTime: "10:00" },
//       ],
//     },
//   ];

//   const [selectedDate, setSelectedDate] = useState("");
//   const [appointments, setAppointments] = useState([]);
//   const [open, setOpen] = useState(false);

//   // Chọn lịch để hiển thị chi tiết trong popup
//   const handleSelectDate = (date) => {
//     const selectedSchedule = scheduleData.find((item) => item.date === date);
//     setSelectedDate(date);
//     setAppointments(selectedSchedule ? selectedSchedule.appointments : []);
//     setOpen(true); // Mở popup
//   };

//   // Đóng popup
//   const handleClose = () => {
//     setOpen(false);
//     setSelectedDate("");
//     setAppointments([]);
//   };

//   return (
//     <Box
//       sx={{
//         padding: 4,
//         backgroundColor: "#f9f9f9",
//         minHeight: "100vh",
//       }}
//     >
//       <Typography
//         variant="h4"
//         fontWeight="bold"
//         sx={{ mb: 3, textAlign: "center", color: "#4CAF50" }}
//       >
//         Stylist Schedule
//       </Typography>

//       {/* Bảng lịch làm việc */}
//       <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
//         <TableContainer
//           component={Paper}
//           sx={{ width: "80%", maxWidth: "800px" }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow sx={{ backgroundColor: "#4CAF50" }}>
//                 <TableCell
//                   sx={{ color: "#fff", textAlign: "center", width: "50%" }}
//                 >
//                   <strong>Date</strong>
//                 </TableCell>
//                 <TableCell
//                   sx={{ color: "#fff", textAlign: "center", width: "50%" }}
//                 >
//                   <strong>View Appointments</strong>
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {scheduleData.map((item, index) => (
//                 <TableRow key={index}>
//                   <TableCell sx={{ textAlign: "center" }}>
//                     {item.date}
//                   </TableCell>
//                   <TableCell sx={{ textAlign: "center" }}>
//                     <Button
//                       variant="contained"
//                       onClick={() => handleSelectDate(item.date)}
//                       sx={{
//                         backgroundColor: "#4CAF50",
//                         color: "white",
//                         "&:hover": {
//                           backgroundColor: "#388E3C",
//                         },
//                       }}
//                     >
//                       View
//                     </Button>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Box>

//       {/* Modal hiển thị chi tiết các cuộc hẹn */}
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="appointment-details-title"
//         aria-describedby="appointment-details-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "white",
//             borderRadius: 2,
//             boxShadow: 24,
//             p: 4,
//           }}
//         >
//           <Typography
//             id="appointment-details-title"
//             variant="h5"
//             fontWeight="bold"
//             sx={{ mb: 2, textAlign: "center", color: "#4CAF50" }}
//           >
//             Appointments on {selectedDate}
//           </Typography>

//           <TableContainer component={Paper}>
//             <Table>
//               <TableHead>
//                 <TableRow sx={{ backgroundColor: "#4CAF50" }}>
//                   <TableCell sx={{ color: "#fff" }}>
//                     <strong>Customer</strong>
//                   </TableCell>
//                   <TableCell sx={{ color: "#fff" }}>
//                     <strong>Start Time</strong>
//                   </TableCell>
//                   <TableCell sx={{ color: "#fff" }}>
//                     <strong>End Time</strong>
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {appointments.map((appointment, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{appointment.customer}</TableCell>
//                     <TableCell>{appointment.startTime}</TableCell>
//                     <TableCell>{appointment.endTime}</TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <Box sx={{ textAlign: "center", mt: 2 }}>
//             <Button
//               variant="contained"
//               onClick={handleClose}
//               sx={{
//                 backgroundColor: "#4CAF50",
//                 color: "white",
//                 "&:hover": {
//                   backgroundColor: "#388E3C",
//                 },
//               }}
//             >
//               Close
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Box>
//   );
// }
import React, { useState } from "react";
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

export default function StylistSchedule() {
  // Dữ liệu mẫu cho lịch làm việc do Manager sắp xếp
  const scheduleData = [
    {
      date: "2024-10-30",
      appointments: [
        { customer: "Nguyễn Văn A", startTime: "09:00", endTime: "10:00" },
        { customer: "Trần Thị B", startTime: "11:00", endTime: "12:00" },
      ],
    },
    {
      date: "2024-10-31",
      appointments: [
        { customer: "Lê Văn C", startTime: "14:00", endTime: "15:00" },
        { customer: "Phạm Thị D", startTime: "15:30", endTime: "16:30" },
      ],
    },
    {
      date: "2024-11-01",
      appointments: [
        { customer: "Nguyễn Thị E", startTime: "09:00", endTime: "10:00" },
      ],
    },
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);

  // Chọn lịch để hiển thị chi tiết trong modal
  const handleSelectDate = (date) => {
    const selectedSchedule = scheduleData.find((item) => item.date === date);
    if (selectedSchedule) {
      setSelectedDate(date);
      setAppointments(selectedSchedule.appointments);
      setOpen(true); // Mở modal
    }
  };

  // Đóng modal
  const handleClose = () => {
    setOpen(false);
    setSelectedDate("");
    setAppointments([]);
  };

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

      {/* Bảng lịch làm việc */}
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
              {scheduleData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {item.date}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={() => handleSelectDate(item.date)}
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Modal hiển thị chi tiết các cuộc hẹn */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="appointment-details-title"
        aria-describedby="appointment-details-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="appointment-details-title"
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
                      <strong>Customer</strong>
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      <strong>Start Time</strong>
                    </TableCell>
                    <TableCell sx={{ color: "#fff" }}>
                      <strong>End Time</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments.map((appointment, index) => (
                    <TableRow key={index}>
                      <TableCell>{appointment.customer}</TableCell>
                      <TableCell>{appointment.startTime}</TableCell>
                      <TableCell>{appointment.endTime}</TableCell>
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
