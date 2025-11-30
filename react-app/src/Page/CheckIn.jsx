import React, { useState } from "react";
import * as employeeService from "../Service/Employee";
import UserNav from "../Component/UserNav";
import { usePopup } from "../Component/PopUp";
import Layout from "../Component/Layout";
import styles from "./CheckIn.module.css";

export default function CheckIn() {
  const [note, setNote] = useState("");
  const popup = usePopup();

  const [endtime, setEndtime] = useState(() => {
    const now = new Date();
    now.setTime(now.getTime() + 7 * 60 * 60 * 1000);
    return now.toISOString().slice(11, 19);
  });
  function convert(date) {
    const nDate = new Date().toISOString().slice(0, 10) + " " + date;
    return nDate;
  }
  const shiftInfo = {
    end_time: convert(endtime),
    note: note,
  };
  const handleCheckIn = async (e) => {
    e.preventDefault();
    try {
      const response = await employeeService.start_shift(shiftInfo);
      if (response.data.status == "success") {
        popup(<p style={{ color: "green" }}>{response.data.message}</p>);
      } else {
        console.log(JSON.stringify(response.data));
        popup(<p style={{ color: "green" }}>{response.data.message}</p>);
      }
    } catch (error) {
      console.error("Error: " + error.message);
    }
  };
  return (
    <Layout Navbar={UserNav}>
      <div className={styles.container}>
        <h2 className={styles.title}>Check In</h2>
        <form className={styles.form} onSubmit={handleCheckIn}>
          <input
            className={styles.input}
            type="text"
            placeholder="Note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <input
            className={styles.input}
            type="time"
            value={endtime}
            onChange={(e) => setEndtime(e.target.value)}
          />
          <button className={styles.button} type="submit">Check In</button>
        </form>
      </div>
    </Layout>
  );
}
