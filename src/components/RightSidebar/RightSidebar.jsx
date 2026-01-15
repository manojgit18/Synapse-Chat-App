import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { logout } from "../../config/firebase";

const RightSidebar = () => {
  const { selectedChat, messages, isAIChat } = useContext(AppContext);
  const [media, setMedia] = useState([]);

  useEffect(() => {
    const mediaList = messages.filter((m) => m.image).map((m) => m.image);
    setMedia(mediaList);
  }, [messages]);

  if (!selectedChat || isAIChat) return null;

  return (
    <div className="rs">
      <div className="rs-profile">
        <img src={selectedChat.avatar || assets.profile_img} alt="" />
        <h3>{selectedChat.name || "Unknown User"}</h3>
        <p>{selectedChat.bio || "No bio available"}</p>
      </div>

      <hr />

      <div className="rs-media">
        <p>Media</p>
        <div>
          {media.length > 0 ? (
            media.map((m, i) => (
              <img key={i} src={m} alt="" onClick={() => window.open(m)} />
            ))
          ) : (
            <p className="no-media">No media shared yet</p>
          )}
        </div>
      </div>

      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default RightSidebar;