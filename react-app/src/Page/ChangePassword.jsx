import React, { useState } from "react";
import * as authService from "../Service/Auth";
import UserNav from "../Component/UserNav";
import { usePopup } from "../Component/PopUp";
import Layout from "../Component/Layout";

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
      <h2>change password</h2>
      <form onSubmit={handleChange}>
        <input
          type="password"
          placeholder="old password"
          onChange={(e) => setOldpassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="new password"
          onChange={(e) => setNewpassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Layout>
  );
}
