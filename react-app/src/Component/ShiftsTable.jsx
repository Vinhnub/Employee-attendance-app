import React ,{useState} from "react";
import * as managementService from "../Service/Management";

export function ShiftsTable({ shifts, func, extra }) {

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {shifts.length > 0 ? (
          [...shifts].sort().reverse().map((shift) => (
            <React.Fragment key={shift.id}>
              <tr
                style={{ color: `${shift.is_working ? '#ff0000' : '#00ff00'}` }}
                onClick={() => { func && func({ ...shift }) }}
              >
                <td style={{ border: '5px solid pink', padding: '1rem' }}>{shift.start_time || 'N/A'}</td>
                <td style={{ border: '5px solid pink', padding: '1rem' }}>{shift.end_time || 'N/A'}</td>
                <td style={{ border: '5px solid pink', padding: '1rem' }}>{shift.note || ''}</td>
              </tr>
              {extra && extra(shift)}
            </React.Fragment>
          ))) : (
          <tr>
            <td colSpan="3">No shifts found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export function UpdateShift({shift,id,expandShift,setPopup = () => {}}) {
  const [startTime, setStartTime] = useState(shift.start_time ? String(shift.start_time).slice(11, 16) : "");
  const [endTime, setEndTime] = useState(shift.end_time ? String(shift.end_time).slice(11, 16) : "");
  const [note, setNote] = useState(shift.note || "");
  const handleChange = async (shift) => {
    const editShift = {
      new_start_time: String(shift.start_time).slice(0, 10) + " " + startTime+":00",
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
  );
}