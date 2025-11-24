import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as managementService from "../Service/Management";
import { usePopup } from "../Component/PopUp";

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [shifts, setShifts] = useState([]);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const popup = usePopup();
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
      try {
        const response = await managementService.getUserShifts(id);
        if (response.data.status === "success") {
          setShifts(response.data.data);
        } else {
          setShifts([]);
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

  const handleDelete = async () => {
    try {
      if (confirm("Are you sure?")) {
        const response = await managementService.deleteUser(id);
        if (response.data.status == "success") {
          setPopup(<h4 style={{ color: "green" }}>{response.data.message}</h4>)
          setTimeout(() => setPopup(null), 5000);
          navigate(-1);
        }
        else {
          setPopup(<h4 style={{ color: "red" }}>{response.data.message}</h4>)
          setTimeout(() => setPopup(null), 5000);
        }
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      {!user ? (
        <div><h1>No user found</h1></div>
      ) : (
        <div>
          <h4>User ID: {user.id}</h4> <br />
          <h4>UserName: {user.username}</h4> <br />
          <h4>Full Name: {user.fullname}</h4> <br />
          <h4>Role: {user.role}</h4> <br />

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
          )} <br />

          <button onClick={() => navigate(`shifts`)}>
            Show shifts
          </button> <br/>
          <button onClick={() => navigate(`logs`)}>
            Show Logs
          </button> <br/>
          <button onClick={() => handleDelete()}>
            Delete user
          </button>
        </div>
      )}
    </div >
  );
}
