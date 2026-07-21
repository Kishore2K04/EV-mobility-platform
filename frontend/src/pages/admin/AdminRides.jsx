import { useEffect, useState } from "react";
import api from "../../api/api";

function AdminRides() {

    const [rides, setRides] = useState([]);

    useEffect(() => {
        loadRides();
    }, []);

    async function loadRides() {

        try {

            const response = await api.get("/api/admin/rides");
            setRides(response.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>All Rides</h1>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Rider</th>
                        <th>Driver</th>
                        <th>Pickup</th>
                        <th>Destination</th>
                        <th>Status</th>
                        <th>Fare</th>
                    </tr>
                </thead>
                <tbody>
                    {rides.map((ride) => (
                        <tr key={ride.id}>
                            <td>{ride.id}</td>
                            <td>{ride.riderEmail}</td>
                            <td>{ride.driverEmail || "Not assigned"}</td>
                            <td>{ride.pickupLocation}</td>
                            <td>{ride.destination}</td>
                            <td>{ride.status}</td>
                            <td>{ride.fareAmount ? `₹${ride.fareAmount}` : "-"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default AdminRides;