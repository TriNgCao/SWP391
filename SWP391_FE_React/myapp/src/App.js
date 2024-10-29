import { Route, Routes } from "react-router-dom";
import Home from "./components/Customer/Home";
import AboutUs from "./components/Customer/AboutUs";
import Contact from "./components/Customer/Contact";
import Services from "./components/Customer/Services";
import Booking from "./components/Customer/Booking";
import { AuthProvider } from "./components/Customer/AuthContext";
import { ToastContainer } from "react-toastify";
import ManagerAppointments from "./Pages/Manager/ManagerAppointments";
import ManagerPayroll from "./Pages/Manager/ManagerPayroll";
import ManagerLayout from "./Layouts/Manager/ManagerLayout";
import ManagerProfilePage from "./Pages/Manager/ManagerProfilePage";
import ManageRevenuePage from "./Pages/Manager/ManagerRevenuePage";
import ManagerTransaction from "./Pages/Manager/ManagerTransaction";
import ManagerServices from "./Pages/Manager/ManagerServices";
import ManagerPersonnel from "./Pages/Manager/ManagerPersonnel";
import AdminLayout from "./Layouts/Admin/AdminLayout";
import AdminProfilePage from "./Pages/Admin/AdminProfilePage";
import AdminPersonnel from "./Pages/Admin/AdminPersonnel";
import StaffLayout from "./Layouts/Staff/StaffLayout";
import StaffProfilePage from "./Pages/Staff/StaffProfilePage";
import StaffAppointments from "./Pages/Staff/StaffAppointments";
import StaffSalary from "./Pages/Staff/StaffSalary";
import AdminSalon from "./Pages/Admin/AdminSalon";
import Navbar from "./components/Customer/NavBar";
import Footer from "./components/Customer/Footer";
import BlogSection from "./components/Customer/Blog";
import BlogPost from "./components/Customer/BlogDetail";
import UserProfile from "./components/Customer/CustomerProfile";
import ViewAppointment from "./components/Customer/ViewAppointment";
import CustomerPrivateRoute from "./components/PrivateRoute/CustomerPrivateRoute";
import ManagerBlog from "./Pages/Manager/ManagerBlog";

function App() {
  return (
    <div>
      <ToastContainer autoClose={2000} />
      <AuthProvider>
        <Routes>
          {/* Customer routes */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <Footer />
              </>
            }
          />
          <Route
            path="/about"
            element={
              <>
                <Navbar />
                <AboutUs />
                <Footer />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Navbar />
                <Contact />
                <Footer />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Navbar />
                <Services />
                <Footer />
              </>
            }
          />
          <Route path="/booking" element={<CustomerPrivateRoute />}>
            <Route
              path=""
              element={
                <>
                  <Navbar />
                  <Booking />
                  <Footer />
                </>
              }
            />
          </Route>
          <Route
            path="/profile"
            element={
              <>
                <Navbar />
                <UserProfile />
                <Footer />
              </>
            }
          />
          <Route
            path="/viewappointment"
            element={
              <>
                <Navbar />
                <ViewAppointment />
                <Footer />
              </>
            }
          />
          <Route
            path="/blog"
            element={
              <>
                <Navbar />
                <BlogSection />
                <Footer />
              </>
            }
          />
          <Route
            path="/blogpost"
            element={
              <>
                <Navbar />
                <BlogPost />
                <Footer />
              </>
            }
          />

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
           <Route
              path="manager-blog"
              element={<ManagerBlog/>}
            /> 
          </Route>

          {/* DASHBOARD ADMIN */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="admin-profile" element={<AdminProfilePage />} />
            <Route path="admin-personnel" element={<AdminPersonnel />} />
            <Route path="admin-salon" element={<AdminSalon />} />
          </Route>

          {/* DASHBOARD STAFF */}
          <Route path="/staff" element={<StaffLayout />}>
            <Route path="staff-profile" element={<StaffProfilePage />} />
            <Route path="staff-appointments" element={<StaffAppointments />} />
            <Route path="staff-salary" element={<StaffSalary />} />
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
