import { useState } from "react";
import api from "../../api/api";

function Register() {

   const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: ""
});

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/api/riders/register",
                form
            );

            alert(response.data);

        } catch (error) {

            alert("Registration Failed");

            console.log(error);

        }

    };

    return (

        <div style={{padding:"30px"}}>

            <h2>EVOLT RIDE Registration</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <br/><br/>

                <input
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={handleChange}
                />
                 <br /><br />

<input
    type="password"
    name="password"
    placeholder="Password"
    onChange={handleChange}
/>

                <br/><br/>

                <button type="submit">
                    Register
                </button>

            </form>

        </div>

    );

}

export default Register;