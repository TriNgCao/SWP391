import React, { useState, useEffect } from 'react';

const ViewAppointment = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fakeData = [
        {
          id: 1,
          stylistName: 'John Doe',
          salonName: 'Salon A',
          date: '2024/10/25',
          services: ['Haircut', 'Color', 'Shampoo', 'Blowdry'],
          status: 'Pending',
        },
        {
            id: 1,
            stylistName: 'John Doe',
            salonName: 'Salon A',
            date: '2024/10/25',
            services: ['Haircut', 'Color', 'Shampoo', 'Blowdry'],
            status: 'Pending',
          },
          {
            id: 1,
            stylistName: 'John Doe',
            salonName: 'Salon A',
            date: '2024/10/25',
            services: ['Haircut', 'Color', 'Shampoo', 'Blowdry'],
            status: 'Pending',
          },
        {
          id: 2,
          stylistName: 'Jane Smith',
          salonName: 'Salon B',
          date: '2024/10/26',
          services: ['Massage', 'Facial', 'Manicure', 'Pedicure'],
          status: 'Complete',
        },
      ];

      await new Promise((resolve) => setTimeout(resolve, 500));
      setAppointments(fakeData);
    };

    fetchData();
  }, []);

  return (
    <div style={styles.appointmentContainer}>
      <h1 style={styles.title}>Your Appointments</h1>
      <table style={styles.appointmentTable}>
        <thead>
          <tr>
            <th style={styles.headerCell}>STT</th>
            <th style={styles.headerCell}>Stylist Name</th>
            <th style={styles.headerCell}>Salon Name</th>
            <th style={styles.headerCell}>Date</th>
            <th style={styles.headerCell}>Services</th>
            <th style={styles.headerCell}>Status</th>
            <th style={styles.headerCell}>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={appointment.id}>
              <td style={styles.cell}>{index + 1}</td>
              <td style={styles.cell}>{appointment.stylistName}</td>
              <td style={styles.cell}>{appointment.salonName}</td>
              <td style={styles.cell}>{appointment.date}</td>
              <td style={{ ...styles.cell, ...styles.servicesCell }}>
                {appointment.services.join(', ')}
              </td>
              <td
                style={{
                  ...styles.cell,
                  color: appointment.status === 'Pending' ? 'orange' : 'green',
                  fontWeight: 'bold',
                }}
              >
                {appointment.status}
              </td>
              <td style={styles.cell}>
                {appointment.status === 'Pending' ? (
                  <button style={styles.cancelBtn}>Cancel</button>
                ) : (
                  <button style={styles.feedbackBtn}>Feedback</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Styles CSS trực tiếp trong file
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
  },
  cell: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center',
    verticalAlign: 'top',
  },
  servicesCell: {
    whiteSpace: 'normal', // Cho phép xuống dòng khi nội dung quá dài
    wordWrap: 'break-word',
    maxWidth: '150px', // Đặt giới hạn chiều rộng để giữ kích thước bảng gọn
  },
  cancelBtn: {
    color: 'white',
    backgroundColor: 'red',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
  },
  feedbackBtn: {
    color: 'white',
    backgroundColor: 'green',
    padding: '5px 10px',
    border: 'none',
    cursor: 'pointer',
  },
};

export default ViewAppointment;
