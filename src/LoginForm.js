import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // ✅ Handle form submission
    const handleSubmitForm = async (event) => {
        event.preventDefault();

        if (email === "" || password === "") {
            setError("Please enter the details");
            return;
        }

        try {
            // ✅ Send login request to the backend
            const response = await axios.post("https://invoice-api-m6ei.onrender.com/", { email, password });
           console.log(response)
            // ✅ On success, navigate to the home page
            navigate("/home");
        } catch (error) {
            // ✅ Handle errors
            setError(error.response?.data?.message || "Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-lg" style={{ width: '400px' }}>
                <h1 className="text-center mb-4">Login Form</h1>
                <form onSubmit={handleSubmitForm}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Enter Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Enter Password</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
                <p className="text-center mt-3">
                    Don't have an account? <Link to="/signup" className="text-primary">Sign up</Link>
                </p>
                {error && <p className="text-danger text-center">{error}</p>}
            </div>
        </div>
    );
};

export default LoginForm;
