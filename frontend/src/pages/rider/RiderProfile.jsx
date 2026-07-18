import { useEffect, useState } from "react";
import api from "../../api/api";

function RiderProfile() {

    const [rider, setRider] = useState({});

    useEffect(() => {
        console.log("Component Loaded");
        loadProfile();
    }, []);

    async function loadProfile() {

        try {

            console.log("Calling API...");

            const email = localStorage.getItem("userEmail");
const response = await api.get(
    `/api/riders/profile/${email}`
);

            console.log("Response:", response.data);

            setRider(response.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    return (
        <div>
            <h1>Rider Profile</h1>

            <p><b>Name:</b> {rider.fullName}</p>
            <p><b>Email:</b> {rider.email}</p>
            <p><b>Phone:</b> {rider.phoneNumber}</p>
        </div>
    );
}

export default RiderProfile;