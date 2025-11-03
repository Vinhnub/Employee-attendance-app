import React, { useState, useEffect } from "react";
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
            shifts.map((shift, index) => (
              <tr key={index} style={{ color: `${shift.is_working ? '#ff0000' : '#00ff00'}`}}>
                <td style={{border:'5px solid pink', padding:'1rem'}}>{shift.start_time || 'N/A'}</td>
                <td style={{border:'5px solid pink', padding:'1rem'}}>{shift.end_time || 'N/A'}</td>
                <td style={{border:'5px solid pink', padding:'1rem'}}>{shift.note || ''}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No shifts found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
