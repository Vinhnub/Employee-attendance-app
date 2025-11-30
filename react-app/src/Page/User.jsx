import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as managementService from "../Service/Management";
import { usePopup } from "../Component/PopUp";
import styles from "./User.module.css";

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
    <div className={styles.container}>
      {!user ? (
        <div className={styles.notFound}><h1 className={styles.notFoundTitle}>No user found</h1></div>
      ) : (
        <div className={styles.userCard}>
          <h2 className={styles.title}>User Details</h2>
          <div className={styles.userInfo}>
            <p className={styles.userDetail}><strong>User ID:</strong> {user.id}</p>
            <p className={styles.userDetail}><strong>Username:</strong> {user.username}</p>
            <p className={styles.userDetail}><strong>Full Name:</strong> {user.fullname}</p>
            <p className={styles.userDetail}><strong>Role:</strong> {user.role}</p>
          </div>

          <button className={styles.button} onClick={() => setShowPasswordBox(!showPasswordBox)}>
            Change Password
          </button>
          {showPasswordBox && (
            <form className={styles.passwordForm} onSubmit={handlePasswordSubmit}>
              <input
                className={styles.input}
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Confirm password"
                value={cPassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
              <button className={styles.button} type="submit">Confirm Change</button>
            </form>
          )}

          <div className={styles.buttonGroup}>
            <button className={styles.buttonSecondary} onClick={() => navigate(`shifts`)}>
              Show shifts
            </button>
            <button className={styles.buttonSecondary} onClick={() => navigate(`logs`)}>
              Show Logs
            </button>
            <button className={styles.buttonDanger} onClick={() => handleDelete()}>
              Delete user
            </button>
          </div>
        </div>
      )}
    </div >
  );
}
