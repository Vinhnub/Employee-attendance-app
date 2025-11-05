import React, { useState } from "react";
import * as employeeService from "../Service/Employee";
import * as authService from "../Service/Auth";

export default function CheckIn() {
  const [endtime, setEndtime] = useState(() => {
    const now = (new Date());
    now.setTime(now.getTime() + 7 * 60 * 60 * 1000);
    return now.toISOString().slice(0, 19);
  });
  const [note, setNote] = useState("");
  function convert(date) {
    const nDate = date.replace(`T`, ` `);
    return nDate;
  }
  const shiftInfo = {
    end_time: convert(endtime),
    note: note
  }
  const handleCheckIn = async (e) => {
    e.preventDefault();
    try {
      alert(JSON.stringify(authService.me()));
      const response = await employeeService.start_shift(shiftInfo);
      if (response.data.status == "success") {
        alert("Check in successfully");
      } else {
        alert(JSON.stringify(response.data));
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  }
  return (
    < div style={{ padding: 20 }}>
      <h2>Check In</h2>
      <form onSubmit={handleCheckIn}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        /><br /><br />
        <input
          type="datetime-local"
          value={endtime}
          onChange={(e) => setEndtime(e.target.value)}
        /><br /><br />
        <button type="submit">CheckIn</button>
      </form>
    </div >
  );
}
