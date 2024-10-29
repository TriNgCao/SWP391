import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const itemsPerPage = 10;

  const accountId = sessionStorage.getItem("accountId");

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

  const handleCancelAppointment = async (appointmentId) => {
    const appointment = appointments.find(
      (a) => a.appointmentId === appointmentId
    );

    try {
      const response = await axios.put(
        `http://localhost:8080/api/appointment/${appointmentId}`,
        { status: appointment.status }
      );

      if (response.status === 200) {
        toast.success("Appointment status updated successfully");
      }
    } catch (error) {
      toast.error("Failed to update appointment status");
    }

    closeModal();
  };

  const handleSubmitFeedback = () => {
    setModalContent((prev) => ({
      ...prev,
      type: "submitFeedback",
    }));
  };

  const handleFeedbackSubmit = async (appointmentId, rate, feedback) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/appointment/${appointmentId}`,
        { rate, feedback }
      );
      if (response.status === 200) {
        toast.success("Feedback submitted successfully");
        setAppointments((prevAppointments) =>
          prevAppointments.map((a) =>
            a.appointmentId === appointmentId
              ? { ...a, rating: rate, feedback }
              : a
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
          <option value="Canceled">Canceled</option>
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
              <td style={styles.cell}>{appointment.status}</td>
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
        <div style={styles.modal}>
          {modalContent.type === "cancel" ? (
            <>
              <p>Are you sure you want to cancel this appointment?</p>
              <button
                onClick={() =>
                  handleCancelAppointment(modalContent.appointmentId)
                }
              >
                Yes
              </button>
              <button onClick={closeModal}>No</button>
            </>
          ) : modalContent.type === "feedback" ? (
            <>
              <p>Provide feedback and rating:</p>
              <textarea
                value={modalContent.feedback || ""}
                onChange={(e) =>
                  setModalContent((prev) => ({
                    ...prev,
                    feedback: e.target.value,
                  }))
                }
              />
              <input
                type="number"
                max="5"
                min="0"
                value={modalContent.rating || ""}
                onChange={(e) =>
                  setModalContent((prev) => ({
                    ...prev,
                    rating: e.target.value,
                  }))
                }
              />
              <button onClick={handleSubmitFeedback}>Submit</button>
              <button onClick={closeModal}>Close</button>
            </>
          ) : modalContent.type === "submitFeedback" ? (
            <>
              <p>Are you sure you want to submit this feedback?</p>
              <button
                onClick={() =>
                  handleFeedbackSubmit(
                    modalContent.appointmentId,
                    modalContent.rating,
                    modalContent.feedback
                  )
                }
              >
                Yes
              </button>
              <button onClick={closeModal}>No</button>
            </>
          ) : modalContent.type === "viewFeedback" ? (
            <>
              <p>Rating: {modalContent.rating}</p>
              <p>Feedback: {modalContent.feedback}</p>
              <button onClick={closeModal}>Close</button>
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

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
    backgroundColor: "green",
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
};

export default ViewAppointment;
