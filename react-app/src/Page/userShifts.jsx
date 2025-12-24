import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShiftsTable } from "../Component/ShiftsTable";
import * as managementService from "../Service/Management";
import * as authService from "../Service/Auth";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";
import styles from "./UserShifts.module.css";

export default function UserShifts() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [currentUser, setCurrentUser] = useState();
  const [shifts, setShifts] = useState([]);
  const [popup, setPopup] = useState();

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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await managementService.getUser(id);
        if (response.data.status === "success") {
          setUser(response.data.data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error(err);
      }
      try {
        const response = await managementService.getUserShifts(id);
        if (response.data.status === "success") {
          setShifts(response.data.data);
        } else {
          setShifts([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, [id]);
  const [expandedShift, setExpandedShift] = useState(null);
  return (
    <Layout Navbar={ManagerNav}>
      <div className={styles.container}>
        {popup}
        <h2 className={styles.title}>Ca làm việc của người dùng</h2>
        <ShiftsTable
          shifts={shifts}
          user={currentUser}
          allowExpand={true}
          expandedShift={expandedShift}
          setExpandedShift={setExpandedShift}
        />
      </div>
    </Layout>
  );
}
