import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Customer/Home";
import AboutUs from "./components/Customer/AboutUs";
import Contact from "./components/Customer/Contact";
import Stylist from "./components/Customer/Stylist";
import ManagerAppointments from "./Pages/Manager/ManagerAppointments";
import ManagerPayroll from "./Pages/Manager/ManagerPayroll";
import ManagerLayout from "./Layouts/Manager/ManagerLayout";
import ManagerProfilePage from "./Pages/Manager/ManagerProfilePage";
import ManageRevenuePage from "./Pages/Manager/ManagerRevenuePage";
import ManagerTransaction from "./Pages/Manager/ManagerTransaction";
import Header from "./components/Dashboard/Header";
import BreadcrumbsHeader from "./components/Dashboard/breadcum";
import ManagerServices from "./Pages/Manager/ManagerServices";
import ManagerPersonnel from "./Pages/Manager/ManagerPersonnel";
import AdminLayout from "./Layouts/Admin/AdminLayout";
import AdminProfilePage from "./Pages/Admin/AdminProfilePage";
import AdminPersonnel from "./Pages/Admin/AdminPersonnel";
import StaffLayout from "./Layouts/Staff/StaffLayout";
import StaffProfilePage from "./Pages/Staff/StaffProfilePage";
import StaffAppointments from "./Pages/Staff/StaffAppointments";
import StaffSalary from "./Pages/Staff/StaffSalary";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <BreadcrumbsHeader />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/stylist" element={<Stylist />} />

          {/* DASHBOARD MANAGER */}
          <Route path="/manager" element={<ManagerLayout />}>
            <Route path="manager-services" element={<ManagerServices />} />
            <Route path="manager-profile" element={<ManagerProfilePage />} />
            <Route path="manager-personnel" element={<ManagerPersonnel />} />
            <Route path="manager-revenue" element={<ManageRevenuePage />} />
            <Route path="manager-payroll" element={<ManagerPayroll />} />
            <Route
              path="manager-transaction"
              element={<ManagerTransaction />}
            />
            <Route
              path="manager-appointments"
              element={<ManagerAppointments />}
            />
          </Route>
          {/* DASBOARD ADMIN */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="admin-profile" element={<AdminProfilePage />} />
            <Route path="admin-personnel" element={<AdminPersonnel />} />
          </Route>
          {/* DASHBOARD STAFF */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route path="staff-profile" element={<StaffProfilePage />} />
            <Route path="staff-appointments" element={<StaffAppointments />} />
            <Route path="staff-salary" element={<StaffSalary />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
