import React, { useEffect, useState } from "react";
import "../App.css";
import filler from "../Assets/Images/filler.png";

function BrowseUsers() {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = parseInt(localStorage.getItem("userId"), 10);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 1. Fetch all users
        const usersResponse = await fetch("http://99.79.59.205:8080/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!usersResponse.ok) throw new Error("Failed to fetch users");
        const usersData = await usersResponse.json();
        setUsers(usersData);

        // 2. Fetch following relationships
        const followingResponse = await fetch(
          `http://99.79.59.205:8080/users/${userId}/following`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!followingResponse.ok) throw new Error("Failed to fetch following");

        const followingData = await followingResponse.json();

        const followingIds = new Set(
          followingData
            .map((f) => f.followedUser?.id)
            .filter((id) => typeof id === "number")
        );

        console.log("✅ Loaded following IDs:", Array.from(followingIds));
        setFollowing(followingIds);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Could not load users.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token]);

  const handleFollowToggle = async (targetId) => {
    const isFollowing = following.has(targetId);
    const url = `http://99.79.59.205:8080/users/${userId}/${isFollowing ? "unfollow" : "follow"}/${targetId}`;
    const method = isFollowing ? "DELETE" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Follow/unfollow failed");
      }

      setFollowing((prev) => {
        const updated = new Set(prev);
        if (isFollowing) {
          updated.delete(targetId);
        } else {
          updated.add(targetId);
        }
        return updated;
      });
    } catch (err) {
      console.error("Follow toggle error:", err);
      alert("Could not update follow status.");
    }
  };

  if (loading) return <div className="loading">Loading users...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="browse-users-wrapper">
      <h2>Find Your Furiends</h2>
      <div className="browse-users-list">
        {users
          .filter((u) => u.id !== userId)
          .map((user) => {
            const isFollowing = following.has(user.id);
            return (
              <div key={user.id} className="browse-user-card">
                <div className="browse-user-left">
                  <img
                    src={
                      user.avatarUrl
                        ? `http://99.79.59.205:8080${user.avatarUrl}`
                        : filler
                    }
                    alt={user.username}
                    className="browse-user-avatar"
                  />
                  <div className="browse-user-info">
                    <h4>{user.username}</h4>
                    <p>
                      {user.about && user.about !== "empty"
                        ? user.about
                        : "Loves walks & treats!"}
                    </p>
                  </div>
                </div>
                <div className="browse-user-right">
                  <button
                    className={`follow-button ${
                      isFollowing ? "following" : ""
                    }`}
                    onClick={() => handleFollowToggle(user.id)}
                  >
                    {isFollowing ? "Unfollow" : "Follow"}
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default BrowseUsers;