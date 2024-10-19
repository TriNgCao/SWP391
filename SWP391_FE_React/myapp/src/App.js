
import {Route, Routes } from "react-router-dom";

import Home from "./components/Customer/Home";
import Footer from "./components/Customer/Footer";
import Navbar from "./components/Customer/NavBar";
import AboutUs from "./components/Customer/AboutUs";
import Contact from "./components/Customer/Contact";
import Services from "./components/Customer/Services";
import Booking from "./components/Customer/Booking";
import { AuthProvider } from "./components/Customer/AuthContext";


function App() {
  return (
    <div>
    <AuthProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        <Footer />
        </AuthProvider>
    </div>
  );
}

export default App;
