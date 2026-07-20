import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import MapPicker from "../../components/MapPicker";

function TrackRide() {

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
        return <p style={{ padding: "20px" }}>Loading ride details...</p>;
    }

    const driverLocation =
        ride.driverLat && ride.driverLng
            ? { lat: ride.driverLat, lng: ride.driverLng }
            : null;

    return (
        <div style={{ padding: "20px" }}>

            <h1>Track Your Ride</h1>

            <p><b>Status:</b> {ride.status}</p>
            <p><b>Driver:</b> {ride.driverEmail || "Not assigned yet"}</p>

            <MapPicker
                driverLocation={driverLocation}
                readOnly={true}
                center={driverLocation ? [driverLocation.lat, driverLocation.lng] : undefined}
            />

            <br />

            <button onClick={loadRide}>Refresh Location</button>

            {!driverLocation && (
                <p>Driver has not shared their location yet.</p>
            )}

        </div>
    );
}

export default TrackRide;