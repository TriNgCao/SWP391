import {Route, Routes } from "react-router-dom";

import Home from "./componets/Home";
import Footer from "./componets/Footer";
import Navbar from "./componets/NavBar";
import AboutUs from "./componets/AboutUs";
import Contact from "./componets/Contact";
import Services from "./componets/Services";
import Booking from "./componets/Booking";

function App() {
  return (
    <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
