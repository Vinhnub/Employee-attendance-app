import React, { useState } from "react";
import * as employeeService from "../Service/Employee";
import { usePopup } from "../Component/PopUp";
import UserNav from "../Component/UserNav";
import Layout from "../Component/Layout";
import styles from "./CheckOut.module.css";

export default function CheckOut() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { popup, confirm } = usePopup();

  const handleCheckOutClick = () => {
    confirm(
      "Bạn có chắc chắn muốn điểm danh ra khỏi ca làm việc?",
      handleConfirmCheckOut,
      null,
      "Điểm danh ra",
      "Hủy"
    );
  };

  const handleConfirmCheckOut = async () => {
    setLoading(true);
    try {
      const response = await employeeService.CheckOut();
      if (response.data.status === "success") {
      } else {
        popup(<p style={{ color: "red" }}>{response.data.message}</p>);
      }
    } catch (err) {
      console.error("Check out error:", err);
      popup(<p style={{ color: "red" }}>Điểm danh ra thất bại</p>);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Layout Navbar={UserNav}>
      <div className={styles.container}>
        <h2 className={styles.title}>Điểm danh ra</h2>
        <button className={styles.button} onClick={handleCheckOutClick} disabled={loading}>
          {loading ? "Đang điểm danh ra..." : "Điểm danh ra"}
        </button>
      </div>
    </Layout>
  );
}
