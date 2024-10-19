import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  // Inline styles for the footer
  const footerStyles = {
    backgroundColor: "#2c3e50",
    color: "#ecf0f1",
    padding: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "left",
    width: "100%",
    marginTop: "auto",
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "space-between",
    width: "90%",
    margin: "0 auto",
    flexWrap: "wrap",
  };

  const sectionStyles = {
    flex: "1",
    margin: "10px",
    minWidth: "200px",
  };

  const iconStyles = {
    margin: "0 10px",
    cursor: "pointer",
    color: "#ecf0f1",
  };

  const linkStyles = {
    color: "#ecf0f1",
    textDecoration: "none",
  };

  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        {/* Company Information Section */}
        <div style={sectionStyles}>
          <h4>Company Name</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer sit
            amet bibendum ipsum, non auctor lectus.
          </p>
        </div>

        {/* Quick Links Section */}
        <div style={sectionStyles}>
          <h4>Quick Links</h4>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            <li>
              <a href="/" style={linkStyles}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" style={linkStyles}>
                About
              </a>
            </li>
            <li>
              <a href="/services" style={linkStyles}>
                Services
              </a>
            </li>
            <li>
              <a href="/contact" style={linkStyles}>
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Icons Section */}
        <div style={sectionStyles}>
          <h4>Follow Us</h4>
          <div>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookIcon style={iconStyles} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TwitterIcon style={iconStyles} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon style={iconStyles} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedInIcon style={iconStyles} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
