import React, { useState } from "react";
import "./Login.css";
import assets from "../../assets/assets";
import { signup, login } from "../../config/firebase";

const Login = () => {
  const [currState, setCurrState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (currState === "Sign Up" && !agree) {
      alert("Please agree to the terms");
      return;
    }

    setLoading(true);
    try {
      if (currState === "Sign Up") {
        await signup(userName, email, password);
        // After signup, Firebase auth will trigger and redirect automatically
      } else {
        await login(email, password);
        // After login, Firebase auth will trigger and redirect automatically
      }
    } catch (err) {
      console.error("Auth error:", err);
      // Error is already shown via toast in firebase.js
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} alt="logo" className="logo" />

      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currState}</h2>

        {currState === "Sign Up" && (
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            disabled={loading}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : currState === "Sign Up"
            ? "Create account"
            : "Login now"}
        </button>

        {currState === "Sign Up" && (
          <div className="login-term">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              disabled={loading}
            />
            <p>Agree to terms & privacy policy</p>
          </div>
        )}

        <p className="login-toggle">
          {currState === "Sign Up" ? (
            <>
              Already have an account?{" "}
              <span onClick={() => !loading && setCurrState("Login")}>Login</span>
            </>
          ) : (
            <>
              Create an account?{" "}
              <span onClick={() => !loading && setCurrState("Sign Up")}>Sign Up</span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;