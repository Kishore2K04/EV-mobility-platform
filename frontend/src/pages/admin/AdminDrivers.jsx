import { useEffect, useState } from "react";
import api from "../../api/api";

function AdminDrivers() {

    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        loadDrivers();
    }, []);

    async function loadDrivers() {

        try {

            const response = await api.get("/api/admin/drivers");
            setDrivers(response.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>All Drivers</h1>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Vehicle Number</th>
                        <th>Wallet Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {drivers.map((driver) => (
                        <tr key={driver.id}>
                            <td>{driver.fullName}</td>
                            <td>{driver.email}</td>
                            <td>{driver.phoneNumber}</td>
                            <td>{driver.vehicleNumber}</td>
                            <td>₹{driver.walletBalance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default AdminDrivers;