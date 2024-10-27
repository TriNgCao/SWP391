    import React, { createContext, useState, useEffect } from "react";

    export const AuthContext = createContext();

    export const AuthProvider = ({ children }) => {
    const [hasToken, setHasToken] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        setHasToken(!!token); // Cập nhật trạng thái có token

        // Lắng nghe sự kiện "storage"
        const handleStorageChange = () => {
        const updatedToken = sessionStorage.getItem("token");
        setHasToken(!!updatedToken); // Cập nhật token
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
        window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ hasToken, setHasToken }}>
        {children}
        </AuthContext.Provider>
    );
    };
