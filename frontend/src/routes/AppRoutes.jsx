import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";

import RiderRegister from "../pages/rider/Register";
import RiderLogin from "../pages/rider/Login";

import DriverRegister from "../pages/driver/Register";
import DriverLogin from "../pages/driver/Login";

function AppRoutes() {

    return (

        <Routes>

            <Route path="/" element={<Home />} />

            <Route
                path="/rider/register"
                element={<RiderRegister />}
            />

            <Route
                path="/rider/login"
                element={<RiderLogin />}
            />

            <Route
                path="/driver/register"
                element={<DriverRegister />}
            />

            <Route
                path="/driver/login"
                element={<DriverLogin />}
            />

        </Routes>

    );

}

export default AppRoutes;