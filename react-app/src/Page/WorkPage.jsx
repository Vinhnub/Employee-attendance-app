import React, { useState, useEffect, Fragment } from "react";
import * as employeeService from "../Service/Employee";
import { ShiftsTable } from "../Component/ShiftsTable";

export default function WorkPage() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await employeeService.shifts();
        if (response.data.message == "success") {
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
      <ShiftsTable shifts={shifts} />
    </div>
  );
}