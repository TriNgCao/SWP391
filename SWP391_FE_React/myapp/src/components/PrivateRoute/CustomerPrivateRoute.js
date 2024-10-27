import React, { useEffect, useState } from 'react';
import {Outlet } from 'react-router-dom';
import CustomerLoginModal from '../Customer/CustomerLoginModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomerPrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('userRole');

    if (token && userRole === '1') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      toast.warn('Please log in to continue.', { autoClose: 3000 });
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <div
          className="modal fade show"
          id="customerLoginModal"
          tabIndex="-1"
          aria-labelledby="customerLoginModalLabel"
          aria-hidden="true"
          style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <CustomerLoginModal />
        </div>
        <ToastContainer position="top-center" />
      </>
    );
  }

  return <Outlet />; // Render các component con nếu đã xác thực
};

export default CustomerPrivateRoute;