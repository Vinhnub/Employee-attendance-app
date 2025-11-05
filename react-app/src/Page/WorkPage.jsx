import React, { useState, useEffect, Fragment } from "react";
import * as employeeService from "../Service/Employee";

export default function WorkPage() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await employeeService.shifts();
        if (response.data.data && Array.isArray(response.data.data)) {
          setShifts(response.data.data);
        } else {
          setShifts([]);
        }
      } catch (err) {
        setError("Failed to load shifts: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchShifts();
  }, []);

  if (loading) {
    return <div>Loading shifts...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Work Shifts</h2>
      <ShiftsTable shifts={shifts} extra={(shift) => (
        <tr>
          <td colSpan={3}>expaned</td>
        </tr>
      )} />
    </div>
  );
}

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
          shifts.map((shift) => (
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
          ))
        ) : (
          <tr>
            <td colSpan="3">No shifts found</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}