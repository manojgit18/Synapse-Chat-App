import React, { useContext, useEffect, useRef, useState } from "react";
import "./ChatBox.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../config/firebase";

const ChatBox = () => {
  const {
    userData,
    selectedChat,
    isAIChat,
    messages,
    setMessages,
    isAIResponding,
  } = useContext(AppContext);

  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages, isAIResponding]);

  useEffect(() => {
    if (!selectedChat || !userData) return;

    let q;
    if (isAIChat) {
      q = query(
        collection(db, "ai_chats", userData.uid, "messages"),
        orderBy("createdAt", "asc")
      );
    } else {
      const chatId =
        userData.uid > selectedChat.uid
          ? `${userData.uid}_${selectedChat.uid}`
          : `${selectedChat.uid}_${userData.uid}`;

      q = query(
        collection(db, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")
      );
    }

    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach((d) => {
        const data = d.data();
        list.push({
          ...data,
          id: d.id,
          // Convert Firestore Timestamp to sortable number
          timestamp: data.createdAt?.toMillis() || Date.now()
        });
      });
      
      // Sort by timestamp to ensure correct order
      list.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(list);
    });

    return () => unsub();
  }, [selectedChat, isAIChat, userData, setMessages]);

  const sendMessage = async () => {
    if (!text.trim() || sending) return;

    const messageText = text.trim();
    setText("");
    setSending(true);

    try {
      const msg = {
        text: messageText,
        image: "",
        senderId: userData.uid,
        createdAt: serverTimestamp(),
      };

      if (isAIChat) {
        await addDoc(
          collection(db, "ai_chats", userData.uid, "messages"),
          msg
        );
      } else {
        const chatId =
          userData.uid > selectedChat.uid
            ? `${userData.uid}_${selectedChat.uid}`
            : `${selectedChat.uid}_${userData.uid}`;

        await addDoc(collection(db, "chats", chatId, "messages"), msg);
      }
    } catch (error) {
      console.error("Send message error:", error);
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!selectedChat) {
    return (
      <div className="chat-box" style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        gap: '20px'
      }}>
        <img src={assets.logo_big} alt="Synapse" style={{ width: '120px', opacity: 0.6 }} />
        <p style={{ color: '#888', fontSize: '18px' }}>Select a chat to start messaging</p>
      </div>
    );
  }

  return (
    <div className="chat-box">
      <div className="chat-user">
        <img 
          src={isAIChat ? assets.logo : (selectedChat.avatar || assets.avatar_icon)} 
          alt="" 
          style={isAIChat ? { background: 'white', padding: '5px', borderRadius: '50%' } : {}}
        />
        <p>
          {selectedChat.name} 
          {isAIChat && <span style={{ fontSize: '12px', marginLeft: '8px', color: '#667eea' }}>● AI Assistant</span>}
        </p>
        {!isAIChat && <img src={assets.help_icon} className="help" alt="" />}
      </div>

      <div className="chat-msg">
        {messages.map((m, i) => (
          <div
            key={m.id || i}
            className={m.senderId === userData.uid ? "s-msg" : "r-msg"}
          >
            {m.image && <img className="msg-img" src={m.image} alt="" />}
            {m.text && <p className="msg">{m.text}</p>}
          </div>
        ))}

        {/* AI TYPING INDICATOR */}
        {isAIChat && isAIResponding && (
          <div className="r-msg" style={{ opacity: 0.7 }}>
            <p className="msg">
              <span style={{ 
                display: 'inline-block',
                animation: 'blink 1.4s infinite'
              }}>●●●</span> NeuronAI is typing...
            </p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <div className="chat-input">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder={isAIChat ? "Ask NeuronAI anything..." : "Send a message"}
          disabled={sending || isAIResponding}
        />
        <img 
          src={assets.send_button} 
          onClick={sendMessage} 
          alt="" 
          style={{ 
            opacity: (sending || isAIResponding || !text.trim()) ? 0.5 : 1, 
            cursor: (sending || isAIResponding || !text.trim()) ? 'not-allowed' : 'pointer' 
          }}
        />
      </div>
    </div>
  );
};

export default ChatBox;