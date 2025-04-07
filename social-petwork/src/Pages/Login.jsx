// src/Pages/Login.jsx
import React from 'react';
import '../App.css';
import Logo from "../Assets/Images/logo.png";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/profile');
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Log In</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input type="text" placeholder="Enter Username Here" />

          <label>Password</label>
          <input type="password" placeholder="Enter Password Here" />

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
