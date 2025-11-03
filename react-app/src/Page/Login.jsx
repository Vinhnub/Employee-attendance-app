import React, { useState, useEffect } from "react";
import * as authService from "../Service/Auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const loginInfo = {
    username: username,
    password: password
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(loginInfo);
      if (response.data.status == "success") {
        console.log("Login success:", response.data);
        sessionStorage.setItem("token",response.data.access_token);
        setLoggedIn(true);
      }
      else {
        alert(JSON.stringify(response));
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
    }
  };

  if (loggedIn) {
    return <h2>✅ Welcome, {username}!</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        /><br /><br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        /><br /><br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

