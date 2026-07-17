import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import RiderDashboard from "./pages/rider/RiderDashboard";
import DriverDashboard from "./pages/driver/DriverDashboard";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/rider/dashboard"
        element={<RiderDashboard />}
      />

      <Route
        path="/driver/dashboard"
        element={<DriverDashboard />}
      />

    </Routes>
  );
}

export default App;