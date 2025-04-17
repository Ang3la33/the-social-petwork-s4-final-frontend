// src/Context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    username: '',
    avatarUrl: ''
  });

  // Load from localStorage once at start
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedAvatar = localStorage.getItem("avatar");

    if (storedUsername) {
      setUser({
        username: storedUsername,
        avatarUrl: storedAvatar || ""
      });
    }
  }, []);

  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);

    if (newData.username) localStorage.setItem("username", newData.username);
    if (newData.avatarUrl) localStorage.setItem("avatar", newData.avatarUrl);
  };

  const refreshUser = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) return;

    try {
      const res = await axios.get(`http://99.79.59.205:8080/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = res.data;

      updateUser({
        username: userData.username,
        avatarUrl: userData.avatarUrl || "",
      });
    } catch (err) {
      console.error("Failed to refresh user in context", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, updateUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}