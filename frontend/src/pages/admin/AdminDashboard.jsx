import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Admin Dashboard 🛠️</h1>

      <br />

      <Link to="/admin/users">
        <button>Users (Riders)</button>
      </Link>

      <br /><br />

      <Link to="/admin/drivers">
        <button>Drivers</button>
      </Link>

      <br /><br />

      <Link to="/admin/rides">
        <button>Rides</button>
      </Link>

      <br /><br />

      <Link to="/admin/analytics">
        <button>Analytics</button>
      </Link>

    </div>
  );
}

export default AdminDashboard;