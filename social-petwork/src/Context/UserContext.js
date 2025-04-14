// src/Context/UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export function useUser() {
  return useContext(UserContext);
}

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    username: '',
    avatarUrl: ''
  });

  // Load from localStorage when app starts
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

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}
