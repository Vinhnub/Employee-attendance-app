import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShiftsTable } from "../Component/ShiftsTable";
import * as managementService from "../Service/Management";

export default function UserShifts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [shifts, setShifts] = useState([]);
  const [popup, setPopup] = useState();
  const [endTime, setEndTime] = useState();
  const [startTime, setStartTime] = useState();
  const [note, setNote] = useState();
  const [expanedShift, setExpanedShift] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await managementService.getUser(id);
        if (response.data.status === "success") {
          setUser(response.data.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
      }
      try {
        const response = await managementService.getUserShifts(id);
        if (response.data.status === "success") {
          setShifts(response.data.data);
        } else {
          setShifts([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);
  function expandShift(shift) {
    setExpanedShift(shift.id == expanedShift ? null : shift.id);
    setNote(shift.note || "");
    setEndTime(shift.end_time ? String(shift.end_time).slice(11, 19) : "");
    setStartTime(shift.start_time ? String(shift.start_time).slice(11, 19) : "");
  }
  const handleChange = async (shift) => {
    const editShift = {
      new_start_time: String(shift.start_time).slice(0, 10) + " " + startTime,
      new_note: note
    };
    try {
      const response = await managementService.editShifts(id, shift.id, editShift);
      if (response.data.status == "success") {
        setPopup(<h4 style={{ color: "green" }}>{response.data.message}</h4>);
        expandShift(shift);
        shift.start_time = editShift.new_start_time;
        shift.note = editShift.new_note;
      } else {
        setPopup(<h4 style={{ color: "red" }}>{response.data.message}</h4>);
      }
    } catch (err) {
      console.error(err);
      setPopup(<h4 style={{ color: "red" }}>{err.message}</h4>);
    }
    setTimeout(() => setPopup(null), 5000);
  }
  return (
    <div>
      {popup}
      <ShiftsTable
        shifts={shifts}
        extra={(shift) =>
          expanedShift == shift.id ? (
            <tr>
              <td colSpan={3}>
                <div>
                  <form onSubmit={(e) => { e.preventDefault(); handleChange(shift) }}>
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <input
                      disabled
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                    <button type="submit">update</button>
                  </form>
                </div>
              </td>
            </tr>
          ) : (null)
        }
        func={(shift) =>
          expandShift(shift)
        }
      />
    </div>
  );
}
