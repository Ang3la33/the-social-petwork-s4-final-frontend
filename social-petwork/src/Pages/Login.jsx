import React, { useState } from 'react';
import '../App.css';
import Logo from "../Assets/Images/logo.png";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://15.222.242.215:8080/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();

        // Store token and user data (could use localStorage or context)
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.userId);

        navigate("/post"); // Redirect on success
      } else {
        const msg = await response.text();
        setError(msg || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username Here"
            value={credentials.username}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password Here"
            value={credentials.password}
            onChange={handleChange}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Log In</button>
        </form>

        <p className="create-account">
          <a href="/register">Or Create Account Now</a>
        </p>

        <img src={Logo} alt="The Social Petwork Logo" className="logo" />
        <h3 className="welcome-text">Welcome to The Social Petwork</h3>
      </div>
    </div>
  );
}

export default Login;
