import { useEffect, useState } from "react";
import api from "../../api/api";

function DriverEarnings() {

    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        loadEarnings();
    }, []);

    async function loadEarnings() {

        try {

            const email = localStorage.getItem("userEmail");

            const balanceResponse = await api.get(`/api/drivers/wallet/${email}`);
            setBalance(balanceResponse.data);

            const transactionsResponse = await api.get(`/api/drivers/transactions/${email}`);
            setTransactions(transactionsResponse.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>My Earnings</h1>

            <h2>Balance: ₹{balance}</h2>

            <hr />

            <h2>Transaction History</h2>

            {transactions.length === 0 && <p>No transactions yet.</p>}

            {transactions.map((txn) => (
                <div key={txn.id} style={{ marginBottom: "10px" }}>
                    <p>
                        <b>{txn.type}</b> — ₹{txn.amount} — {txn.description}
                    </p>
                    <p style={{ fontSize: "12px", color: "gray" }}>
                        {txn.timestamp}
                    </p>
                    <hr />
                </div>
            ))}

        </div>
    );
}

export default DriverEarnings;