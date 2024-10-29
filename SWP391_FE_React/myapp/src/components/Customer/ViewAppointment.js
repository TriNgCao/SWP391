import React, { useState, useEffect } from 'react';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const fakeData = [
        { id: 1, stylistName: 'John Doe', salonName: 'Salon A', date: '2024-10-25', services: ['Haircut', 'Color', 'Shampoo', 'Blowdry'], status: 'Pending' },
        { id: 2, stylistName: 'Jane Smith', salonName: 'Salon B', date: '2024-10-26', services: ['Massage', 'Facial', 'Manicure', 'Pedicure'], status: 'Completed' },
        { id: 3, stylistName: 'Alex Johnson', salonName: 'Salon C', date: '2024-10-27', services: ['Haircut', 'Style'], status: 'Ready' },
        { id: 4, stylistName: 'Maria Garcia', salonName: 'Salon D', date: '2024-10-24', services: ['Color', 'Shampoo'], status: 'On Process' },
        { id: 5, stylistName: 'Linda Brown', salonName: 'Salon E', date: '2024-10-23', services: ['Massage'], status: 'Ready' },
        { id: 6, stylistName: 'James Wilson', salonName: 'Salon F', date: '2024-10-22', services: ['Haircut'], status: 'Completed' },
        { id: 7, stylistName: 'Emma Clark', salonName: 'Salon G', date: '2024-10-21', services: ['Color', 'Style'], status: 'Pending' },
        { id: 8, stylistName: 'Michael Lee', salonName: 'Salon H', date: '2024-10-20', services: ['Blowdry'], status: 'On Process' },
        { id: 9, stylistName: 'Sophia Martinez', salonName: 'Salon I', date: '2024-10-19', services: ['Haircut', 'Shampoo'], status: 'Ready' },
        { id: 10, stylistName: 'William Harris', salonName: 'Salon J', date: '2024-10-18', services: ['Massage', 'Facial'], status: 'Pending' },
        { id: 11, stylistName: 'Olivia Walker', salonName: 'Salon K', date: '2024-10-17', services: ['Haircut'], status: 'Completed' },
      ];

      await new Promise((resolve) => setTimeout(resolve, 500));
      setAppointments(fakeData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const sortedAppointments = [...appointments].sort((b, a) => new Date(a.date) - new Date(b.date));
    const filtered = selectedStatus
      ? sortedAppointments.filter((appointment) => appointment.status === selectedStatus)
      : sortedAppointments;

    setFilteredAppointments(filtered);
    setCurrentPage(1); // Reset to the first page when filtering
  }, [appointments, selectedStatus]);

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={styles.appointmentContainer}>
      <h1 style={styles.title}>Your Appointments</h1>
      <div style={styles.filterContainer}>
        <label style={{ marginRight: '10px' }}>Filter by Status:</label>
        <select onChange={handleStatusChange} value={selectedStatus} style={styles.select}>
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
            <th style={styles.headerCell}>Status</th>
            <th style={styles.headerCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedAppointments.map((appointment, index) => (
            <tr key={appointment.id}>
              <td style={styles.cell}>{(currentPage - 1) * itemsPerPage + index + 1}</td>
              <td style={styles.cell}>{appointment.stylistName}</td>
              <td style={styles.cell}>{appointment.salonName}</td>
              <td style={styles.cell}>{appointment.date}</td>
              <td style={{ ...styles.cell, ...styles.servicesCell }}>{appointment.services.join(', ')}</td>
              <td
                style={{
                  ...styles.cell,
                  color: appointment.status === 'Pending' ? 'orange' :
                         appointment.status === 'Ready' ? 'blue' :
                         appointment.status === 'On Process' ? 'purple' :
                         appointment.status === 'Completed' ? 'green' : 'red',
                  fontWeight: 'bold',
                }}
              >
                {appointment.status}
              </td>
              <td style={styles.cell}>
                {appointment.status === 'Pending' || appointment.status === 'Ready' ? (
                  <button style={styles.cancelBtn}><b>Cancel</b></button>
                ) : appointment.status === 'Completed' ? (
                  <button style={styles.feedbackBtn}><b>Feedback</b></button>
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
        <span style={{ margin: '0 10px' }}>Page {currentPage} of {totalPages}</span>
        <button
          style={{
            ...styles.paginationButton,
            ...(currentPage === totalPages ? styles.paginationButtonDisabled : {}),
          }}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Styles CSS directly in file
const styles = {
  appointmentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  title: {
    fontSize: '34px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  filterContainer: {
    alignSelf: 'flex-end',
    marginBottom: '20px',
    marginRight: '155px',
  },
  select: {
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    outline: 'none',
    transition: '0.3s',
    cursor: 'pointer',
    '&:hover': {
      border: '1px solid #007bff',
    },
  },
  appointmentTable: {
    width: '80%',
    borderCollapse: 'collapse',
    fontFamily: 'Arial, sans-serif',
  },
  headerCell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    color: 'black',
    borderRadius: '5px',
  },
  cell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  servicesCell: {
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    maxWidth: '150px',
  },
  cancelBtn: {
    color: 'white',
    backgroundColor: 'red',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  feedbackBtn: {
    color: 'white',
    backgroundColor: 'green',
    padding: '5px 6px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  pagination: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    margin: '0 5px',
    cursor: 'pointer',
    borderRadius: '20px',
    transition: 'background-color 0.3s ease',
  },
  paginationButtonHover: {
    backgroundColor: '#0056b3',
  },
  paginationButtonDisabled: {
    backgroundColor: '#cccccc',
    cursor: 'not-allowed',
  },
};

export default ViewAppointment;
