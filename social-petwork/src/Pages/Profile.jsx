import React from "react";
import { FaEdit } from "react-icons/fa";
import { LiaComment } from "react-icons/lia";
import { Link } from "react-router-dom";
import "../App.css";
import filler from "../Assets/Images/filler.png";

function Profile() {
  // Fake values for now
  const user = {
    username: "doglover123",
    name: "Deino Dog",
    avatar: filler,
    followers: 2020,
    posts: 22,
    following: 75,
    about:
      "Hi! I'm Deino. I am a fat pug who loves to sleep and eat!",
    postDetails: [
      {
        postId: 1,
        content: "Had an amazing two hour nap today! #doglife",
        postTime: "2 hours ago",
      },
      {
        postId: 2,
        content: "Mom made me take a bath :(",
        postTime: "6 hours ago",
      },
    ],
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-box">
        {/* Left side */}
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

          {/* Right side */}
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

        {/* About Me Section */}
        <div className="about-me-section">
          <div className="about-header">
            <h4>About Me</h4>
            <Link to="/edit-about" className="edit-icon-link">
              <FaEdit className="edit-icon" />
            </Link>
          </div>
          <p className="about-text">{user.about || "I am a fat pug"}</p>
        </div>

        {/* Post Section */}
        <div className="posts-section">
          <h4 className="posts-header">My Posts</h4>
          {user.postDetails.map((post) => (
            <div key={post.postId} className="post-box">
              <div className="post-header">
                <img src={user.avatar} alt="Avatar" className="post-avatar" />
                <div className="post-user-info">
                  <span className="post-username">{user.username}</span>
                  <span className="post-time">{post.postTime}</span>
                </div>
              </div>

              {/* Post Content */}
              <p className="post-content">{post.content}</p>

              {/* Comment Icon */}
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
