import React, { useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import '../App.css';
import logoImage from '../Assets/Images/greenLogo.png';
import filler from '../Assets/Images/filler.png';
import { useUser } from "../Context/UserContext";

function Navbar() {
  const { user, refreshUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    refreshUser(); // ensures it pulls latest username & avatar
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Remove token, userId, etc.
    navigate("/login");
  };

  return (
    <nav className="navBar">
      <div className="navBar-Container">
        <div className="left-side">
          <div className="logo">
            <a href="/post">
              <img src={logoImage} alt="The Social Petwork Logo" />
            </a>
          </div>
          
        </div>

        <div className="right-side">
          <div className="nav-link">
            <a href="/browse-users" className="nav-link">
              Browse Users
            </a>
          </div>

          <div className="user-profile">
            <a href="/profile" className="profile-link">
              <img
                src={
                  user.avatarUrl?.startsWith("http")
                    ? user.avatarUrl
                    : user.avatarUrl
                    ? `http://99.79.59.205:8080${user.avatarUrl}`
                    : filler
                }
                className="avatar-picture"
                alt="User avatar"
              />
              <span className="name">
                {user.username || "User"}
              </span>
            </a>
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;