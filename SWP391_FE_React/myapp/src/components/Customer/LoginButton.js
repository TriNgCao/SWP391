import React, { useContext } from "react";
import { FaLock } from "react-icons/fa";
import { AuthContext } from "./AuthContext";

const LoginButton = () => {
  const { hasToken } = useContext(AuthContext);

  if (hasToken) {
    return null; // Không hiển thị nút nếu có token
  }

  return (
    <div>
    <button
      className="login-button"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#loginSelectionModal"
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <FaLock style={{ marginRight: "8px" }} />
        <span style={{ fontSize: "16px", fontWeight: "bold" }}>Login</span>
      </div>
    </button>
    </div>
  );
};

export default LoginButton;
