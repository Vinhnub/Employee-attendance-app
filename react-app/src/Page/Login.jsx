import React, { useState, useEffect } from "react";
import * as authService from "../Service/Auth";
import { usePopup } from "../Component/PopUp";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { popup } = usePopup();
  const navigate = useNavigate();

  const loginInfo = {
    username: username,
    password: password,
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(loginInfo);
      if (response.data.status == "success") {
        sessionStorage.setItem("token", response.data.access_token);
        sessionStorage.removeItem("user"); // Clear cached user data for new login
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
      popup(<p style={{ color: "red" }}>Login failed</p>);
    }
  };


  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          className={styles.input}
          type="text"
          value={username}
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={styles.button} type="submit">Login</button>
      </form>
    </div>
  );
}
