import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../api/api";

function TripSummary() {

    const { rideId } = useParams();
    const [ride, setRide] = useState(null);

    useEffect(() => {
        loadRide();
    }, []);

    async function loadRide() {

        try {

            const response = await api.get(`/api/rides/${rideId}`);
            setRide(response.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    if (!ride) {
        return <p style={{ padding: "20px" }}>Loading trip summary...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>Trip Summary</h1>

            <p><b>Pickup:</b> {ride.pickupLocation}</p>
            <p><b>Destination:</b> {ride.destination}</p>
            <p><b>Driver:</b> {ride.driverEmail || "Not assigned"}</p>
            <p><b>Status:</b> {ride.status}</p>
            <p><b>Distance:</b> {ride.distanceKm ? `${ride.distanceKm} km` : "N/A"}</p>
            <p><b>Estimated Time:</b> {ride.etaMinutes ? `${ride.etaMinutes} mins` : "N/A"}</p>

            <hr />

            <h2>
                Total Fare: {ride.fareAmount ? `₹${ride.fareAmount}` : "Not calculated yet"}
            </h2>

            <br />

            <Link to="/rider/history">Back to Ride History</Link>

        </div>
    );
}

export default TripSummary;