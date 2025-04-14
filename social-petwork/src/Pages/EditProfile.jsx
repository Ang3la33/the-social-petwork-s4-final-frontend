import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import filler from "../Assets/Images/filler.png";
import AvatarUploader from "../Components/AvatarUploader";

function EditProfile() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    birthday: "",
    about: ""
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!userId || !token) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8080/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          name: data.name || "",
          email: data.email || "",
          username: data.username || "",
          password: "",
          birthday: data.birthday || "",
          about: data.about || "",
          avatarUrl: data.avatarUrl || ""
        });
      })
      .catch(() => navigate("/login"));
  }, [userId, token, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedData = { ...formData };

    // Don't send password if empty
    if (!formData.password.trim()) {
      delete updatedData.password;
    }

    fetch(`http://localhost:8080/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then((updatedUser) => {
        localStorage.setItem("username", updatedUser.username);
        setMessage("Profile updated successfully!");
        setTimeout(() => navigate("/profile"), 1500);
      })
      .catch(() => setMessage("Failed to update profile. Please try again."));
  };

  return (
    <div className="edit-wrapper">
      <div className="edit-box">
          <div className="avatar-section">
            <AvatarUploader
            userId={userId}
            initialAvatarUrl={formData.avatarUrl}
            />
          </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <label>Edit Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>Edit Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter a New Username Here"
            value={formData.username}
            onChange={handleChange}
            required
          />

          <label>Edit Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter a New Email Here"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>New Password (leave blank to keep current)</label>
          <input
            type="password"
            name="password"
            placeholder="Enter a New Password"
            value={formData.password}
            onChange={handleChange}
          />

          <label>Edit Birthday</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />

          <label>Edit About Me</label>
          <textarea
            name="about"
            placeholder="Enter a New About Me Here"
            value={formData.about}
            onChange={handleChange}
          />

          <button type="submit" className="save-button">Save Changes</button>
          {message && <p className="edit-message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default EditProfile;