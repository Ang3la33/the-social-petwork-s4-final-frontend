import React, { useState } from "react";
import { LiaComment } from "react-icons/lia";
import "../App.css";
import filler from "../Assets/Images/filler.png";

function Post() {
  // Fake data for now
  const user = {
    username: "doglover123",
    avatar: filler,
    followers: 2020,
    following: 75,
    posts: 22,
    about:
      "Hi! I'm Deino. I love long walks, barking at birds, and meeting other pups on The Social Petwork!",
  };

  const posts = [
    {
      postId: 1,
      username: "doglover123",
      avatar: filler,
      content: "Had an amazing walk in the park today! #doglife",
      postTime: "2 hours ago",
      createdAt: "2025-04-08T10:14:00",
    },
    {
      postId: 2,
      username: "puppylove",
      avatar: filler,
      content: "Met some new dog friends! Feeling happy!",
      postTime: "5 hours ago",
      createdAt: "2025-04-08T10:15:00",
    },
  ];

  const peopleYouMayKnow = [
    { id: 1, name: "Loki", avatar: filler },
    { id: 2, name: "Oreo", avatar: filler },
    { id: 3, name: "Ralph", avatar: filler },
  ];

  return (
    <div className="post-page-wrapper">
      <div className="post-page-box">
        {/* Left Section Feed */}
        <div className="posts-feed">
          {posts.map((post) => (
            <PostBox key={post.postId} post={post} />
          ))}
        </div>

        {/* Right Side:  User Profile + Suggested People */}
        <div className="right-sidebar">
          {/* User Profile Box */}
          <div className="user-profile-box">
            <img src={user.avatar} alt="Avatar" className="user-avatar" />
            <h3 className="user-username">{user.username}</h3>
            <div className="user-stats">
              <div className="stat">
                <span className="stat-label">Posts</span>
                <span className="stat-number">{user.posts}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Followers</span>
                <span className="stat-number">{user.followers}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Following</span>
                <span className="stat-number">{user.following}</span>
              </div>
            </div>
          </div>
          {/* People You May Know */}
          <div className="people-you-may-know">
            <h4>Sniffing New Pals</h4>
            <div className="suggested-people">
              {peopleYouMayKnow.map((person) => (
                <div key={person.id} className="suggested-person">
                  <img
                    src={person.avatar}
                    alt="Person Avatar"
                    className="suggested-person-avatar"
                  />
                  <span className="suggested-person-name">{person.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostBox({ post }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");

  const handleCommentClick = () => {
    setShowCommentBox((prev) => !prev);
  };

  return (
    <div className="post-box">
      <div className="post-header">
        <img src={post.avatar} alt="Avatar" className="post-avatar" />
        <div className="post-user-info">
          <span className="post-username">{post.username}</span>
          <span className="post-time">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <p className="post-content">{post.content}</p>

      <div className="post-footer">
        <LiaComment className="comment-icon" onClick={handleCommentClick} />
      </div>

      {showCommentBox && (
        <div className="comment-box">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Paw in your ideas..."
            className="comment-input"
          />
          <button className="comment-submit">Comment</button>
        </div>
      )}
    </div>
  );
}

export default Post;
