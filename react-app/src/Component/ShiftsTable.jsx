import React from "react";

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