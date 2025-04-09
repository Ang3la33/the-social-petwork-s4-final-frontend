import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { LiaComment } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import filler from "../Assets/Images/filler.png";

function Profile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
      return;
    }

    // Fetch user profile data
    fetch(`http://localhost:8080/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user data.");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });

    // Fetch user's posts
    fetch(`http://localhost:8080/users/${userId}/posts`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts.");
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => {
        console.error(err);
        setPosts([]);
      });
  }, [userId, token, navigate]);

  if (!user) {
    return <div className="profile-wrapper">Loading profile...</div>;
  }

  return (
    <div className="profile-wrapper">
      <div className="profile-box">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-left">
            <img src={filler} alt="Avatar" className="avatar" />
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
                <span className="number">{posts.length}</span>
              </div>
              <div className="stat">
                <span className="caption">Followers</span>
                <span className="number">--</span>
              </div>
              <div className="stat">
                <span className="caption">Following</span>
                <span className="number">--</span>
              </div>
            </div>
          </div>
        </div>

        {/* Birthday Section */}
        <div className="birthday-section">
          <h4 className="birthday-header">Birthday</h4>
          <p>{user.birthday && user.birthday !== "empty" ? user.birthday : "Not set yet"}</p>
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
            {user.about && user.about !== "empty"
              ? user.about
              : "No info yet. Tell us about yourself!"}
          </p>
        </div>

        {/* Post Section */}
        <div className="posts-section">
          <h4 className="posts-header">My Posts</h4>
          {posts.length === 0 ? (
            <p className="post-placeholder">You haven't posted anything yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post.id} className="post-box">
                <div className="post-header">
                  <img src={filler} alt="Avatar" className="post-avatar" />
                  <div className="post-user-info">
                    <span className="post-username">{user.username}</span>
                    <span className="post-time">{post.timestamp || "Just now"}</span>
                  </div>
                </div>
                <p className="post-content">{post.content}</p>
                <div className="post-footer">
                  <LiaComment />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
