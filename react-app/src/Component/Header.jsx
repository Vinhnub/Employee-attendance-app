import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { me, logout } from "../Service/Auth";
import styles from "./Header.module.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await me();
        if (response.data.status === "success") {
          setUser(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      sessionStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout:", err);
      // Still clear token and redirect even if logout API fails
      sessionStorage.removeItem("token");
      navigate("/login");
    }
  };

  if (!user) {
    return (
      <div className={styles.header}>
        <div className={styles.userInfoBox}>
          <div className={styles.userCard}>
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.header}>
      <div className={styles.userInfoBox}>
        <div className={styles.userCard}>
          <div className={styles.userInfo}>
            <div className={styles.topRow}>
              <span className={styles.username}>{user.fullname}</span>
              <div className={styles.topRowRight}>
                <span className={styles.statusLabel}>● Online</span>
                <button className={styles.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
            <div className={styles.bottomRow}>
              <span className={styles.fullName}>{user.username}</span>
              <span className={`${styles.roleLabel} ${styles[user.role]}`}>
                {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
