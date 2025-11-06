import React, { useEffect, useState } from "react";
import * as managementService from "../Service/Management";
import { UpdateShift } from "../Component/ShiftsTable";


export default function TodayShifts() {
  const [shifts, setShifts] = useState([]);
  const [popup, setPopup] = useState();
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await managementService.getAllShifts();
        if (response.data.status == "success") {
          setShifts(response.data.data);
          setPopup(<h4 style={{ color: "green" }}>{response.data.message}</h4>);
        } else {
          setPopup(<h4 style={{ color: "red" }}>{response.data.message}</h4>);
        }
      } catch (err) {
        console.error(err);
        setPopup(<h4 style={{ color: "red" }}>{error.message}</h4>);
      }
    }
    fetchShifts();
  }, []);
  const [expanedShift, setExpanedShift] = useState(null);
  function expandShift(shift) {
    setExpanedShift(shift.id == expanedShift ? null : shift.id);
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Staff name</th>
            <th>Start time</th>
            <th>End time</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {shifts.length > 0 ? (shifts.map((shift) => (
            <React.Fragment key={shift.id}>
              <tr 
                style={{ color: `${shift.is_working ? '#ff0000' : '#00ff00'}` }}
                onClick={() => expandShift(shift)}
              >
                <td>{shift.fullname}</td>
                <td>{shift.start_time}</td>
                <td>{shift.end_time}</td>
                <td>{shift.note}</td>
              </tr>
              {expanedShift == shift.id &&
                <tr>
                  <td colSpan={4}>
                    
                    <UpdateShift 
                    shift={shift} 
                    id={shift.user_id} 
                    expandShift={expandShift}
                    />
                  </td>
                </tr>
              }
            </React.Fragment>
          ))) : (
            <tr>
              <td colSpan={4}>No shifts today</td>
            </tr>
          )}
        </tbody>
      </table>
    </div >
  );
}