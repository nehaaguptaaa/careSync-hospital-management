import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PatientList from "./pages/PatientList";
import AddPatient from "./pages/AddPatient";
import EditPatient from "./pages/EditPatient";
import DoctorList from "./pages/DoctorList";
import AddDoctor from "./pages/AddDoctor";
import AppointmentList from "./pages/AppointmentList";
import AddAppointment from "./pages/AddAppointment";
import EditDoctor from "./pages/EditDoctor";
import EditAppointment from "./pages/EditAppointment";
import Login from "./components/Login";

//  hide navbar & footer on login page
function Layout({ children }) {
  const location = useLocation();

  const hideLayout = location.pathname === "/login"; // hide layout only on login page

  return (
    <>
      {!hideLayout && <Navbar />}

      <div className="main-content">{children}</div>

      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* LOGIN DEFAULT PAGE */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />

          {/* AFTER LOGIN ROUTES */}
          <Route path="/home" element={<Home />} />

          {/* PATIENT ROUTES */}
          <Route path="/patients" element={<PatientList />} />
          <Route path="/patients/add" element={<AddPatient />} />
          <Route path="/patients/edit/:id" element={<EditPatient />} />

          {/* DOCTORS */}
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/doctors/add" element={<AddDoctor />} />
          <Route path="/doctors/edit/:id" element={<EditDoctor />} />

          {/* APPOINTMENTS */}
          <Route path="/appointments" element={<AppointmentList />} />
          <Route path="/appointments/add" element={<AddAppointment />} />
          <Route path="/appointments/edit/:id" element={<EditAppointment />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
