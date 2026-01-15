import React, { useContext, useEffect, useState } from "react";
import "./ProfileUpdate.css";
import assets from "../../assets/assets";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../../context/AppContext";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(AppContext);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userData) return;
    setName(userData.name || "");
    setBio(userData.bio || "");
  }, [userData]);

  const profileUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    setLoading(true);

    try {
      const userRef = doc(db, "users", userData.uid);

      const updatedData = {
        ...userData,
        name: name.trim(),
        bio: bio.trim(),
        avatar: "", // No avatar - using default
      };

      await updateDoc(userRef, updatedData);
      setUserData(updatedData);

      toast.success("Profile updated");
      navigate("/chat");
    } catch (error) {
      console.error(error);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div style={{ padding: 40 }}>Loading...</div>;
  }

  return (
    <div className="profile">
      <div className="profile-container">
        <form onSubmit={profileUpdate}>
          <h3>Profile Details</h3>

          <div style={{ textAlign: 'center', margin: '20px 0' }}>
            <img
              src={assets.avatar_icon}
              alt="Default Avatar"
              style={{ width: '80px', height: '80px', borderRadius: '50%' }}
            />
          </div>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
          />

          <textarea
            placeholder="Write profile bio (optional)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={loading}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </button>
        </form>

        <img
          className="profile-pic"
          src={assets.logo_icon}
          alt="Preview"
        />
      </div>
    </div>
  );
};

export default ProfileUpdate;