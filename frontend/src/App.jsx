import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import RiderRegister from "./pages/rider/Register";
import RiderDashboard from "./pages/rider/RiderDashboard";
import RiderProfile from "./pages/rider/RiderProfile";
import RideHistory from "./pages/rider/RideHistory";
import TrackRide from "./pages/rider/TrackRide";
import TripSummary from "./pages/rider/TripSummary";
import RiderWallet from "./pages/rider/RiderWallet";
import RateRide from "./pages/rider/RateRide";
import DriverRegister from "./pages/driver/Register";
import DriverDashboard from "./pages/driver/DriverDashboard";
import DriverRideRequests from "./pages/driver/DriverRideRequests";
import DriverMyRides from "./pages/driver/DriverMyRides";
import DriverEarnings from "./pages/driver/DriverEarnings";
import DriverReviews from "./pages/driver/DriverReviews";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDrivers from "./pages/admin/AdminDrivers";
import AdminRides from "./pages/admin/AdminRides";
import AdminAnalytics from "./pages/admin/AdminAnalytics";

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
      <Route path="/rider/wallet" element={<RiderWallet />} />
      <Route path="/rider/rate/:rideId" element={<RateRide />} />
      <Route path="/driver/requests" element={<DriverRideRequests />} />
      <Route path="/driver/myrides" element={<DriverMyRides />} />
      <Route path="/driver/earnings" element={<DriverEarnings />} />
      <Route path="/driver/reviews" element={<DriverReviews />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route path="/admin/drivers" element={<AdminDrivers />} />
      <Route path="/admin/rides" element={<AdminRides />} />
      <Route path="/admin/analytics" element={<AdminAnalytics />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;