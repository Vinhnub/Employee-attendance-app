import React, { useEffect, useState, useCallback } from "react";
import * as managementService from "../Service/Management";
import * as authService from "../Service/Auth";
import { ShiftsTable } from "../Component/ShiftsTable";
import ManagerNav from "../Component/ManagerNav";
import UserNav from "../Component/UserNav";
import Layout from "../Component/Layout";
import { usePopup } from "../Component/PopUp";
import styles from "./TodayShifts.module.css";

export default function TodayShifts() {
  const [shifts, setShifts] = useState([]);
  const [user, setUser] = useState(null);
  const { popup } = usePopup();
  const [expandedShift, setExpandedShift] = useState(null);

  const fetchShifts = useCallback(async () => {
    try {
      const response = await managementService.getAllShifts();
      if (response.data.status === "success") {
        setShifts(response.data.data);
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
  }, [popup]);

  const handleRefreshSheet = useCallback(async () => {
    try {
      const response = await managementService.refreshSheet();
      if (response.data.status === "success") {
        popup(
          <div style={{ color: "#28a745", fontWeight: "500" }}>
            Đồng bộ dữ liệu thành công!
          </div>
        );
        // Refresh the shifts data after syncing
        await fetchShifts();
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
  }, [popup, fetchShifts]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.me();
        if (response.data.status === "success") {
          setUser(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  const handleCheckOut = async (shift) => {
    try {
      const response = await managementService.endShifts(shift.id);
      if (response.data.status === "success") {
        setExpandedShift(null); // Close the expanded row after checkout
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

  if (!user) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Đang tải...</h2>
        </div>
      </div>
    );
  }

  const isManager = user.role === "manager";

  return (
    <Layout Navbar={isManager ? ManagerNav : UserNav}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.titleSection}>
              <h2 className={styles.title}>Ca làm việc hôm nay</h2>
              <p className={styles.subtitle}>
                {isManager
                  ? "Giám sát và quản lý hoạt động ca làm việc hiện tại"
                  : "Xem lịch ca làm việc hôm nay"}
              </p>
            </div>
            <button
              className={`${styles.actionBtn} ${styles.refreshBtn}`}
              onClick={handleRefreshSheet}
              title="Đồng bộ dữ liệu với Google Sheets"
            >
              🔄 Đồng bộ
            </button>
          </div>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div
              className={`${styles.statusIndicator} ${styles.statusWorking}`}
            ></div>
            <span>Đang làm việc</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.statusIndicator} ${styles.statusCompleted}`}
            ></div>
            <span>Hoàn thành</span>
          </div>
          <div className={styles.legendItem}>
            <div
              className={`${styles.statusIndicator} ${styles.statusScheduled}`}
            ></div>
            <span>Đã lên lịch</span>
          </div>
        </div>

        <ShiftsTable
          shifts={shifts}
          showEmployeeName={true}
          user={user}
          expandedShift={expandedShift}
          setExpandedShift={setExpandedShift}
          handleCheckOut={handleCheckOut}
          isTodayShifts={true}
        />
      </div>
    </Layout>
  );
}
