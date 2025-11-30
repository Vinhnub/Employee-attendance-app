import React, { useState } from "react";
import * as employeeService from "../Service/Employee";
import { usePopup } from "../Component/PopUp";
import ConfirmDialog from "../Component/ConfirmDialog";
import UserNav from "../Component/UserNav";
import Layout from "../Component/Layout";
import styles from "./CheckOut.module.css";

export default function CheckOut() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const popup = usePopup();

  const handleCheckOutClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmCheckOut = async () => {
    setShowConfirmDialog(false);
    setLoading(true);
    try {
      const loading = popup(<p style={{ color: "green" }}>loading...</p>,"center-box");
      const response = await employeeService.CheckOut();
      loading();
      if (response.data.status === "success") {
        popup(<p style={{ color: "green" }}>{response.data.message}</p>);
      } else {
        popup(<p style={{ color: "red" }}>{response.data.message}</p>);
      }
    } catch (err) {
      console.error("Check out error:", err);
      popup(<p style={{ color: "red" }}>Failed to check out</p>);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelCheckOut = () => {
    setShowConfirmDialog(false);
  };
  return (
    <Layout Navbar={UserNav}>
      <div className={styles.container}>
        <h2 className={styles.title}>Check Out</h2>
        <button className={styles.button} onClick={handleCheckOutClick} disabled={loading}>
          {loading ? "Checking Out..." : "Check Out"}
        </button>
      </div>
      {showConfirmDialog && (
        <ConfirmDialog
          message="Are you sure you want to check out from your shift?"
          onConfirm={handleConfirmCheckOut}
          onCancel={handleCancelCheckOut}
          confirmText="Check Out"
          cancelText="Cancel"
        />
      )}
    </Layout>
  );
}
