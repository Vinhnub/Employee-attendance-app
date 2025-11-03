import React, { useState } from "react";
import * as authService from "../Service/Auth";


export default function ChangePassword() {
  const [old_password, setOldpassword] = useState("");
  const [new_password, setNewpassword] = useState("");
  const [error, setError] = useState("");

  const passwordInfo = {
    old_password: old_password,
    new_password: new_password
  }

  const handleChange = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.changePassword(passwordInfo);
      if (response.data.status == "success") {
        alert("Password changed successfully");
      }
      else {
        alert(JSON.stringify(response));
      }
    } catch (err) {
      console.error("Failed:", err);
      setError("Invalid password");
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>change password</h2>
      <form onSubmit={handleChange}>
        <input
          type="password"
          placeholder="old password"
          onChange={(e) => setOldpassword(e.target.value)}
        /><br /><br />
        <input
          type="password"
          placeholder="new password"
          onChange={(e) => setNewpassword(e.target.value)}
        /><br /><br />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
