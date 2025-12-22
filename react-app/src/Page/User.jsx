import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as managementService from "../Service/Management";
import { usePopup } from "../Component/PopUp";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";
import styles from "./User.module.css";

export default function User() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [shifts, setShifts] = useState([]);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const { popup, confirm } = usePopup();
  const [showPasswordBox, setShowPasswordBox] = useState(false);
  const roleLabels = { staff: "Nhân viên", manager: "Quản lý" };

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
      popup(<p style={{ color: "red" }}>Mật khẩu không khớp!</p>);
      return;
    }

    if (!password.trim()) {
      popup(<p style={{ color: "red" }}>Mật khẩu không được để trống</p>);
      return;
    }

    const newPassword = { new_password: password };
    try {
      const response = await managementService.resetPassword(id, newPassword);
      if (response.data.status === "success") {
        setShowPasswordBox(false);
        setPassword("");
        setCPassword("");
      } else {
        popup(<p style={{ color: "red" }}>Thay đổi mật khẩu thất bại</p>);
      }
    } catch (err) {
      console.error("Error changing password:", err);
      popup(<p style={{ color: "red" }}>Lỗi khi thay đổi mật khẩu</p>);
    }
  };

  const handleDeleteClick = () => {
    confirm(
      "Bạn có chắc chắn muốn xóa người dùng này?",
      handleConfirmDelete,
      null,
      "Xóa người dùng",
      "Hủy"
    );
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await managementService.deleteUser(id);
      if (response.data.status == "success") {
        navigate(-1);
      } else {
        popup(<p style={{ color: "red" }}>{response.data.message}</p>);
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      popup(<p style={{ color: "red" }}>Error deleting user</p>);
    }
  };

  return (
    <Layout Navbar={ManagerNav}>
      <div className={styles.container}>
        {!user ? (
          <div className={styles.notFound}><h1 className={styles.notFoundTitle}>No user found</h1></div>
        ) : (
          <div className={styles.userCard}>
            <h2 className={styles.title}>Thông tin cụ thể</h2>
            <div className={styles.userInfo}>
              <p className={styles.userDetail}><strong>User ID:</strong> {user.id}</p>
              <p className={styles.userDetail}><strong>Username:</strong> {user.username}</p>
              <p className={styles.userDetail}><strong>Full Name:</strong> {user.fullname}</p>
              <p className={styles.userDetail}><strong>Role:</strong> {user.role}</p>
            </div>

            <button className={styles.button} onClick={() => setShowPasswordBox(!showPasswordBox)}>
              Đổi mật khẩu
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
                Hiển thị ca làm
              </button>
              <button className={styles.buttonSecondary} onClick={() => navigate(`logs`)}>
                Hiển thị lịch sử
              </button>
              <button className={styles.buttonDanger} onClick={handleDeleteClick}>
                Xóa người dùng
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
