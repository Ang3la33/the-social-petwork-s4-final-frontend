// src/Pages/Register.jsx
import React from 'react';
import '../App.css';
import Logo from "../Assets/Images/logo.png";
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    // Placeholder for future logic
    navigate('/profile');
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <label>Create a Unique Username</label>
          <input type="text" placeholder="Enter Username Here" />

          <label>Enter Email</label>
          <input type="email" placeholder="Enter Email Here" />

          <label>Password</label>
          <input type="password" placeholder="Enter Password Here" />

          <label>Confirm Password</label>
          <input type="password" placeholder="Enter Password Again Here" />

          <button type="submit">Create Account</button>
        </form>

        <img src={Logo} alt="The Social Petwork Logo" className="logo" />
        <h3 className="welcome-text">Welcome to The Social Petwork</h3>
      </div>
    </div>
  );
}

export default Register;
