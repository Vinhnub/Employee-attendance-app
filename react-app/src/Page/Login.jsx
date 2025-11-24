import React, { useState, useEffect } from "react";
import * as authService from "../Service/Auth";
import { usePopup } from "../Component/PopUp";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const popup = usePopup();
  const navigate = useNavigate();

  const loginInfo = {
    username: username,
    password: password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loading = popup(`Loading...`, "center-box");
      const response = await authService.login(loginInfo);
      loading();
      if (response.data.status == "success") {
        sessionStorage.setItem("token", response.data.access_token);
        popup(<p style={{ color: "green" }}>{response.data.message}</p>);
        if (response.data.data.role=="manager") {
          navigate("../userlist");
        } else {
          navigate("../workpage");
        }
      } else {
        console.error(JSON.stringify(response));
        popup(<p style={{ color: "red" }}>{response.data.message}</p>);
      }
    } catch (err) {
      console.error("Login failed:", err);
      popup(<p style={{ color: "red" }}>{response.data.message}</p>);
    }
  };


  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}