import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaStar } from "react-icons/fa";

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const itemsPerPage = 10;

  const accountId = sessionStorage.getItem("userID");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/appointment/customer/${accountId}`
        );
        setAppointments(response.data);
      } catch (error) {
        toast.error("Failed to fetch appointments");
      }
    };
    fetchAppointments();
  }, [accountId]);

  useEffect(() => {
    const sortedAppointments = [...appointments].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const filtered = selectedStatus
      ? sortedAppointments.filter(
          (appointment) => appointment.status === selectedStatus
        )
      : sortedAppointments;

    setFilteredAppointments(filtered);
    setCurrentPage(1);
  }, [appointments, selectedStatus]);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  // const handleCancelAppointment = async (appointmentId) => {
  //   try {
  //     const response = await axios.put(
  //       `http://localhost:8080/api/appointment/${appointmentId}`,
  //       { status: "Cancelled" }
  //     );

  //     if (response.status === 200) {
  //       toast.success("Appointment status updated successfully");
  //     }
  //   } catch (error) {
  //     toast.error("Failed to update appointment status");
  //   }

  //   closeModal();
  // };
  const handleCancelAppointment = async (appointment) => {
    try {
      const [updateResponse, additionalResponse] = await Promise.all([
        axios.put(`http://localhost:8080/api/appointment/${appointment.id}`, {
          status: "Cancelled",
        }),
        axios.put(`http://localhost:8080/api/additional-endpoint`, {
          accountID: sessionStorage.getItem("userID"),
          date: appointment.date,
          bookedTime: appointment.startTime,
        }),
      ]);
      if (updateResponse.status === 200 && additionalResponse.status === 200) {
        toast.success("Appointment cancel successfully");
      }
    } catch (error) {
      toast.error("Failed to cancel appointment please try again");
    }

    closeModal();
  };

  const handleFeedbackSubmit = async () => {
    const { appointmentId, rating, feedback } = modalContent;

    try {
      const response = await axios.put(
        `http://localhost:8080/api/appointment/${appointmentId}`,
        { rating: rating, feedback }
      );
      if (response.status === 200) {
        toast.success("Feedback submitted successfully");
        setAppointments((prevAppointments) =>
          prevAppointments.map((a) =>
            a.appointmentId === appointmentId ? { ...a, rating, feedback } : a
          )
        );
      }
    } catch (error) {
      toast.error("Failed to submit feedback");
    }
    closeModal();
  };

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return { color: "green" };
      case "Processing":
        return { color: "blue" };
      case "Cancelled":
        return { color: "red" };
      case "Ready":
        return { color: "pink" };
      case "Pending":
        return { color: "orange" };
      default:
        return { color: "black" };
    }
  };
  return (
    <div style={styles.appointmentContainer}>
      <h1 style={styles.title}>Your Appointments</h1>
      <div style={styles.filterContainer}>
        <label style={{ marginRight: "10px" }}>Filter by Status:</label>
        <select
          onChange={handleStatusChange}
          value={selectedStatus}
          style={styles.select}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Ready">Ready</option>
          <option value="On Process">On Process</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <table style={styles.appointmentTable}>
        <thead>
          <tr>
            <th style={styles.headerCell}>No.</th>
            <th style={styles.headerCell}>Stylist Name</th>
            <th style={styles.headerCell}>Salon Name</th>
            <th style={styles.headerCell}>Date</th>
            <th style={styles.headerCell}>Services</th>
            <th style={styles.headerCell}>Total</th>
            <th style={styles.headerCell}>Status</th>
            <th style={styles.headerCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAppointments.map((appointment, index) => (
            <tr key={appointment.appointmentId}>
              <td style={styles.cell}>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </td>
              <td style={styles.cell}>{appointment.stylistName}</td>
              <td style={styles.cell}>{appointment.salonName}</td>
              <td style={styles.cell}>{appointment.date}</td>
              <td style={{ ...styles.cell, ...styles.servicesCell }}>
                {appointment.serviceName.join(", ")}
              </td>
              <td style={styles.cell}>${appointment.totalPrice}</td>
              <td
                style={{
                  ...styles.cell,
                  ...getStatusStyle(appointment.status),
                }}
              >
                {" "}
                <b>{appointment.status}</b>
              </td>
              <td style={styles.cell}>
                {appointment.status === "Pending" ||
                appointment.status === "Ready" ? (
                  <button
                    style={styles.cancelBtn}
                    onClick={() =>
                      openModal({
                        type: "cancel",
                        appointmentId: appointment.appointmentId,
                      })
                    }
                  >
                    Cancel
                  </button>
                ) : appointment.status === "Completed" ? (
                  appointment.rating > 0 ? (
                    <button
                      style={styles.feedbackBtn}
                      onClick={() =>
                        openModal({
                          type: "viewFeedback",
                          appointmentId: appointment.appointmentId,
                          rating: appointment.rating,
                          feedback: appointment.feedback,
                        })
                      }
                    >
                      View Feedback
                    </button>
                  ) : (
                    <button
                      style={styles.feedbackBtn}
                      onClick={() =>
                        openModal({
                          type: "feedback",
                          appointmentId: appointment.appointmentId,
                          rating: appointment.rating,
                          feedback: appointment.feedback,
                        })
                      }
                    >
                      Give Feedback
                    </button>
                  )
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={styles.pagination}>
        <button
          style={{
            ...styles.paginationButton,
            ...(currentPage === 1 ? styles.paginationButtonDisabled : {}),
          }}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span style={{ margin: "0 10px" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          style={{
            ...styles.paginationButton,
            ...(currentPage === totalPages
              ? styles.paginationButtonDisabled
              : {}),
          }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            {modalContent.type === "cancel" ? (
              <>
                <p style={{ fontSize: "30px" }}>
                  <b>Are you sure you want to cancel this appointment?</b>
                </p>
                <button
                  style={{ ...styles.modalButton, ...styles.confirmButton }}
                  onClick={() =>
                    handleCancelAppointment(modalContent.appointmentId)
                  }
                >
                  Yes
                </button>
                <button
                  style={{ ...styles.modalButton, ...styles.cancelButton }}
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </>
            ) : modalContent.type === "feedback" ? (
              <>
                <p style={{ fontSize: "20px" }}>
                  <b>Provide feedback and rating:</b>
                </p>
                <StarRating
                  rating={modalContent.rating}
                  onRatingChange={(rating) =>
                    setModalContent((prev) => ({ ...prev, rating }))
                  }
                />
                <textarea
                  value={modalContent.feedback || ""}
                  onChange={(e) =>
                    setModalContent((prev) => ({
                      ...prev,
                      feedback: e.target.value,
                    }))
                  }
                  style={styles.feedbackInput}
                />
                <button
                  style={{ ...styles.modalButton, ...styles.confirmButton }}
                  onClick={handleFeedbackSubmit}
                >
                  Submit
                </button>
                <button
                  style={{ ...styles.modalButton, ...styles.cancelButton }}
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            ) : modalContent.type === "viewFeedback" ? (
              <>
                <p style={{ fontSize: "20px" }}>
                  <b>Feedback and Rating:</b>
                </p>
                <StarRating
                  rating={modalContent.rating}
                  onRatingChange={(rating) =>
                    setModalContent((prev) => ({ ...prev, rating }))
                  }
                  disabled={modalContent.type === "viewFeedback"}
                />
                <textarea
                  value={modalContent.feedback || ""}
                  onChange={(e) =>
                    setModalContent((prev) => ({
                      ...prev,
                      feedback: e.target.value,
                    }))
                  }
                  style={styles.feedbackInput}
                  disabled
                />
                <button
                  style={{ ...styles.modalButton, ...styles.cancelButton }}
                  onClick={closeModal}
                >
                  Close
                </button>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

// Additional components and styling code
const StarRating = ({ rating, onRatingChange, disabled }) => (
  <div style={styles.starRatingContainer}>
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        color={index < rating ? "#FFC107" : "#E4E5E9"}
        size={50} // Larger size for the stars
        onClick={() => !disabled && onRatingChange(index + 1)}
        style={disabled ? { cursor: "not-allowed" } : { cursor: "pointer" }}
      />
    ))}
  </div>
);

// Styles CSS directly in file
const styles = {
  appointmentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  title: {
    fontSize: "34px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  filterContainer: {
    alignSelf: "flex-end",
    marginBottom: "20px",
    marginRight: "155px",
  },
  select: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
    transition: "0.3s",
    cursor: "pointer",
    "&:hover": {
      border: "1px solid #007bff",
    },
  },
  appointmentTable: {
    width: "80%",
    borderCollapse: "collapse",
    fontFamily: "Arial, sans-serif",
  },
  headerCell: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
    color: "black",
    borderRadius: "5px",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    verticalAlign: "middle",
  },
  servicesCell: {
    whiteSpace: "normal",
    wordWrap: "break-word",
    maxWidth: "150px",
  },
  cancelBtn: {
    color: "white",
    backgroundColor: "red",
    padding: "5px 10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  feedbackBtn: {
    color: "white",
    backgroundColor: "#4caf50",
    padding: "5px 6px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  pagination: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paginationButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 16px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "20px",
    transition: "background-color 0.3s ease",
  },
  paginationButtonHover: {
    backgroundColor: "#0056b3",
  },
  paginationButtonDisabled: {
    backgroundColor: "#cccccc",
    cursor: "not-allowed",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1000,
  },
  modalButton: {
    padding: "8px 12px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "15px",
    float: "right",
  },
  confirmButton: {
    backgroundColor: "#4caf50",
    color: "white",
    minWidth: "50px",
  },
  cancelButton: {
    backgroundColor: "gray",
    color: "white",
    marginRight: "10px",
  },
  feedbackInput: {
    width: "100%",
    height: "150px",
    padding: "10px",
    marginTop: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    resize: "none",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "500px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    zIndex: 1001,
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },
  starRatingContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "15px",
  },
};

export default ViewAppointment;
