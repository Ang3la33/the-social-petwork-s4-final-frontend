import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '../App.css';
import logoImage from '../Assets/Images/greenLogo.png';

function Navbar() {
  const [currentUser, setCurrentUser] = useState({
    username: '',
    avatarUrl: 'https://via.placeholder.com/40'
  });

  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem('username');
    const avatar = localStorage.getItem('avatar'); // optional if you want to save avatar too
    if (username) {
      setCurrentUser(prev => ({
        ...prev,
        username,
        avatarUrl: avatar || prev.avatarUrl
      }));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Remove token, userId, username, etc.
    navigate("/login");   // Redirect to login
  };

  return (
    <nav className="navBar">
      <div className="navBar-Container">
        <div className="logo">
          <a href="/post">
            <img
              src={logoImage}
              alt="The Social Petwork Logo"
            />
          </a>
        </div>

        <div className="search-bar">
          <input type="search" placeholder="Search" />
          <button type="button">
            <FaSearch />
          </button>
        </div>

        <div className="nav-link">
          <a href="/post" className="nav-link">
            Create Post
          </a>
          <a href="/browse-users" className="nav-link">
            Browse Users
          </a>
        </div>

        <div className="user-profile">
          <a href="/profile" className="profile-link">
            <img
              src={currentUser.avatarUrl}
              className="avatar-picture"
              alt="User avatar"
            />
            <span className="name">
              {currentUser.username ? currentUser.username : "User"}
            </span>
          </a>
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
