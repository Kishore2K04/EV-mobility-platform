import { useState } from "react";
import api from "../api/api";

function RegisterForm() {

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("/api/riders/register", formData);

            alert(response.data);

        } catch (error) {

            alert("Registration Failed");

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h2>Register Rider</h2>

            <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
            />

            <br /><br />

            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
            />

            <br /><br />

            <button type="submit">
                Register
            </button>

        </form>

    );

}

export default RegisterForm;