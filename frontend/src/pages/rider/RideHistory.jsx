import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

function RideHistory() {

    const [rides, setRides] = useState([]);

    useEffect(() => {
        loadHistory();
    }, []);

    async function loadHistory() {

        try {

            const email = localStorage.getItem("userEmail");

            const response = await api.get(
                `/api/rides/history/${email}`
            );

            setRides(response.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    return (
        <div style={{ padding: "30px" }}>

            <h1>Ride History</h1>

            {rides.length === 0 && <p>No rides booked yet.</p>}

            {rides.map((ride, index) => (
                <div key={index} style={{ marginBottom: "15px" }}>
                    <p><b>Pickup:</b> {ride.pickupLocation}</p>
                    <p><b>Destination:</b> {ride.destination}</p>
                    <p><b>Status:</b> {ride.status}</p>
<p><b>Driver:</b> {ride.driverEmail ? ride.driverEmail : "Not assigned yet"}</p>
{ride.distanceKm && (
    <p><b>Distance:</b> {ride.distanceKm} km &nbsp; <b>ETA:</b> {ride.etaMinutes} mins</p>
)}
{ride.fareAmount && (
    <p><b>Fare:</b> ₹{ride.fareAmount}</p>
)}
{(ride.status === "ACCEPTED" || ride.status === "STARTED") && (
    <Link to={`/rider/track/${ride.id}`}>Track Driver</Link>
)}
{ride.status === "COMPLETED" && (
    <Link to={`/rider/summary/${ride.id}`}>View Trip Summary</Link>
)}
                    <hr />
                </div>
            ))}

        </div>
    );
}

export default RideHistory;