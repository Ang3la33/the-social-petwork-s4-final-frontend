import React, { useState, useEffect, useCallback } from "react";
import { LiaComment } from "react-icons/lia";
import axios from "axios";
import "../App.css";
import filler from "../Assets/Images/filler.png";

const API_BASE = "http://15.222.242.215:8080";

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

    axios.get(`${API_BASE}/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Failed to fetch user", err));

    axios.get(`${API_BASE}/users/${userId}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUserPostsCount(res.data.length))
      .catch(() => setUserPostsCount(0));

    axios.get(`${API_BASE}/users/${userId}/followers`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setFollowersCount(res.data.length))
      .catch(() => setFollowersCount(0));

    axios.get(`${API_BASE}/users/${userId}/following`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setFollowingCount(res.data.length))
      .catch(() => setFollowingCount(0));
  }, [userId, token]);

  useEffect(() => {
    const fetchPosts = () => {
      axios
        .get(`${API_BASE}/posts`)
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
        const res = await axios.get(`${API_BASE}/users`, {
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
      .post(`${API_BASE}/posts`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setNewPostContent("");
        setImageFile(null);
        return axios.get(`${API_BASE}/posts`);
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
                src={user.avatarUrl ? `${API_BASE}${user.avatarUrl}` : filler}
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
                      src={person.avatarUrl ? `${API_BASE}${person.avatarUrl}` : filler}
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
      .get(`${API_BASE}/comments/post/${post.id}`, {
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

  useEffect(() => {
    if (showCommentBox) fetchComments();
  }, [showCommentBox, fetchComments]);

  const handleCommentSubmit = () => {
    if (!comment.trim() || !user) return;

    axios
      .post(
        `${API_BASE}/comments`,
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

  return (
    <div className="post-box">
      <div className="post-header">
        <img
          src={post.user?.avatarUrl ? `${API_BASE}${post.user.avatarUrl}` : filler}
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
            src={`${API_BASE}${post.imageUrl}`}
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
              placeholder="Paw in your ideas..."
              className="comment-input"
            />
            <button className="comment-submit" onClick={handleCommentSubmit}>
              Comment
            </button>
          </div>

          <div className="comment-list">
            {comments.map((c) => (
              <div key={c.id} className="comment-item-post">
                <strong>{c.username || "Anonymous"}</strong>: {c.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;
