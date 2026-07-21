import { useEffect, useState } from "react";
import api from "../../api/api";

function AdminUsers() {

    const [riders, setRiders] = useState([]);

    useEffect(() => {
        loadRiders();
    }, []);

    async function loadRiders() {

        try {

            const response = await api.get("/api/admin/riders");
            setRiders(response.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>All Riders</h1>

            <table border="1" cellPadding="8">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Wallet Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {riders.map((rider) => (
                        <tr key={rider.id}>
                            <td>{rider.fullName}</td>
                            <td>{rider.email}</td>
                            <td>{rider.phoneNumber}</td>
                            <td>₹{rider.walletBalance}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default AdminUsers;