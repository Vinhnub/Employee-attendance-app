import React, { useState, useEffect, Fragment } from "react";
import * as employeeService from "../Service/Employee";
import { ShiftsTable } from "../Component/ShiftsTable";
import { usePopup } from "../Component/PopUp";
import UserNav from "../Component/UserNav";
import Layout from "../Component/Layout";

export default function WorkPage() {
  const [shifts, setShifts] = useState([]);
  const { popup } = usePopup();
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const response = await employeeService.shifts();
        if (response.data.status == "success") {
          setShifts(response.data.data);
        } else {
          setShifts([]);
          popup(<h4 style={{ color: "red" }}>{response.data.message}</h4>);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchShifts();
  }, []);
  return (
    <Layout Navbar={UserNav}>
      <h2>Work Shifts</h2>
      <ShiftsTable shifts={shifts} />
    </Layout>
  );
}
