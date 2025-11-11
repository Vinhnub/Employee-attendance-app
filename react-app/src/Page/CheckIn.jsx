import React, { useState } from "react";
import * as employeeService from "../Service/Employee";
import * as authService from "../Service/Auth";

export default function CheckIn() {
  const [popup,setPopup] = useState();
  const [note, setNote] = useState("");
  const [endtime, setEndtime] = useState(() => {
    const now = (new Date());
    now.setTime(now.getTime() + 7 * 60 * 60 * 1000);
    return now.toISOString().slice(11, 19);
  });
  function convert(date) {
    const nDate = (new Date()).toISOString().slice(0,10)+" "+date;
    return nDate;
  }
  const shiftInfo = {
    end_time: convert(endtime),
    note: note
  }
  const handleCheckIn = async (e) => {
    e.preventDefault();
    try {
      const response = await employeeService.start_shift(shiftInfo);
      if (response.data.status == "success") {
        setPopup(<h4 style={{color:"green"}}>{response.data.message}</h4>)
      } else {
        console.log(JSON.stringify(response.data));
        setPopup(<h4 style={{color:"red"}}>{response.data.message}</h4>)
      }
    } catch (error) {
      console.error("Error: " + error.message);
    }
  }
  return (
    < div style={{ padding: 20 }}>
      {popup}
      <h2>Check In</h2>
      <form onSubmit={handleCheckIn}>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        /><br /><br />
        <input
          type="time"
          value={endtime}
          onChange={(e) => setEndtime(e.target.value)}
        /><br /><br />
        <button type="submit">CheckIn</button>
      </form>
    </div >
  );
}
