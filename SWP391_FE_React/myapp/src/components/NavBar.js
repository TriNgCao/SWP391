import { Link } from "react-router-dom";

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
            style={{ marginRight: "70px", marginLeft: "-30px" }}
          >
            <span>
              <img style={{ width: "15%" }} src="images/logo.png" alt="" />
            </span>
            Leopard Salon
          </Link>

          {/* <!-- Navigation Menu --> */}
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
            <ul className="navbar-nav ml-auto">
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
                <Link to="/stylist" className="nav-link">
                  Stylist
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/gallery" className="nav-link">
                  Gallery
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

          {/* <!-- User Icon Section --> */}
          <li
            className="nav-item dropdown d-flex align-items-center"
            style={{ marginLeft: "50px" }}
          >
            <Link to="#" className="nav-link" id="userDropdown">
              <img
                src="images/user.png"
                alt="User"
                style={{
                  width: "30px",
                  borderRadius: "50%",
                  verticalAlign: "middle",
                }}
              />
            </Link>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
              style={{ position: "absolute" }}
            >
              <Link className="dropdown-item" to="/profile">
                <i className="fa-solid fa-user"></i>View Profile
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fa-solid fa-medal"></i>Loyal Point
              </Link>
              <Link className="dropdown-item" to="#">
                <i className="fa-solid fa-right-from-bracket"></i>Logout
              </Link>
            </div>
          </li>
          <button
            className="login-button"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#loginSelectionModal"
          >
            <i className="fa-solid fa-lock" style={{ whiteSpace: "nowrap" }}>
              {" "}
              Login
            </i>
          </button>
        </div>
      </nav>
    </div>
  );
}
