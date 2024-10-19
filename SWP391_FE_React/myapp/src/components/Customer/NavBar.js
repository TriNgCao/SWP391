import { Link } from "react-router-dom";
import UserIconDropdown from "./Dropdown";
import CustomerLoginModal from "./CustomerLoginModal";
import LoginButton from "./LoginButton";

export default function Navbar() {


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
            <ul className="navbar-nav ml-auto" style={{marginRight: '110px'}}>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link"
                  style={{ whiteSpace: "nowrap" }}
                >
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

          <div>
        <UserIconDropdown/>
        <LoginButton/>
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
      <CustomerLoginModal/>
      </div>

      {/* <!-- Register for Customer Modal --> */}
      <div
        className="modal fade"
        id="registerCustomerModal"
        tabIndex="-1"
        aria-labelledby="registerCustomerModalLabel"
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
                id="registerModalLabel"
              >
                <img
                  src="images/logo.png"
                  alt="salon icon"
                  style={{ width: "50px", marginRight: "10px" }}
                />
                Register to Leopard Salon
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
              style={{ backgroundColor: "#f7f7f7", padding: "30px" }}
            >
              <p
                className="text-center"
                style={{ fontStyle: "italic", fontSize: "16px" }}
              >
                Welcome to Leopard Salon. Register to use our awesome service!
              </p>
              <form>
                <div className="mb-3">
                  <label htmlFor="customerName" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="customerName"
                    placeholder="Enter your full name"
                    style={{ borderRadius: "10px", padding: "10px" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="customerEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="customerEmail"
                    placeholder="Enter your email"
                    style={{ borderRadius: "10px", padding: "10px" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="customerPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="customerPhone"
                    placeholder="Enter your phone number"
                    style={{ borderRadius: "10px", padding: "10px" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="customerPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="customerPassword"
                    placeholder="Enter your password"
                    style={{ borderRadius: "10px", padding: "10px" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    placeholder="Confirm your password"
                    style={{ borderRadius: "10px", padding: "10px" }}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#6dbe45",
                    borderColor: "#6dbe45",
                  }}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Login for Internal Modal --> */}
      <div
        className="modal fade"
        id="internalLoginModal"
        tabIndex="-1"
        aria-labelledby="internalLoginModalLabel"
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
                id="internalLoginModalLabel"
              >
                <img
                  src="images/logo.png"
                  alt="salon icon"
                  style={{ width: "50px", marginRight: "10px" }}
                />
                Internal Staff Login
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
              style={{ backgroundColor: "#f7f7f7", padding: "30px" }}
            >
              <p
                className="text-center"
                style={{ fontStyle: "italic", fontSize: "16px" }}
              >
                This Login Only For Internal Staff!!
              </p>
              <form>
                <div className="mb-3">
                  <label htmlFor="internalUsername" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="internalUsername"
                    placeholder="Enter your username"
                    style={{ borderRadius: "10px", padding: "10px" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="internalPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="internalPassword"
                    placeholder="Enter your password"
                    style={{ borderRadius: "10px", padding: "10px" }}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#6dbe45",
                    borderColor: "#6dbe45",
                  }}
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
