import { useEffect, useState } from "react";
import api from "../../api/api";

function DriverRideRequests() {

    const [rides, setRides] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadPendingRides();
    }, []);

    async function loadPendingRides() {

        try {

            const response = await api.get("/api/rides/pending");
            setRides(response.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    async function acceptRide(rideId) {

        try {

            const driverEmail = localStorage.getItem("userEmail");

            const response = await api.put(
                `/api/rides/accept/${rideId}?driverEmail=${driverEmail}`
            );

            setMessage(response.data);
            loadPendingRides();

        } catch (error) {

            setMessage("Failed to accept ride.");

        }

    }

    async function rejectRide(rideId) {

        try {

            const response = await api.put(
                `/api/rides/reject/${rideId}`
            );

            setMessage(response.data);
            loadPendingRides();

        } catch (error) {

            setMessage("Failed to reject ride.");

        }

    }

    return (
        <div style={{ padding: "30px" }}>

            <h1>Pending Ride Requests</h1>

            <h3>{message}</h3>

            {rides.length === 0 && <p>No pending ride requests.</p>}

            {rides.map((ride) => (
                <div key={ride.id} style={{ marginBottom: "15px" }}>
                    <p><b>Pickup:</b> {ride.pickupLocation}</p>
                    <p><b>Destination:</b> {ride.destination}</p>
                    <p><b>Status:</b> {ride.status}</p>

                    <button onClick={() => acceptRide(ride.id)}>
                        Accept
                    </button>

                    &nbsp;

                    <button onClick={() => rejectRide(ride.id)}>
                        Reject
                    </button>

                    <hr />
                </div>
            ))}

        </div>
    );
}

export default DriverRideRequests;