
import React from 'react';
import '../App.css';
import logoImage from '../Assets/Images/logo.png';

function Navbar() {
  const currentUser = {
    username: 'doglover234',
    avatarUrl: 'https://via.placeholder.com/40'
  };

  return (
    <nav className="navBar">
      <div className="navBar-Container">
        <div className="logo">
          <a href="/">
            <img
              src={logoImage} // will need to change
              alt="The Social Petwork Logo"
            />
          </a>
        </div>

        <div className="search-bar">
          <input
            type="search"
            placeholder="Search"
          />
          <button type="button">Enter</button>
        </div>

        <div className="nav-link">
          <a href="/create-post" className="nav-link">Create Post</a>
          <a href="/browse-users" className="nav-link">Browse Users</a>
        </div>

        <div className="user-profile">
          <a href="/profile" className="profile-link">
          <img
                        src={currentUser.avatarUrl}
                        className="avatar-picture"
                        alt="User avatar"
                      />
            <span className="username">{currentUser.username}</span>

          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;