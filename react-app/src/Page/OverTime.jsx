import React, { useState } from "react";
import * as employeeService from "../Service/Employee";
import { usePopup } from "../Component/PopUp";
import Layout from "../Component/Layout";
import UserNav from "../Component/UserNav";
import styles from "./OverTime.module.css";

  
export default function OverTime() {
  const [note, setNote] = useState("");
  const [endtime, setEndtime] = useState(() => {
    const now = new Date();
    now.setTime(now.getTime() + 7 * 60 * 60 * 1000);
    return now.toISOString().slice(11, 16);
  });
  const { popup } = usePopup();
  function convert(date) {
    const nDate = new Date().toISOString().slice(0, 10) + " " + date + ":00";
    return nDate;
  }
  const OverTimeInfo = {
    new_end_time: convert(endtime),
    new_note: note,
  };
  const handleOverTime = async (e) => {
    e.preventDefault();
    try {
      const response = await employeeService.OverTime(OverTimeInfo);
      if (response.data.status === "success") {
        popup(<p style={{ color: "green" }}>{response.data.message}</p>);
      } else {
        popup(<p style={{ color: "red" }}>{response.data.message}</p>);
      }
    } catch (err) {
      popup(<p style={{ color: "red" }}>{err.message}</p>);
      console.error(err);
    }
  };
  return (
    <Layout Navbar={UserNav}>
      <div className={styles.container}>
        <h2 className={styles.title}>Thêm thời gian</h2>
        <form className={styles.form} onSubmit={handleOverTime}>
          <input
            className={styles.input}
            type="text"
            placeholder="Ghi chú (tùy chọn)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <label className={styles.label}>Thời gian kết thúc mới</label>
          <input
            className={styles.input}
            type="time"
            value={endtime}
            onChange={(e) => setEndtime(e.target.value)}
          />
          <button className={styles.button} type="submit">Lưu</button>
        </form>
      </div>
    </Layout>
  );
}
