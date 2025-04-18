import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { BASE_URL } from "../config";

function EditProfile() {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setFormData({ name: data.name || "", bio: data.bio || "" });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [userId, user.token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user profile.");
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="page-content">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
