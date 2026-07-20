import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import RiderRegister from "./pages/rider/Register";
import RiderDashboard from "./pages/rider/RiderDashboard";
import RiderProfile from "./pages/rider/RiderProfile";
import RideHistory from "./pages/rider/RideHistory";
import TrackRide from "./pages/rider/TrackRide";
import TripSummary from "./pages/rider/TripSummary";
import DriverRegister from "./pages/driver/Register";
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverRideRequests from "./pages/driver/DriverRideRequests";
import DriverMyRides from "./pages/driver/DriverMyRides";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/rider/register" element={<RiderRegister />} />
      <Route path="/driver/register" element={<DriverRegister />} />
      <Route path="/rider/dashboard" element={<RiderDashboard />} />
      <Route path="/driver/dashboard" element={<DriverDashboard />} />
      <Route path="/rider/profile" element={<RiderProfile />} />
      <Route path="/rider/history" element={<RideHistory />} />
      <Route path="/rider/track/:rideId" element={<TrackRide />} />
      <Route path="/rider/summary/:rideId" element={<TripSummary />} />
      <Route path="/driver/requests" element={<DriverRideRequests />} />
      <Route path="/driver/myrides" element={<DriverMyRides />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;