import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./componets/Home";

import AboutUs from "./componets/AboutUs";
import Contact from "./componets/Contact";
import Stylist from "./componets/Stylist";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stylist" element={<Stylist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
