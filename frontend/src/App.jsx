import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/home/Home";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";

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
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/rider/dashboard" element={
        <ProtectedRoute allowedRole="RIDER"><RiderDashboard /></ProtectedRoute>
      } />
      <Route path="/rider/profile" element={
        <ProtectedRoute allowedRole="RIDER"><RiderProfile /></ProtectedRoute>
      } />
      <Route path="/rider/history" element={
        <ProtectedRoute allowedRole="RIDER"><RideHistory /></ProtectedRoute>
      } />
      <Route path="/rider/track/:rideId" element={
        <ProtectedRoute allowedRole="RIDER"><TrackRide /></ProtectedRoute>
      } />
      <Route path="/rider/summary/:rideId" element={
        <ProtectedRoute allowedRole="RIDER"><TripSummary /></ProtectedRoute>
      } />
      <Route path="/rider/wallet" element={
        <ProtectedRoute allowedRole="RIDER"><RiderWallet /></ProtectedRoute>
      } />
      <Route path="/rider/rate/:rideId" element={
        <ProtectedRoute allowedRole="RIDER"><RateRide /></ProtectedRoute>
      } />

      <Route path="/driver/dashboard" element={
        <ProtectedRoute allowedRole="DRIVER"><DriverDashboard /></ProtectedRoute>
      } />
      <Route path="/driver/requests" element={
        <ProtectedRoute allowedRole="DRIVER"><DriverRideRequests /></ProtectedRoute>
      } />
      <Route path="/driver/myrides" element={
        <ProtectedRoute allowedRole="DRIVER"><DriverMyRides /></ProtectedRoute>
      } />
      <Route path="/driver/earnings" element={
        <ProtectedRoute allowedRole="DRIVER"><DriverEarnings /></ProtectedRoute>
      } />
      <Route path="/driver/reviews" element={
        <ProtectedRoute allowedRole="DRIVER"><DriverReviews /></ProtectedRoute>
      } />

      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRole="ADMIN"><AdminDashboard /></ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRole="ADMIN"><AdminUsers /></ProtectedRoute>
      } />
      <Route path="/admin/drivers" element={
        <ProtectedRoute allowedRole="ADMIN"><AdminDrivers /></ProtectedRoute>
      } />
      <Route path="/admin/rides" element={
        <ProtectedRoute allowedRole="ADMIN"><AdminRides /></ProtectedRoute>
      } />
      <Route path="/admin/analytics" element={
        <ProtectedRoute allowedRole="ADMIN"><AdminAnalytics /></ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;