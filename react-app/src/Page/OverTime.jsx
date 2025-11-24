import React, { useState } from "react";
import * as employeeService from "../Service/Employee";
import { usePopup } from "../Component/PopUp";
import Layout from "../Component/Layout";
import UserNav from "../Component/UserNav";


export default function OverTime() {
  const [note, setNote] = useState("");
  const [endtime, setEndtime] = useState(() => {
    const now = new Date();
    now.setTime(now.getTime() + 7 * 60 * 60 * 1000);
    return now.toISOString().slice(0, 19);
  });
  const popup = usePopup();

  function convert(date) {
    const nDate = date.replace(`T`, ` `);
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
      <h1>Over Time</h1>
      <form onSubmit={handleOverTime}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <br />
        <br />
        <input
          type="datetime-local"
          value={endtime}
          onChange={(e) => setEndtime(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Save</button>
      </form>
    </Layout>
  );
}
