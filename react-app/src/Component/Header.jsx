import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { me, logout } from "../Service/Auth";
import { useTheme } from "./ThemeContext";
import { usePopup } from "./PopUp";
import styles from "./Header.module.css";

export default function Header() {
  const [user, setUser] = useState(null);
  const [currentShift, setCurrentShift] = useState(null);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { confirm } = usePopup();
  const roleLabels = { staff: "Nhân viên", manager: "Quản lý" };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await me();
        if (response.data.status === "success") {
          setUser(response.data.data);
          setCurrentShift(response.data.current_shift);
        }
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };
    fetchUser();
  }, []);

  const handleLogoutClick = () => {
    confirm(
      "Đăng xuất?",
      handleConfirmLogout,
      null,
      "Xác nhận",
      "Quay lại"
    );
  };

  const handleConfirmLogout = async () => {
    try {
      await logout();
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("current_shift");
      navigate("/login");
    } catch (err) {
      console.error("Failed to logout:", err);
      // Still clear token and redirect even if logout API fails
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("current_shift");
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
                <button className={styles.logoutButton} onClick={handleLogoutClick}>
                  Đăng xuất
                </button>
              </div>
            </div>
            <div className={styles.bottomRow}>
              <span className={styles.roleLabel}>
                {roleLabels[user.role] || user.role}
              </span>
              <span className={styles.shiftInfo}>
                {currentShift ?
                  `Ca làm: ${currentShift.start_time.slice(0, 5)} - ${currentShift.end_time.slice(0, 5)}` :
                  'Không có ca làm'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
