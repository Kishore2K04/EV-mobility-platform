import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import MapPicker from "../../components/MapPicker";
import { reverseGeocode, getRouteInfo } from "../../utils/mapUtils";

function RiderDashboard() {

    const [selectingMode, setSelectingMode] = useState("pickup");
    const [pickup, setPickup] = useState(null);
    const [destination, setDestination] = useState(null);
    const [pickupAddress, setPickupAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");
    const [distanceKm, setDistanceKm] = useState(null);
    const [etaMinutes, setEtaMinutes] = useState(null);
    const [message, setMessage] = useState("");

    async function handleMapClick(latlng) {

        if (selectingMode === "pickup") {

            setPickup(latlng);
            const address = await reverseGeocode(latlng.lat, latlng.lng);
            setPickupAddress(address);
            setSelectingMode("destination");

        } else {

            setDestination(latlng);
            const address = await reverseGeocode(latlng.lat, latlng.lng);
            setDestinationAddress(address);

        }

    }

    async function calculateRoute() {

        if (!pickup || !destination) {
            setMessage("Please select both pickup and destination on the map.");
            return;
        }

        const routeInfo = await getRouteInfo(pickup, destination);

        setDistanceKm(routeInfo.distanceKm);
        setEtaMinutes(routeInfo.etaMinutes);

    }

    async function bookRide() {

        if (!pickup || !destination) {
            setMessage("Please select both pickup and destination on the map.");
            return;
        }

        try {

            const riderEmail = localStorage.getItem("userEmail");

            const response = await api.post("/api/rides/book", {

                riderEmail,
                pickupLocation: pickupAddress,
                destination: destinationAddress,
                pickupLat: pickup.lat,
                pickupLng: pickup.lng,
                destinationLat: destination.lat,
                destinationLng: destination.lng,
                distanceKm,
                etaMinutes

            });

            setMessage(response.data);

        } catch (error) {

            setMessage("Booking Failed");

        }

    }

    return (

        <div style={{ padding: "20px" }}>

            <h1>Welcome Rider 🚴</h1>

            <p>
                Click on the map to set your <b>{selectingMode}</b> location.
            </p>

            <button onClick={() => setSelectingMode("pickup")}>
                Set Pickup
            </button>

            &nbsp;

            <button onClick={() => setSelectingMode("destination")}>
                Set Destination
            </button>

            <br /><br />

            <MapPicker
                pickup={pickup}
                destination={destination}
                onMapClick={handleMapClick}
            />

            <br />

            <p><b>Pickup:</b> {pickupAddress || "Not selected"}</p>
            <p><b>Destination:</b> {destinationAddress || "Not selected"}</p>

            <button onClick={calculateRoute}>
                Calculate Distance & ETA
            </button>

            <br /><br />

            {distanceKm && (
                <p>
                    <b>Distance:</b> {distanceKm} km &nbsp;
                    <b>ETA:</b> {etaMinutes} mins
                </p>
            )}

            <button onClick={bookRide}>
                Book Ride
            </button>

            <br /><br />

            <h3>{message}</h3>

            <br />

            <Link to="/rider/profile">View Profile</Link>
            <br /><br />
            <Link to="/rider/history">View Ride History</Link>
            <br /><br />
            <Link to="/rider/wallet">View Wallet</Link>
            <br /><br />
            <button onClick={() => {
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userRole");
            window.location.href = "/login";
            }}>Logout</button>

        </div>

    );
}

export default RiderDashboard;