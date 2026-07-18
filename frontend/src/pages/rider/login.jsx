import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            if (response.data.role === "RIDER") {
                navigate("/rider/dashboard");
            } else if (response.data.role === "DRIVER") {
                navigate("/driver/dashboard");
            } else {
                alert("Invalid Credentials");
            }

        } catch (error) {
            alert("Login Failed");
        }

    }

    return (

        <div>

            <h1>Login</h1>

            <input
                type="email"
                placeholder="Email"
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

            <button onClick={login}>
                Login
            </button>

        </div>

    );
}

export default Login;