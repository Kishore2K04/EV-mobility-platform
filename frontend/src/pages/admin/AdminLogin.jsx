import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    async function handleLogin() {

        try {

            const response = await api.post("/api/admin/login", {
                email,
                password
            });

            if (response.data === "Login Successful") {
                localStorage.setItem("userRole", "ADMIN");
                navigate("/admin/dashboard");
            } else {
                setMessage(response.data);
            }

        } catch (error) {

            setMessage("Login Failed");

        }

    }

    return (
        <div style={{ padding: "20px" }}>

            <h1>Admin Login</h1>

            <input
                type="text"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>Login</button>

            <br /><br />

            <h3>{message}</h3>

        </div>
    );
}

export default AdminLogin;