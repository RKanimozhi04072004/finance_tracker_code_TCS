import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/Api";

function Login() {
    const navigate = useNavigate();

    const [login, setLogin] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
        });
    };


    const loginUser = async (e) => {
    e.preventDefault();

    if (!login.email || !login.password) {
        alert("Please enter email and password.");
        return;
    }

    try {
        const response = await API.post("/auth/login", login);

        console.log(response.data);

        // Store JWT Token
        localStorage.setItem("token", response.data.token);

        // Store User Details
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
            })
        );

        alert("Login Successful");

        navigate("/dashboard");

    } catch (error) {

        if (error.response) {
            alert(error.response.data.message || "Invalid Email or Password");
        } else {
            alert("Server Not Running");
        }
    }
};
    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="text-center mb-4">Login</h2>

            <form onSubmit={loginUser}>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter Email"
                        value={login.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        name="password"
                        placeholder="Enter Password"
                        value={login.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>

            <div className="text-center mt-3">
                <p>
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;