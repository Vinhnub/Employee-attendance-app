import React, { useState } from "react";
import * as authService from "../Service/Auth";
import UserNav from "../Component/UserNav";
import { usePopup } from "../Component/PopUp";
import Layout from "../Component/Layout";
import styles from "./ChangePassword.module.css";

export default function ChangePassword() {
  const [old_password, setOldpassword] = useState("");
  const [new_password, setNewpassword] = useState("");
  const { popup, confirm } = usePopup();

  const passwordInfo = {
    old_password: old_password,
    new_password: new_password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confirm(
      "Bạn có chắc chắn muốn thay đổi mật khẩu?",
      handleConfirmChangePassword,
      null,
      "Thay đổi mật khẩu",
      "Hủy"
    );
  };

  const handleConfirmChangePassword = async () => {
    try {
      const response = await authService.changePassword(passwordInfo);
      if (response.data.status == "success") {
        // Clear the form on success
        popup(<p style={{ color: "green" }}>{response.data.message}</p>);
        setOldpassword("");
        setNewpassword("");
      } else {
        popup(<p style={{ color: "red" }}>{response.data.message}</p>);
      }
    } catch (err) {
      console.error("Failed:", err);
      popup(<p style={{ color: "red" }}>Thay đổi mật khẩu thất bại</p>);
    }
  };
  return (
    <Layout Navbar={UserNav}>
      <div className={styles.container}>
        <h2 className={styles.title}>Thay đổi mật khẩu</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="password"
            placeholder="Mật khẩu cũ"
            value={old_password}
            onChange={(e) => setOldpassword(e.target.value)}
            required
          />
          <input
            className={styles.input}
            type="password"
            placeholder="Mật khẩu mới"
            value={new_password}
            onChange={(e) => setNewpassword(e.target.value)}
            required
          />
          <button className={styles.button} type="submit">Thay đổi mật khẩu</button>
        </form>
      </div>
    </Layout>
  );
}
