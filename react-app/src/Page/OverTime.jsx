import React, { useState } from "react";
import * as employeeService from "../Service/Employee"

export default function OverTime() {
  const [endtime, setEndtime] = useState(() => {
      const now = (new Date());
      now.setTime(now.getTime() + 7 * 60 * 60 * 1000);
      return now.toISOString().slice(0, 19);
    });
  function convert(date) {
    const nDate = date.replace(`T`, ` `);
    return nDate;
  }
  const [note,setNote] = useState("");
  const OverTimeInfo = {
    new_end_time:convert(endtime),
    new_note:note
  }
  const handleOverTime = async (e) => {
    e.preventDefault();
    try {
      const response = await employeeService.OverTime(OverTimeInfo);
      if (response.data.status === "success") {
        alert("Overtime request submitted successfully!");
      } else {
        alert("Error: " + JSON.stringify(response.data));
      }
    } catch (err) {
      alert("Error submitting overtime request: " + err.message);
      console.error(err);
    }
  }
  return (
    <div>
      <h1>Over Time</h1>
      <form onSubmit={handleOverTime}>
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
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
