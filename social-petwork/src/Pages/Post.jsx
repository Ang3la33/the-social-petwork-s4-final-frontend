import React, { useState, useEffect, useCallback } from "react";
import { LiaComment } from "react-icons/lia";
import axios from "axios";
import "../App.css";
import filler from "../Assets/Images/filler.png";
import { BASE_URL } from "../config";

function Post() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [userPostsCount, setUserPostsCount] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!userId || !token) return;

    axios.get(`${BASE_URL}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch user", err));

    axios.get(`${BASE_URL}/users/${userId}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUserPostsCount(res.data.length))
      .catch(() => setUserPostsCount(0));

    axios.get(`${BASE_URL}/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setFollowersCount(res.data.length))
      .catch(() => setFollowersCount(0));

    axios.get(`${BASE_URL}/users/${userId}/following`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setFollowingCount(res.data.length))
      .catch(() => setFollowingCount(0));
  }, [userId, token]);

  useEffect(() => {
    const fetchPosts = () => {
      axios
        .get(`${BASE_URL}/posts`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error("Failed to fetch posts:", err));
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const filtered = res.data.filter((u) => u.id !== parseInt(userId));
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setSuggestedUsers(shuffled.slice(0, 4));
      } catch (err) {
        console.error("Failed to load suggested users:", err);
      }
    };

    if (userId && token) {
      fetchSuggestedUsers();
    }
  }, [userId, token]);

  const handlePostSubmit = () => {
    if (!newPostContent.trim() || !user) return;

    const formData = new FormData();
    formData.append("content", newPostContent);
    formData.append("userId", user.id);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    axios
      .post(`${BASE_URL}/posts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setNewPostContent("");
        setImageFile(null);
        return axios.get(`${BASE_URL}/posts`);
      })
      .then((res) => setPosts(res.data))
      .catch((err) =>
        console.error("Failed to create post or refresh:", err.response || err)
      );
  };

  return (
    <div className="post-page-wrapper">
      <div className="post-page-box">
        <div className="posts-feed">
          <div className="create-post-box">
            <textarea
              placeholder="What's barking today?"
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="create-post-input"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="image-input"
            />
            <button className="create-post-button" onClick={handlePostSubmit}>
              Post
            </button>
          </div>

          {[...posts]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((post) => (
              <PostBox key={post.id} post={post} user={user} token={token} />
            ))}
        </div>

        <div className="right-sidebar">
          {user && (
            <div className="user-profile-box">
              <img
                src={user.avatarUrl ? `${BASE_URL}${user.avatarUrl}` : filler}
                alt="Avatar"
                className="user-avatar"
              />
              <h3 className="user-username">{user.username}</h3>
              <div className="user-stats">
                <div className="stat">
                  <span className="stat-label">Posts</span>
                  <span className="stat-number">{userPostsCount}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Followers</span>
                  <span className="stat-number">{followersCount}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">Following</span>
                  <span className="stat-number">{followingCount}</span>
                </div>
              </div>
            </div>
          )}

          <div className="people-you-may-know">
            <h4>Sniffing New Pals</h4>
            <div className="suggested-people">
              {suggestedUsers.length === 0 ? (
                <p>No other users found.</p>
              ) : (
                suggestedUsers.map((person) => (
                  <div key={person.id} className="suggested-person">
                    <img
                      src={person.avatarUrl ? `${BASE_URL}${person.avatarUrl}` : filler}
                      alt="Avatar"
                      className="avatar-picture"
                    />
                    <span className="suggested-person-name">{person.username}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostBox({ post, user, token }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const fetchComments = useCallback(() => {
    axios
      .get(`${BASE_URL}/comments/post/${post.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const sorted = [...res.data].sort(
          (a, b) => new Date(b.postedAt) - new Date(a.postedAt)
        );
        setComments(sorted);
      })
      .catch((err) => console.error("Failed to fetch comments:", err));
  }, [post.id, token]);

  const handleDeletePost = async () => {
    try {
      const res = await fetch(`${BASE_URL}/posts/${post.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        window.location.reload();
      } else {
        const msg = await res.text();
        alert("Failed to delete post: " + msg);
      }
    } catch (err) {
      console.error("Error deleting post", err);
      alert("Something went wrong.");
    }
  };

  const handleCommentSubmit = () => {
    if (!comment.trim() || !user) return;

    axios
      .post(
        `${BASE_URL}/comments`,
        {
          content: comment,
          user: { id: user.id },
          post: { id: post.id },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        setComment("");
        fetchComments();
      })
      .catch((err) =>
        console.error("❌ Failed to post comment:", err.response?.data || err.message)
      );
  };

  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      axios
        .delete(`${BASE_URL}/comments/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => fetchComments())
        .catch((err) => {
          console.error("❌ Failed to delete comment:", err.response?.data || err.message);
          alert("Failed to delete comment.");
        });
    }
  };

  useEffect(() => {
    if (showCommentBox) fetchComments();
  }, [showCommentBox, fetchComments]);

  return (
    <div className="post-box">
      <div className="post-header">
        <img
          src={post.user?.avatarUrl ? `${BASE_URL}${post.user.avatarUrl}` : filler}
          alt="Avatar"
          className="post-avatar"
        />
        <div className="post-user-info">
          <span className="post-username">{post.user?.username || "Unknown"}</span>
          <span className="post-time">{new Date(post.createdAt).toLocaleString()}</span>
        </div>
      </div>

      <p className="post-content">{post.content}</p>

      {post.imageUrl && (
        <div className="post-image-box">
          <img
            src={`${BASE_URL}${post.imageUrl}`}
            alt="Post visual"
            className="post-image"
          />
        </div>
      )}

      <div className="post-footer">
        <button
          className="comment-button"
          onClick={() => setShowCommentBox((prev) => !prev)}
        >
          <LiaComment className="comment-icon" />
          Comment
        </button>

        <button
          onClick={handleDeletePost}
          className="delete-post-button"
        >
          🗑️ Delete
        </button>
      </div>

      {showCommentBox && (
        <div className="comment-section">
          <div className="comment-box">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Paw in your ideas..."
              className="comment-input"
            />
            <button className="comment-submit" onClick={handleCommentSubmit}>
              Comment
            </button>
          </div>

          <div className="comment-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item-profile">
                <span>
                  <strong>{c.username || "Anonymous"}</strong>: {c.content}
                </span>
                <span
                  className="comment-delete"
                  title="Delete comment"
                  onClick={() => handleDeleteComment(c.id)}
                >
                  🗑
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
