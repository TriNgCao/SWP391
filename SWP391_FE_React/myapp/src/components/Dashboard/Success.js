import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";

export default function Success() {
  useEffect(() => {
    if (window.opener) {
      window.opener.postMessage("paymentSuccess", "*");
    }

    const timer = setTimeout(() => {
      window.close();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={styles.container}>
      <CheckCircleIcon style={styles.icon} />
      <h1 style={styles.title}>Payment Successful!</h1>
      <p style={styles.message}>
        Thank you for your payment. Your transaction has been completed
        successfully.
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
    fontSize: "4rem",
    color: "#4CAF50",
    marginBottom: "1rem",
  },
  title: {
    fontSize: "2rem",
    color: "#4CAF50",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.2rem",
    color: "#333",
    marginBottom: "2rem",
  },
};
