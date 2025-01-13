import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleSubmitForm = (event) => {
    event.preventDefault();

    // Validate inputs
    if (name === "" || email === "" || password === "") {
      setError("Please enter all the details.");
      return;
    }

    // Check if user already exists
    const userExists = users.some((user) => user.email === email);
    if (userExists) {
      setError("An account with this email already exists. Please use another email.");
      return;
    }

    // Create new user object
    const newUser = { name, email, password };

    // Send POST request to the backend to save the new user
    axios
      .post("https://invoice-api-m6ei.onrender.com/users", newUser)
      .then((res) => {
        setUsers([...users, newUser]);  // Update users state
        setEmail("");
        setName("");
        setPassword("");
        setError("");
        navigate("/"); // Redirect to login page
      })
      .catch((err) => {
        console.error("Failed to create user", err);
        setError("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h1 className="text-center mb-4">SignUp Page</h1>
        <form onSubmit={handleSubmitForm}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Enter UserName
            </label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Enter Email
            </label>
            <input
              type="email"
              name="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Enter Password
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
        <p className="text-danger">{error}</p>
      </div>
    </div>
  );
};

export default SignUp;
