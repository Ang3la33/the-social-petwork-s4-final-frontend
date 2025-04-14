import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
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
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
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

    fetch(`http://localhost:8080/users/${userId}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch(() => setPosts([]));

    fetch(`http://localhost:8080/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFollowersCount(data.length))
      .catch(() => setFollowersCount(0));

    fetch(`http://localhost:8080/users/${userId}/following`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setFollowingCount(data.length))
      .catch(() => setFollowingCount(0));
  }, [userId, token, navigate]);

  const removePostFromList = (deletedPostId) => {
    setPosts((prev) => prev.filter((p) => p.id !== deletedPostId));
  };

  if (!user) return <div className="profile-wrapper">Loading profile...</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-box">
        <div className="profile-header">
          <div className="profile-left">
            <img
              src={
                user.avatarUrl?.startsWith("http")
                  ? user.avatarUrl
                  : user.avatarUrl
                  ? `http://localhost:8080${user.avatarUrl}`
                  : filler
              }
              alt="Avatar"
              className="avatar"
            />
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
                <span className="number">{followersCount}</span>
              </div>
              <div className="stat">
                <span className="caption">Following</span>
                <span className="number">{followingCount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="birthday-section">
          <h4 className="birthday-header">Birthday</h4>
          <p>
            {user.birthday && user.birthday !== "empty"
              ? user.birthday
              : "Not set yet"}
          </p>
        </div>

        <div className="about-me-section">
          <div className="about-header">
            <h4>About Me</h4>
            <Link to="/edit-profile" className="edit-icon-link">
              <FaEdit className="edit-icon" />
            </Link>
          </div>
          <p className="about-text">
            {user.about && user.about !== "empty"
              ? user.about
              : "No info yet. Tell us about yourself!"}
          </p>
        </div>

        <div className="posts-section">
          <h4 className="posts-header">My Posts</h4>
          {posts.length === 0 ? (
            <p className="post-placeholder">You haven't posted anything yet.</p>
          ) : (
            [...posts]
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((post) => (
                <ProfilePost
                  key={post.id}
                  post={post}
                  user={user}
                  token={token}
                  onDelete={removePostFromList}
                />
              ))
          )}
        </div>
      </div>
    </div>
  );
}

function ProfilePost({ post, user, token, onDelete }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    fetch(`http://localhost:8080/comments/post/${post.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) =>
        setComments(data.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt)))
      )
      .catch((err) => console.error("Failed to load comments:", err));
  };

  useEffect(() => {
    if (showCommentBox) fetchComments();
  }, [showCommentBox]);

  const handleCommentSubmit = () => {
    if (!comment.trim()) return;

    fetch("http://localhost:8080/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content: comment,
        user: { id: user.id },
        post: { id: post.id },
      }),
    })
      .then(() => {
        setComment("");
        fetchComments();
      })
      .catch((err) => console.error("Failed to post comment:", err));
  };

  const handlePostDelete = () => {
    if (!window.confirm("Delete this post and its comments?")) return;

    fetch(`http://localhost:8080/posts/${post.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => onDelete(post.id))
      .catch((err) => console.error("Failed to delete post:", err));
  };

  const handleCommentDelete = (commentId) => {
    fetch(`http://localhost:8080/comments/${commentId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => fetchComments())
      .catch((err) => console.error("Failed to delete comment:", err));
  };

  return (
    <div className="post-box">
      <div className="post-header">
        <div className="post-user-info">
          <img
            src={
              user.avatarUrl?.startsWith("http")
                ? user.avatarUrl
                : user.avatarUrl
                ? `http://localhost:8080${user.avatarUrl}`
                : filler
            }
            alt="Avatar"
            className="post-avatar"
          />
          <span className="post-username">{user.username}</span>
        </div>
        <div className="post-header-right">
          {user?.id === post.user?.id && (
            <FaTrashAlt className="delete-icon" onClick={handlePostDelete} />
          )}
          <span className="post-time">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <p className="post-content">{post.content}</p>

      {post.imageUrl && (
        <div className="post-image-box">
          <img
            src={`http://localhost:8080${post.imageUrl}`}
            alt="Post visual"
            className="post-image"
          />
        </div>
      )}

      <div className="post-footer">
        <LiaComment
          className="comment-icon"
          onClick={() => setShowCommentBox((prev) => !prev)}
        />
      </div>

      {showCommentBox && (
        <div className="comment-section">
          <div className="comment-box">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Woof! Share your thoughts here..."
              className="comment-input"
            />
            <button className="comment-submit" onClick={handleCommentSubmit}>
              Comment
            </button>
          </div>

          <div className="comment-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item-profile">
                <strong>{c.username || "Anonymous"}</strong>: {c.content}
                <FaTrashAlt
                  className="delete-icon comment-delete"
                  onClick={() => handleCommentDelete(c.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;