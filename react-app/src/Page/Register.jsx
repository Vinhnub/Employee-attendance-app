import React, { useState } from "react";
import * as management from "../Service/Management";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";
import { usePopup } from "../Component/PopUp";
import styles from "./Register.module.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [role, setRole] = useState("");
  const { popup } = usePopup();
  const [isLoading, setIsLoading] = useState(false);

  const roleOption = ["staff", "manager"];
  const roleLabels = { staff: "Nhân viên", manager: "Quản lý" };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!username.trim() || !password.trim() || !fullname.trim() || !role) {
      popup(
        <div style={{ color: "#dc3545", fontWeight: "500" }}>
          Vui lòng điền vào tất cả các trường
        </div>
      );
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      popup(
        <div style={{ color: "#dc3545", fontWeight: "500" }}>
          Mật khẩu phải có ít nhất 6 ký tự
        </div>
      );
      setIsLoading(false);
      return;
    }

    const registerInfo = {
      username: username.trim(),
      password: password,
      fullname: fullname.trim(),
      role: role,
    };

    try {
      const response = await management.register(registerInfo);
      if (response.data.status === "success") {
        popup(<p style={{ color: "green" }}>{response.data.message}</p>);
        // Reset form
        setUsername("");
        setPassword("");
        setFullname("");
        setRole("");
      } else {
        popup(
          <div style={{ color: "#dc3545", fontWeight: "500" }}>
            Đăng ký thất bại: {response.data.message}
          </div>
        );
      }
    } catch (err) {
      console.error(err);
      popup(
        <div style={{ color: "#dc3545", fontWeight: "500" }}>
          Đăng ký thất bại. Vui lòng thử lại.
        </div>
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout Navbar={ManagerNav}>
      <div className={styles.container}>
        <div className={styles.registerCard}>
          <div className={styles.header}>
            <h2 className={styles.title}>Đăng ký người dùng mới</h2>
            <p className={styles.subtitle}>Tạo tài khoản mới cho nhân viên hoặc quản lý</p>
          </div>

          <form className={styles.registerForm} onSubmit={handleRegister}>
            <div className={styles.formGroup}>
              <label htmlFor="fullname" className={styles.formLabel}>
                Họ và tên
              </label>
              <input
                id="fullname"
                type="text"
                value={fullname}
                placeholder="Nhập họ và tên"
                onChange={(e) => setFullname(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="username" className={styles.formLabel}>
                Tên đăng nhập
              </label>
              <input
                id="username"
                type="text"
                value={username}
                placeholder="Chọn tên đăng nhập"
                onChange={(e) => setUsername(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="role" className={styles.formLabel}>
                Vai trò người dùng
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className={styles.formSelect}
                required
              >
                <option value="">Chọn vai trò người dùng</option>
                {roleOption.map((roleOption, key) => (
                  <option key={key} value={roleOption}>
                    {roleLabels[roleOption]}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.formLabel}>
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                onChange={(e) => setPassword(e.target.value)}
                className={styles.formInput}
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitButton}
            >
              {isLoading ? (
                <span className={styles.buttonContent}>
                  <svg className={styles.spinner} viewBox="0 0 24 24" width="20" height="20">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round">
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        from="0 12 12"
                        to="360 12 12"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </svg>
                  Đang đăng ký...
                </span>
              ) : (
                "Đăng ký người dùng"
              )}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}
