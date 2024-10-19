
import {Route, Routes } from "react-router-dom";

import Home from "./componets/Customer/Home";
import Footer from "./componets/Customer/Footer";
import Navbar from "./componets/Customer/NavBar";
import AboutUs from "./componets/Customer/AboutUs";
import Contact from "./componets/Customer/Contact";
import Services from "./componets/Customer/Services";
import Booking from "./componets/Customer/Booking";


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
