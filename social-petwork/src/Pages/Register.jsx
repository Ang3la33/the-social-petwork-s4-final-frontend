import React, { useState } from 'react';
import '../App.css';
import Logo from "../Assets/Images/logo.png";
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Basic password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const newUser = {
      name: formData.name,
      email: formData.email,
      username: formData.username,
      password: formData.password
    };

    try {
      const response = await fetch("http://99.79.59.205:8080/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        navigate('/login'); // Redirect to login after success
      } else {
        const data = await response.json();
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Create a Unique Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username Here"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Enter Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter Email Here"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password Here"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter Password Again Here"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />

          {error && <p className="form-error">{error}</p>}

          <button type="submit">Create Account</button>
        </form>

        <img src={Logo} alt="The Social Petwork Logo" className="logo" />
        <h3 className="welcome-text">Welcome to The Social Petwork</h3>
      </div>
    </div>
  );
}

export default Register;
