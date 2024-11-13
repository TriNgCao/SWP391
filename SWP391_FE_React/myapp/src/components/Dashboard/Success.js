import React from "react";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
export default function Success() {
    const navigate = useNavigate();

    const handleBackToHome = () => {
        navigate("/");
    };

    return (
        <div style={styles.container}>
            <CheckCircleIcon style={styles.icon} s />
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
    button: {
        padding: "0.8rem 2rem",
    },
};