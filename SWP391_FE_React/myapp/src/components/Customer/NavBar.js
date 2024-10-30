import { Link } from "react-router-dom";
import UserIconDropdown from "./Dropdown";
import CustomerLoginModal from "./CustomerLoginModal";
import LoginButton from "./LoginButton";
import CustomerRegisterModal from "./CustomerRegisterModal";
import InternalLoginModal from "./InternalLoginModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import React, { useContext } from "react";
import { Badge, IconButton, Tooltip } from "@mui/material";
import CustomerNotificationMenu from "./CustomerNotificationMenu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const { hasToken } = useContext(AuthContext);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const handleOpenNotificationMenu = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleCloseNotificationMenu = () => {
    setAnchorElNotification(null);
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light"
        id="ftco-navbar"
      >
        <div className="container">
          <Link
            className="navbar-brand"
            to="/"
            style={{ marginRight: "10px", marginLeft: "-80px" }}
          >
            <span>
              <img style={{ width: "15%" }} src="images/logo.png" alt="" />
            </span>
            Leopard Salon
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#ftco-nav"
            aria-controls="ftco-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars"></span> Menu
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="ftco-nav"
          >
            <ul className="navbar-nav ml-auto" style={{ marginRight: "110px" }}>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link" style={{ whiteSpace: "nowrap" }}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/booking" className="nav-link">
                  Booking
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blog" className="nav-link">
                  Blog
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/contact" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* User Icon and Notifications or Login Placeholder */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginRight: "10px",
              minWidth: "120px",  // Adjust to match the combined width of UserIconDropdown and notifications
              justifyContent: hasToken ? "flex-end" : "center",
            }}
          >
            {hasToken ? (
              <>
                <UserIconDropdown />
                <Tooltip title="Open notifications">
                  <IconButton onClick={handleOpenNotificationMenu} sx={{ mr: 1 }}>
                    <Badge color="error" variant="dot" invisible={unreadCount === 0}>
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <CustomerNotificationMenu
                  anchorEl={anchorElNotification}
                  handleClose={handleCloseNotificationMenu}
                  setUnreadCount={setUnreadCount}
                />
              </>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </nav>



      {/* <!-- Login Selection Modal --> */}
      <div
        className="modal fade"
        id="loginSelectionModal"
        tabIndex="-1"
        aria-labelledby="loginSelectionModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              borderRadius: "15px",
              boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              className="modal-header"
              style={{
                backgroundColor: "#e0dede",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <h5
                className="modal-title text-center w-100"
                id="loginSelectionModalLabel"
              >
                Choose Login Type
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div
              className="modal-body"
              style={{
                backgroundColor: "#f7f7f7",
                padding: "30px",
                textAlign: "center",
              }}
            >
              <button
                className="btn btn-primary w-100 mb-3"
                data-bs-toggle="modal"
                data-bs-target="#customerLoginModal"
                data-bs-dismiss="modal"
                style={{ borderRadius: "10px", backgroundColor: "#6dbe45" }}
              >
                Login for Customer
              </button>
              <button
                className="btn btn-primary w-100"
                data-bs-toggle="modal"
                data-bs-target="#internalLoginModal"
                data-bs-dismiss="modal"
                style={{ borderRadius: "10px", backgroundColor: "#6dbe45" }}
              >
                Login for Internal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Login for Customer Modal --> */}
      <div
        className="modal fade"
        id="customerLoginModal"
        tabIndex="-1"
        aria-labelledby="customerLoginModalLabel"
        aria-hidden="true"
      >
        <CustomerLoginModal />
      </div>

      {/* <!-- Register for Customer Modal --> */}
      <div
        className="modal fade"
        id="registerCustomerModal"
        tabIndex="-1"
        aria-labelledby="registerCustomerModalLabel"
        aria-hidden="true"
      >
        <CustomerRegisterModal />
      </div>

      {/* <!-- Customer Forgot Password Modal --> */}
      <div
        className="modal fade"
        id="forgotPasswordModal"
        tabIndex="-1"
        aria-labelledby="forgotPasswordModalLabel"
        aria-hidden="true"
      >
        <ForgotPasswordModal />
      </div>

      {/* <!-- Login for Internal Modal --> */}
      <div
        className="modal fade"
        id="internalLoginModal"
        tabIndex="-1"
        aria-labelledby="internalLoginModalLabel"
        aria-hidden="true"
      >
        <InternalLoginModal />
      </div>
    </div>
  );
}
