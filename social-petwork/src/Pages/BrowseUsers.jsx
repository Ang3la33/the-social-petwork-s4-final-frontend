import React, { useEffect, useState } from "react";
import "../App.css";
import filler from "../Assets/Images/filler.png";

function BrowseUsers() {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = 999; 
  const token = "fake-token"; 


  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchFollowing = async () => {
    try {
      const response = await fetch(`/api/users/${userId}/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch following");
      }

      const data = await response.json();
      const followingSet = new Set(
        data.map((follow) => follow.targetId || follow.followingId)
      );
      setFollowing(followingSet);
    } catch (err) {
      console.error("Error fetching following:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchFollowing()]);
    };

    loadData();
  }, []);

  const handleFollowToggle = async (otherUserId) => {
    const isFollowing = following.has(otherUserId);

    try {
      let response;

      if (isFollowing) {
        response = await fetch(`/api/users/${userId}/unfollow/${otherUserId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      } else {
        response = await fetch(`/api/users/${userId}/follow/${otherUserId}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
      }

      if (!response.ok) {
        throw new Error(
          `Failed to ${isFollowing ? "unfollow" : "follow"} user`
        );
      }
      if (isFollowing) {
        setFollowing((prev) => {
          const updated = new Set(prev);
          updated.delete(otherUserId);
          return updated;
        });
        console.log(`Unfollowed user ${otherUserId}`);
      } else {
        setFollowing((prev) => new Set(prev).add(otherUserId));
        console.log(`Followed user ${otherUserId}`);
      }
    } catch (err) {
      console.error(
        `Error ${isFollowing ? "unfollowing" : "following"} user:`,
        err
      );
      alert(
        `Failed to ${
          isFollowing ? "unfollow" : "follow"
        } user. Please try again.`
      );
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="browse-users-wrapper">
      <h2>Find Your Fur-iends</h2>
      <div className="browse-users-list">
        {users
          .filter((u) => u.id !== userId) 
          .map((user) => (
            <div key={user.id} className="browse-user-card">
              <div className="browse-user-left">
                <img
                  src={user.avatar || filler}
                  alt={user.username}
                  className="browse-user-avatar"
                />
                <div className="browse-user-info">
                  <h4>{user.username}</h4>
                  <p>{user.bio || "Loves walks & treats!"}</p>
                </div>
              </div>
              <div className="browse-user-right">
                <button
                  className={`follow-button ${
                    following.has(user.id) ? "following" : ""
                  }`}
                  onClick={() => handleFollowToggle(user.id)}
                >
                  {following.has(user.id) ? "Unfollow" : "Follow"}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BrowseUsers;
