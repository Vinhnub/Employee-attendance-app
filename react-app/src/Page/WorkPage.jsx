import React, { useState, useEffect, Fragment } from "react";
import * as employeeService from "../Service/Employee";
import * as authService from "../Service/Auth";
import { ShiftsTable } from "../Component/ShiftsTable";
import { usePopup } from "../Component/PopUp";
import UserNav from "../Component/UserNav";
import Layout from "../Component/Layout";
import styles from "./Workpage.module.css";

export default function WorkPage() {
  const [shifts, setShifts] = useState([]);
  const [expandedShift, setExpandedShift] = useState(null);
  const { popup } = usePopup();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await authService.me();
        if (response.data.status === "success") {
          setCurrentUser(response.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCurrentUser();
  }, []);
  const handleCheckOut = async (shift) => {
    try {
      const response = await employeeService.end_shift(shift.id);
      if (response.data.status === "success") {
        //popup(<p style={{ color: "green" }}>{response.data.message}</p>);
        setExpandedShift(null); // Close the expanded row after checkout
        // Refresh shifts
        const res = await employeeService.shifts();
        if (res.data.status == "success") {
          setShifts(res.data.data);
          popup(
          <div style={{ color: "green", fontWeight: "500" }}>
            {response.data.message}
          </div>
        );
        }
      } else {
        popup(
          <div style={{ color: "#dc3545", fontWeight: "500" }}>
            {response.data.message}
          </div>
        );
      }
    } catch (err) {
      console.error(err);
      popup(
        <div style={{ color: "#dc3545", fontWeight: "500" }}>{err.message}</div>
      );
    }
  };

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
      <h2 className={styles.title}>Ca làm việc trong tháng</h2>
      <ShiftsTable
        shifts={shifts}
        user={currentUser}
        allowExpand={true}
        expandedShift={expandedShift}
        setExpandedShift={setExpandedShift}
        handleCheckOut={handleCheckOut}
      />
    </Layout>
  );
}
