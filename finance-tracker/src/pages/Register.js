import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/Api";

function Register() {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const register = async () => {

        try {

            await API.post("/auth/register", user);

            alert("Registration Successful");

            navigate("/");

        } catch (error) {

            alert("Registration Failed");

            console.log(error);

        }

    };

    return (

        <div className="container mt-5">

            <h2>Register</h2>

            <input
                className="form-control mb-3"
                placeholder="Name"
                name="name"
                onChange={handleChange}
            />

            <input
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                onChange={handleChange}
            />

            <input
                type="password"
                className="form-control mb-3"
                placeholder="Password"
                name="password"
                onChange={handleChange}
            />

            <button
                className="btn btn-success"
                onClick={register}
            >
                Register
            </button>

        </div>

    );

}

export default Register;