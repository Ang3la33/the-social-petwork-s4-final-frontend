import React from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import filler from "../Assets/Images/filler.png";

function Profile() {
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-left">
          <img src={filler} alt="Avatar" className="avatar" />
          <div className="user-info">
            <h3 className="username">username</h3> 
            <Link to="/edit-profile" className="edit-icon-link">
              <FaEdit className="edit-icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
