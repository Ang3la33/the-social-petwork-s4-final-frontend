import React, { useState, useEffect } from "react";
import { LiaComment } from "react-icons/lia";
import axios from "axios";
import "../App.css";
import filler from "../Assets/Images/filler.png";

function Post() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const peopleYouMayKnow = [
    { id: 1, name: "Loki", avatar: filler },
    { id: 2, name: "Oreo", avatar: filler },
    { id: 3, name: "Ralph", avatar: filler },
  ];

  // Fetch user info
  useEffect(() => {
    if (!userId || !token) return;

    axios
      .get(`http://localhost:8080/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch user", err));
  }, [userId, token]);

  // Fetch posts on mount + auto-refresh every 10s
  useEffect(() => {
    const fetchPosts = () => {
      axios
        .get("http://localhost:8080/posts") // ✅ No Authorization header here
        .then((res) => {
          console.log("Fetched posts:", res.data); // Optional debug
          setPosts(res.data);
        })
        .catch((err) => console.error("Failed to fetch posts:", err));
    };
  
    fetchPosts(); // Initial load
    const interval = setInterval(fetchPosts, 10000); // Auto-refresh every 10s
  
    return () => clearInterval(interval); // Cleanup
  }, []);

  const handlePostSubmit = () => {
    if (!newPostContent.trim() || !user) return;

    const newPost = {
      content: newPostContent,
    };

    axios
      .post(`http://localhost:8080/posts?userId=${user.id}`, newPost, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setNewPostContent("");
        return axios.get("http://localhost:8080/posts");
      })
      .then((res) => setPosts(res.data))
      .catch((err) =>
        console.error("Failed to create post or refresh:", err.response || err)
      );
  };

  return (
    <div className="post-page-wrapper">
      <div className="post-page-box">
        {/* Left Section Feed */}
        <div className="posts-feed">
          {/* Create Post Box */}
          <div className="create-post-box">
            <textarea
              placeholder="What's barking today?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="create-post-input"
            />
            <button className="create-post-button" onClick={handlePostSubmit}>
              Post
            </button>
          </div>

          {/* Posts Feed */}
          {[...posts]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <PostBox key={post.id} post={post} />
            ))}
        </div>

        {/* Right Sidebar (unchanged) */}
        <div className="right-sidebar">
          {user && (
            <div className="user-profile-box">
              <img
                src={user.avatar || filler}
                alt="Avatar"
                className="user-avatar"
              />
              <h3 className="user-username">{user.username}</h3>
              <div className="user-stats">
                <div className="stat">
                  <span className="stat-label">Posts</span>
                  <span className="stat-number">{user.posts || "--"}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Followers</span>
                  <span className="stat-number">{user.followers || "--"}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Following</span>
                  <span className="stat-number">{user.following || "--"}</span>
                </div>
              </div>
            </div>
          )}

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
        <img
          src={post.user?.avatar || filler}
          alt="Avatar"
          className="post-avatar"
        />
        <div className="post-user-info">
          <span className="post-username">{post.user?.username || "Unknown"}</span>
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
