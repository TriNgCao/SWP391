import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";

import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Stylist from "./components/Stylist";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stylist" element={<Stylist />} />
          {/* TEST DASHBOARD KHÔNG XÓA NHA !!!! */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
