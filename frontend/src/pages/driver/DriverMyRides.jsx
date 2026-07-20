import { useEffect, useState } from "react";
import api from "../../api/api";

function DriverMyRides() {

    const [rides, setRides] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadMyRides();
    }, []);

    async function loadMyRides() {

        try {

            const driverEmail = localStorage.getItem("userEmail");

            const response = await api.get(
                `/api/rides/driver/${driverEmail}`
            );

            setRides(response.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    async function startRide(rideId) {

        try {

            const response = await api.put(
                `/api/rides/start/${rideId}`
            );

            setMessage(response.data);
            loadMyRides();

        } catch (error) {

            setMessage("Failed to start ride.");

        }

    }

    async function completeRide(rideId) {

        try {

            const response = await api.put(
                `/api/rides/complete/${rideId}`
            );

            setMessage(response.data);
            loadMyRides();

        } catch (error) {

            setMessage("Failed to complete ride.");

        }

    }

    return (
        <div style={{ padding: "30px" }}>

            <h1>My Rides</h1>

            <h3>{message}</h3>

            {rides.length === 0 && <p>No rides assigned yet.</p>}

            {rides.map((ride) => (
                <div key={ride.id} style={{ marginBottom: "15px" }}>
                    <p><b>Pickup:</b> {ride.pickupLocation}</p>
                    <p><b>Destination:</b> {ride.destination}</p>
                    <p><b>Status:</b> {ride.status}</p>

                    {ride.status === "ACCEPTED" && (
                        <button onClick={() => startRide(ride.id)}>
                            Start Ride
                        </button>
                    )}

                    {ride.status === "STARTED" && (
                        <button onClick={() => completeRide(ride.id)}>
                            Complete Ride
                        </button>
                    )}

                    <hr />
                </div>
            ))}

        </div>
    );
}

export default DriverMyRides;