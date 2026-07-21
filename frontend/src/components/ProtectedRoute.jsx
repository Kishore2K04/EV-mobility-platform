import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, allowedRole }) {

    const role = localStorage.getItem("userRole");
    const email = localStorage.getItem("userEmail");

    if (!email || !role) {
        return <Navigate to="/login" />;
    }

    if (allowedRole && role !== allowedRole) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;