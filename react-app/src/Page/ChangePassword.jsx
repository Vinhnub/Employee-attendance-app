import React, { useState } from "react";
import * as authService from "../Service/Auth";
import UserNav from "../Component/UserNav";
import { usePopup } from "../Component/PopUp";
import Layout from "../Component/Layout";
import styles from "./ChangePassword.module.css";

export default function ChangePassword() {
  const [old_password, setOldpassword] = useState("");
  const [new_password, setNewpassword] = useState("");
  const popup = usePopup();

  const passwordInfo = {
    old_password: old_password,
    new_password: new_password,
  };

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.changePassword(passwordInfo);
      if (response.data.status == "success") {
        popup(<p style={{ color: "green" }}>{response.data.message}</p>);
      } else {
        popup(<p style={{ color: "red" }}>{response.data.message}</p>);
      }
    } catch (err) {
      console.error("Failed:", err);
      popup(<p style={{ color: "red" }}>{response.data.message}</p>);
    }
  };
  return (
    <Layout Navbar={UserNav}>
      <div className={styles.container}>
        <h2 className={styles.title}>Change Password</h2>
        <form className={styles.form} onSubmit={handleChange}>
          <input
            className={styles.input}
            type="password"
            placeholder="Old Password"
            value={old_password}
            onChange={(e) => setOldpassword(e.target.value)}
          />
          <input
            className={styles.input}
            type="password"
            placeholder="New Password"
            value={new_password}
            onChange={(e) => setNewpassword(e.target.value)}
          />
          <button className={styles.button} type="submit">Change Password</button>
        </form>
      </div>
    </Layout>
  );
}
