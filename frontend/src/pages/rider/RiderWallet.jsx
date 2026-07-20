import { useEffect, useState } from "react";
import api from "../../api/api";

function RiderWallet() {

    const [balance, setBalance] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadWallet();
    }, []);

    async function loadWallet() {

        try {

            const email = localStorage.getItem("userEmail");

            const balanceResponse = await api.get(`/api/riders/wallet/${email}`);
            setBalance(balanceResponse.data);

            const transactionsResponse = await api.get(`/api/riders/transactions/${email}`);
            setTransactions(transactionsResponse.data);

        } catch (error) {

            console.log("Error:", error);

        }

    }

    async function addMoney() {

        try {

            const email = localStorage.getItem("userEmail");

            const response = await api.post("/api/riders/wallet/addmoney", {
                email,
                amount: parseFloat(amount)
            });

            setMessage(response.data);
            setAmount("");
            loadWallet();

        } catch (error) {

            setMessage("Failed to add money.");

        }

    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>My Wallet</h1>

            <h2>Balance: ₹{balance}</h2>

            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />

            &nbsp;

            <button onClick={addMoney}>Add Money</button>

            <br /><br />

            <h3>{message}</h3>

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

export default RiderWallet;