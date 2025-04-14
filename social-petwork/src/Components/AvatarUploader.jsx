import React, {useState, useEffect} from "react";
import axios from 'axios';
import filler from "../Assets/Images/filler.png"; 

const AvatarUploader = ({ userId, initialAvatarUrl, onUploadComplete }) => {
    const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const defaultAvatar = filler;

    useEffect(() => {
        if (selectedFile) {
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
            return () => URL.revokeObjectURL(objectUrl);
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
            const res = await axios.post(`http://localhost:8080/users/${userId}/upload-avatar`, formData);
            setAvatarUrl(res.data.avatarUrl);
            onUploadComplete && onUploadComplete(res.data.avatarUrl);
            setSelectedFile(null);
        } catch (err) {
            console.error('Upload failed: ', err);
        }
    };

    return (
        <div className="avatar-uploader">
            <img
                src={preview || avatarUrl || defaultAvatar}
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
