import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import Contact from "./components/Contact";
import Stylist from "./components/Stylist";
import Payroll from "./components/Dashboard/Manage/Payroll";
import Transaction from "./components/Dashboard/Manage/Transaction";
import AdminDashboard from "./components/Dashboard/Admin/AdminDashboard";
import Manage_Appointments from "./components/Dashboard/Staff/Manage_Appointments";
import Profile from "./components/Dashboard/Profile";
import Manage_Account from "./components/Dashboard/Manage_Account";
import ManageDashboard from "./components/Dashboard/Manage/ManageDashboard";
import Revenue from "./components/Dashboard/Manage/Revenue";
import StaffDashboard from "./components/Dashboard/Staff/StaffDashboard";
import Salary from "./components/Dashboard/Salary";
import Schedule from "./components/Dashboard/Stylist/Schedule";
import StylistDashboard from "./components/Dashboard/Stylist/StylistDashboard";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stylist" element={<Stylist />} />
          {/* ADMIN  */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="manage-account" element={<Manage_Account />} />
          </Route>
          {/* MANAGE */}
          <Route path="/manager" element={<ManageDashboard />}>
            <Route path="profile" element={<Profile />}></Route>
            <Route path="revenue" element={<Revenue />}></Route>
            <Route path="manage-account" element={<Manage_Account />} />
            <Route path="transaction" element={<Transaction />} />
            <Route path="payroll" element={<Payroll />} />
          </Route>
          {/* STAFF */}
          <Route path="/staff" element={<StaffDashboard />}>
            <Route path="profile" element={<Profile />}></Route>
            <Route
              path="manage-appointments"
              element={<Manage_Appointments />}
            />

            <Route path="transaction" element={<Transaction />} />
            <Route path="salary" element={<Salary />} />
          </Route>
          {/* STYLIST */}
          <Route path="/stylistdashboard" element={<StylistDashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="salary" element={<Salary />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
