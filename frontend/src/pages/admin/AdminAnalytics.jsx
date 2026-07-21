import { useEffect, useState } from "react";
import api from "../../api/api";

function AdminAnalytics() {

    const [stats, setStats] = useState(null);

    useEffect(() => {
        loadAnalytics();
    }, []);

    async function loadAnalytics() {

        try {

            const response = await api.get("/api/admin/analytics");
            setStats(response.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    if (!stats) {
        return <p style={{ padding: "20px" }}>Loading analytics...</p>;
    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>Platform Analytics</h1>

            <p><b>Total Riders:</b> {stats.totalRiders}</p>
            <p><b>Total Drivers:</b> {stats.totalDrivers}</p>
            <p><b>Total Rides:</b> {stats.totalRides}</p>

            <hr />

            <p><b>Pending Rides:</b> {stats.pendingRides}</p>
            <p><b>Accepted Rides:</b> {stats.acceptedRides}</p>
            <p><b>Started Rides:</b> {stats.startedRides}</p>
            <p><b>Completed Rides:</b> {stats.completedRides}</p>
            <p><b>Rejected Rides:</b> {stats.rejectedRides}</p>

            <hr />

            <h2>Total Revenue: ₹{stats.totalRevenue}</h2>

        </div>
    );
}

export default AdminAnalytics;