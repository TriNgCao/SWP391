import React, { useEffect } from "react";

const PaymentSuccess = () => {
  useEffect(() => {
    // Gửi tín hiệu "paymentSuccess" về trang StaffAppointments
    if (window.opener) {
      window.opener.postMessage("paymentSuccess", "*");
    }

    // Tự động đóng tab sau khi gửi tín hiệu
    window.close();
  }, []);

  return null;
};

export default PaymentSuccess;
