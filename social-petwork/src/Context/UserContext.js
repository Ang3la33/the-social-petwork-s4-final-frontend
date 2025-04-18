import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${BASE_URL}/users/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
          setAvatarUrl(response.data.avatarUrl);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, avatarUrl, setAvatarUrl }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);