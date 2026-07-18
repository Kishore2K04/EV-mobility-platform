import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

function RiderDashboard() {

    const [pickupLocation, setPickupLocation] = useState("");
    const [destination, setDestination] = useState("");
    const [message, setMessage] = useState("");

    async function bookRide() {

        try {

            const riderEmail = localStorage.getItem("userEmail");

            const response = await api.post("/api/rides/book", {

                riderEmail,
                pickupLocation,
                destination

            });

            setMessage(response.data);

        } catch (error) {

            setMessage("Booking Failed");

        }

    }

    return (

        <div>

            <h1>Welcome Rider 🚴</h1>

            <input
                type="text"
                placeholder="Pickup Location"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
            />

            <br /><br />

            <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
            />

            <br /><br />

            <button onClick={bookRide}>
                Book Ride
            </button>

            <br /><br />

            <h3>{message}</h3>

            <br />

            <Link to="/rider/profile">View Profile</Link>
            <br /><br />
            <Link to="/rider/history">View Ride History</Link>

        </div>

    );
}

export default RiderDashboard;