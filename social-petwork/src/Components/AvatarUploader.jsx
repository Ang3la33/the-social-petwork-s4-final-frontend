import React, { useState, useEffect } from "react";
import axios from 'axios';
import filler from "../Assets/Images/filler.png";
import { useUser } from "../Context/UserContext";

const AvatarUploader = ({ userId, initialAvatarUrl, onUploadComplete }) => {
  const { updateUser } = useUser(); // Global context updater
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const defaultAvatar = filler;

  // Update preview when file is selected
  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl); // Clean up
    }
  }, [selectedFile]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const uploadAvatar = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('avatar', selectedFile);

    try {
      const res = await axios.post(
        `http://localhost:8080/users/${userId}/upload-avatar`,
        formData
      );

      const newAvatarUrl = res.data.avatarUrl;

      // ✅ Update in context + localStorage
      updateUser({ avatarUrl: newAvatarUrl });

      // ✅ Update local preview too
      setAvatarUrl(newAvatarUrl);
      setSelectedFile(null);
      setPreview(null);

      // ✅ Trigger optional callback
      onUploadComplete && onUploadComplete(newAvatarUrl);

    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div className="avatar-uploader">
      <img
        src={
          preview
            ? preview
            : avatarUrl?.startsWith("http")
            ? avatarUrl
            : avatarUrl
            ? `http://localhost:8080${avatarUrl}`
            : defaultAvatar
        }
        alt="avatar"
        className="avatar-preview"
        width={150}
        height={150}
        style={{ borderRadius: '50%', objectFit: 'cover' }}
      />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedFile && <button onClick={uploadAvatar}>Upload Avatar</button>}
    </div>
  );
};

export default AvatarUploader;