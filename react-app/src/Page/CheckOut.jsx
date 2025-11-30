import React, { useState } from "react";
import * as employeeService from "../Service/Employee";
import { usePopup } from "../Component/PopUp";
import UserNav from "../Component/UserNav";
import Layout from "../Component/Layout";
import styles from "./CheckOut.module.css";

export default function CheckOut() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const popup = usePopup();

  const handleCheckOut = async () => {
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
      popup(<p style={{ color: "red" }}>{err.message}</p>);
    }
  };
  return (
    <Layout Navbar={UserNav}>
      <div className={styles.container}>
        <h2 className={styles.title}>Check Out</h2>
        <button className={styles.button} onClick={handleCheckOut} disabled={loading}>
          {loading ? "Checking Out..." : "Check Out"}
        </button>
      </div>
    </Layout>
  );
}
