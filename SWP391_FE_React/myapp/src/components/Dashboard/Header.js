import React from "react";
import { Navbar } from "react-bootstrap";

export default function Header() {
  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{
        display: "flex",

        height: "80px",
      }}
    >
      <Navbar.Brand
        href="#home"
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          alt=""
          src="./images/logo.png"
          width="70"
          height="70"
          style={{ marginRight: "10px" }}
        />
        <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>LEOPARD</span>
      </Navbar.Brand>
    </Navbar>
  );
}
