import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as managementService from "../Service/Management";

export default function User() {
  const { id } = useParams();
  const [user, setUser] = useState();
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showPasswordBox, setShowPasswordBox] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await managementService.getUser(id);
        if (response.data.status === "success") {
          setUser(response.data.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password !== cPassword) {
      alert(`Passwords don't match!`);
      return;
    }

    if (!password.trim()) {
      alert(`Passwords can't be empty`);
      return;
    }

    const newPassword = { new_password: password };
    try {
      const response = await managementService.resetPassword(id, newPassword);
      if (response.data.status === "success") {
        alert("Password changed successfully");
        setShowPasswordBox(false);
        setPassword("");
        setCPassword("");
      } else {
        alert("Failed to change password");
      }
    } catch (err) {
      console.error(err);
      alert("Error changing password");
    }
  };

  return (
    <div>
      {!user ? (
        <div><h1>No user found</h1></div>
      ) : (
        <div>
          <h4>User ID: {user.id}</h4> <br/>
          <h4>UserName: {user.username}</h4> <br/>
          <h4>Full Name: {user.fullname}</h4> <br/>
          <h4>Role: {user.role}</h4> <br/>

          <button onClick={() => setShowPasswordBox(!showPasswordBox)}>
            Change Password
          </button>

          {showPasswordBox && (
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              /><br />
              <input
                type="password"
                placeholder="Confirm password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              /><br />
              <button type="submit">Confirm Change</button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
