import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import ProfileUpdate from "./pages/ProfileUpdate/ProfileUpdate";
import { AppContext } from "./context/AppContext";

const App = () => {
  const { userData, authReady } = useContext(AppContext);

  // Show loading screen while Firebase checks auth state
  if (!authReady) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'sans-serif',
        color: '#555'
      }}>
        Loading...
      </div>
    );
  }

  // Determine if user is logged in
  const isLoggedIn = userData !== null;
  
  // Determine if profile is complete
  const hasCompletedProfile = isLoggedIn && userData.name && userData.name.trim() !== "";

  return (
    <Routes>
      {/* LOGIN PAGE */}
      <Route
        path="/"
        element={
          isLoggedIn ? (
            hasCompletedProfile ? (
              <Navigate to="/chat" replace />
            ) : (
              <Navigate to="/profile" replace />
            )
          ) : (
            <Login />
          )
        }
      />

      {/* PROFILE UPDATE PAGE */}
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            <ProfileUpdate />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* CHAT PAGE */}
      <Route
        path="/chat"
        element={
          isLoggedIn ? (
            hasCompletedProfile ? (
              <Chat />
            ) : (
              <Navigate to="/profile" replace />
            )
          ) : (
            <Navigate to="/" replace />
          )
        }
      />

      {/* FALLBACK - redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;