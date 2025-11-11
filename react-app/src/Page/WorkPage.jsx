import React, { useState, useEffect, Fragment } from "react";
import * as employeeService from "../Service/Employee";
import { ShiftsTable } from "../Component/ShiftsTable";
import { usePopup } from "../Component/PopUp";

export default function WorkPage() {
  const [shifts, setShifts] = useState([]);
  const popup = usePopup();
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const loading = popup(`Loading...`, "center-box");
        const response = await employeeService.shifts();
        loading();
        if (response.data.status == "success") {
          setShifts(response.data.data);
          popup(<h4 style={{color:"green"}}>{response.data.message}</h4>);
        } else {
          setShifts([]);
          popup(<h4 style={{color:"red"}}>{response.data.message}</h4>);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchShifts();
  }, []);
  return (
    <div style={{ padding: 20 }}>
      <h2>Work Shifts</h2>
      <ShiftsTable shifts={shifts} />
    </div>
  );
}