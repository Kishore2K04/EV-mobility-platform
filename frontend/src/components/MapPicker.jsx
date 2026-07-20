import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

function ClickHandler({ onMapClick }) {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        }
    });
    return null;
}

function MapPicker({ pickup, destination, driverLocation, onMapClick, readOnly, center }) {
    return (
        <MapContainer
            center={center || [13.0827, 80.2707]}
            zoom={12}
            style={{ height: "300px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; OpenStreetMap contributors'
            />

            {!readOnly && <ClickHandler onMapClick={onMapClick} />}

            {pickup && <Marker position={[pickup.lat, pickup.lng]} />}
            {destination && <Marker position={[destination.lat, destination.lng]} />}
            {driverLocation && <Marker position={[driverLocation.lat, driverLocation.lng]} />}

        </MapContainer>
    );
}

export default MapPicker;