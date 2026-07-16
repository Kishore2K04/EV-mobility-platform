import { useState } from "react";
import api from "../../api/api";

function Register() {

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        vehicleNumber: "",
        password: ""
    });

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response = await api.post(
                "/api/drivers/register",
                form
            );

            alert(response.data);

            setForm({
                fullName: "",
                email: "",
                phoneNumber: "",
                vehicleNumber: "",
                password: ""
            });

        } catch (err) {

            console.log(err);

            alert("Driver Registration Failed");

        }

    }

    return (

        <div style={{padding:"30px"}}>

            <h2>EVOLT Driver Registration</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="fullName"
                    placeholder="Full Name"
                    value={form.fullName}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={form.phoneNumber}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    name="vehicleNumber"
                    placeholder="Vehicle Number"
                    value={form.vehicleNumber}
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <br/><br/>

                <button type="submit">

                    Register Driver

                </button>

            </form>

        </div>

    );

}

export default Register;