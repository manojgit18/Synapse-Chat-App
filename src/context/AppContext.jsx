import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, collection, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import neuronAI from "../lib/neuronAI";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  
  // Chat state
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isAIChat, setIsAIChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isAIResponding, setIsAIResponding] = useState(false);

  // Auth listener - ONLY runs once
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUserData(null);
        setAuthReady(true);
        return;
      }

      try {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          setUserData(snap.data());
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserData(null);
      }

      setAuthReady(true);
    });

    return () => unsub();
  }, []);

  // Load all users from Firestore
  useEffect(() => {
    if (!userData) return;

    const unsub = onSnapshot(collection(db, "users"), (snap) => {
      const usersList = [];
      snap.forEach((doc) => {
        usersList.push(doc.data());
      });
      setUsers(usersList);
    });

    return () => unsub();
  }, [userData]);

  // AI chat auto-response logic - FIXED
  useEffect(() => {
    if (!isAIChat || !userData || messages.length === 0 || isAIResponding) return;

    const lastMsg = messages[messages.length - 1];
    
    // Only respond if last message is from user (not AI)
    if (!lastMsg || lastMsg.senderId === "ai" || lastMsg.senderId !== userData.uid) return;

    // AI responds after user message
    const respondToUser = async () => {
      setIsAIResponding(true);

      try {
        console.log("🤖 NeuronAI is thinking...");
        const aiResponse = await neuronAI(lastMsg.text, messages);

        const aiMsg = {
          text: aiResponse,
          image: "",
          senderId: "ai",
          createdAt: serverTimestamp(),
        };

        await addDoc(
          collection(db, "ai_chats", userData.uid, "messages"),
          aiMsg
        );

        console.log("✅ NeuronAI responded");
      } catch (error) {
        console.error("❌ AI response failed:", error);
        
        // Send error message to user
        const errorMsg = {
          text: "Sorry, I'm having trouble responding right now. Please try again.",
          image: "",
          senderId: "ai",
          createdAt: serverTimestamp(),
        };

        await addDoc(
          collection(db, "ai_chats", userData.uid, "messages"),
          errorMsg
        );
      } finally {
        setIsAIResponding(false);
      }
    };

    respondToUser();
  }, [messages, isAIChat, userData, isAIResponding]);

  // Select user chat
  const selectUserChat = (user) => {
    setSelectedChat(user);
    setIsAIChat(false);
    setMessages([]);
    setIsAIResponding(false);
  };

  // Select AI chat
  const selectAIChat = () => {
    setSelectedChat({
      name: "NeuronAI",
      avatar: "", // Will use logo in ChatBox
      bio: "Your intelligent AI assistant powered by Google Gemini",
    });
    setIsAIChat(true);
    setMessages([]);
    setIsAIResponding(false);
  };

  return (
    <AppContext.Provider
      value={{
        userData,
        setUserData,
        authReady,
        users,
        selectedChat,
        isAIChat,
        messages,
        setMessages,
        selectUserChat,
        selectAIChat,
        isAIResponding,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;