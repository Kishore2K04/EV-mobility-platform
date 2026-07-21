import { Link, useNavigate } from "react-router-dom";

function DriverDashboard() {

  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/login");
  }

  return (
    <div>
      <h1>Welcome Driver 🚗</h1>

      <button>Go Online</button>

      <br /><br />

      <Link to="/driver/requests">
        <button>Ride Requests</button>
      </Link>

      <br /><br />

      <Link to="/driver/myrides">
        <button>My Rides</button>
      </Link>

      <br /><br />

      <Link to="/driver/earnings">
        <button>Earnings</button>
      </Link>

      <br /><br />

      <Link to="/driver/reviews">
        <button>Ratings & Reviews</button>
      </Link>

      <br /><br />

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default DriverDashboard;