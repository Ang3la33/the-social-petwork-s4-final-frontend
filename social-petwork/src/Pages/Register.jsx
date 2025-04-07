// src/Pages/Register.jsx

import React from 'react';

function Register() {
  return (
    <div className="register-page">
      <h2>Register</h2>
      <form>
        <div>
          <label>Username:</label>
          <input type="text" placeholder="Choose a username" />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" placeholder="Create a password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
