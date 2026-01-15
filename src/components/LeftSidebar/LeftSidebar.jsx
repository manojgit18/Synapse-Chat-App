import React, { useContext, useState } from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { logout } from "../../config/firebase";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { users, selectUserChat, selectAIChat, userData } =
    useContext(AppContext);

  const [searchInput, setSearchInput] = useState("");

  const filteredUsers = users
    .filter((u) => u.uid !== userData?.uid)
    .filter((u) =>
      u.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
      u.username?.toLowerCase().includes(searchInput.toLowerCase())
    );

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img className="logo" src={assets.logo} alt="" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              <hr />
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        </div>

        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
      </div>

      <div className="ls-list">
        {/* 🤖 NEURON AI - ALWAYS PINNED AT TOP */}
        <div 
          className="friends ai-chat" 
          onClick={selectAIChat}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '12px',
            borderRadius: '8px',
            marginBottom: '10px',
            cursor: 'pointer',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <img 
            src={assets.logo} 
            alt="NeuronAI" 
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '50%',
              border: '2px solid white',
              background: 'white',
              padding: '4px'
            }}
          />
          <div style={{ color: 'white' }}>
            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>🤖 NeuronAI</p>
            <span style={{ fontSize: '13px', opacity: 0.9 }}>Ask me anything!</span>
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ 
          borderBottom: '1px solid #ddd', 
          margin: '10px 0',
          paddingBottom: '5px'
        }}>
          <p style={{ 
            fontSize: '12px', 
            color: '#888', 
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Users
          </p>
        </div>

        {/* USER CHATS */}
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => (
            <div
              key={u.uid}
              className="friends"
              onClick={() => selectUserChat(u)}
            >
              <img src={u.avatar || assets.avatar_icon} alt="" />
              <div>
                <p>{u.name || u.username}</p>
                <span>{u.bio || "Available"}</span>
              </div>
            </div>
          ))
        ) : searchInput ? (
          <p className="no-users" style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
            No users found
          </p>
        ) : (
          <p style={{ textAlign: 'center', color: '#999', padding: '20px', fontSize: '14px' }}>
            No other users yet
          </p>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;