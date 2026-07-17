import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      if (response.data.role === "RIDER") {
    navigate("/rider/dashboard");
    }
    else if (response.data.role === "DRIVER") {
        navigate("/driver/dashboard");
    }
    else {
        alert("Invalid Login");
    }
    } catch (error) {
      alert("Login Failed");
    }
    }

  return (
    <div>
      <h1>EVOLT RIDE Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;