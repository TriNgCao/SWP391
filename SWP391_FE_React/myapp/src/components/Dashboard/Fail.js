import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error"; // Icon dấu X màu đỏ

export default function Fail() {
    return (
        <div style={styles.container}>
            <ErrorIcon style={styles.icon} /> {/* Icon dấu X màu đỏ */}
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
        color: "#F44336", // Màu đỏ cho biểu tượng dấu X
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
    button: {
        padding: "0.8rem 2rem",
    },
};