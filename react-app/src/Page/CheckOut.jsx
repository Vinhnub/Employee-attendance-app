import React, { useState } from "react";
import * as employeeService from "../Service/Employee"

export default function CheckOut() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckOut = async () => {
    setLoading(true);
    try {
      const response = await employeeService.CheckOut();
      if (response.data.status === "success") {
        setStatus(true);
      } else {
        setStatus(false);
      }
    } catch (err) {
      console.error("Check out error:", err);
      setStatus(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Check Out</h2>
      <button
        onClick={handleCheckOut}
        disabled={loading}
      >
        {loading ? 'Checking Out...' : 'Check Out'}
      </button>

      {status === true && (
        <h4 style={{ color: 'green'}}>Check out successful!</h4>
      )}
      {status === false && (
        <h4 style={{ color: 'red'}}>Check out failed. Please try again.</h4>
      )}
    </div>
  );
}
