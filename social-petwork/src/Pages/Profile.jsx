import React from "react";
import { FaEdit } from "react-icons/fa";
import { LiaComment } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import filler from "../Assets/Images/filler.png";

function Profile() {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  const birthday = localStorage.getItem("birthday");
  const about = localStorage.getItem("about");

  // Redirect to login if no user is found in localStorage
  if (!username) {
    navigate("/login");
    return null;
  }

  const user = {
    username,
    birthday: birthday !== "empty" ? birthday : null,
    about: about !== "empty" ? about : null,
    avatar: filler,
    posts: "--",       // Placeholder
    followers: "--",   // Placeholder
    following: "--",   // Placeholder
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-box">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-left">
            <img src={user.avatar} alt="Avatar" className="avatar" />
            <div className="user-info">
              <h3 className="username">{user.username}</h3>
              <Link to="/edit-profile" className="edit-icon-link">
                <FaEdit className="edit-icon" />
              </Link>
            </div>
          </div>

          <div className="profile-right">
            <div className="profile-stats">
              <div className="stat">
                <span className="caption">Posts</span>
                <span className="number">{user.posts}</span>
              </div>
              <div className="stat">
                <span className="caption">Followers</span>
                <span className="number">{user.followers}</span>
              </div>
              <div className="stat">
                <span className="caption">Following</span>
                <span className="number">{user.following}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Birthday Section */}
        <div className="birthday-section">
          <h4 className="birthday-header">Birthday</h4>
          <p>{user.birthday || "Not set yet"}</p>
        </div>

        {/* About Me Section */}
        <div className="about-me-section">
          <div className="about-header">
            <h4>About Me</h4>
            <Link to="/edit-about" className="edit-icon-link">
              <FaEdit className="edit-icon" />
            </Link>
          </div>
          <p className="about-text">
            {user.about || "No info yet. Tell us about yourself!"}
          </p>
        </div>

        {/* Post Section */}
        <div className="posts-section">
        <h4 className="posts-header">My Posts</h4>
        {[
          {
            postId: 1,
            content: "Just had a 2-hour nap and I feel amazing. #doglife",
            postTime: "2 hours ago"
          },
          {
            postId: 2,
            content: "Mom gave me a bath today. I’m not thrilled. 🛁",
            postTime: "6 hours ago"
          }
        ].map((post) => (
          <div key={post.postId} className="post-box">
            <div className="post-header">
              <img src={filler} alt="Avatar" className="post-avatar" />
              <div className="post-user-info">
                <span className="post-username">{user.username}</span>
                <span className="post-time">{post.postTime}</span>
              </div>
            </div>

          <p className="post-content">{post.content}</p>

          <div className="post-footer">
            <LiaComment />
          </div>
        </div>
      ))}
      </div>
      </div>
    </div>
  );
}

export default Profile;
