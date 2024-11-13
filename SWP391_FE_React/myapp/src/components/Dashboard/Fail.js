import React, { useEffect } from "react";
import ErrorIcon from "@mui/icons-material/Error";

export default function Fail() {
  useEffect(() => {
    // Gửi tín hiệu "paymentFail" về trang StaffAppointments
    if (window.opener) {
      window.opener.postMessage("paymentFail", "*");
    }

    // Đợi 4 giây rồi đóng tab
    const timer = setTimeout(() => {
      window.close();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <ErrorIcon style={styles.icon} />
      <h1 style={styles.title}>Payment Failed</h1>
      <p style={styles.message}>
        Unfortunately, your transaction could not be completed. Please try again
        or contact support.
      </p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f0f0f0",
  },
  icon: {
    fontSize: "6rem",
    color: "#F44336",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "2rem",
    color: "#F44336",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "2rem",
  },
};
