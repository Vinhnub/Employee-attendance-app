import React, { useEffect, useState } from "react";
import * as managementService from "../Service/Management";
import * as authService from "../Service/Auth";
import { UpdateShift } from "../Component/ShiftsTable";
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
    const fetchShifts = async () => {
      try {
        const response = await managementService.getAllShifts();
        if (response.data.status === "success") {
          setShifts(response.data.data);
          popup(
            <div style={{ color: "#28a745", fontWeight: "500" }}>
              {response.data.message}
            </div>
          );
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
          <div style={{ color: "#dc3545", fontWeight: "500" }}>
            {err.message}
          </div>
        );
      }
    };
    fetchShifts();
  }, [popup]);

  function expandShift(shift) {
    setExpandedShift(shift.id === expandedShift ? null : shift.id);
  }

  const handleCheckOut = async (shift) => {
    try {
      const response = await managementService.endShifts(shift.id);
      if (response.data.status === "success") {
        popup(
          <div style={{ color: "#28a745", fontWeight: "500" }}>
            {response.data.message}
          </div>
        );
        expandShift(shift);
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
        <div style={{ color: "#dc3545", fontWeight: "500" }}>
          {err.message}
        </div>
      );
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "--:--";
    return String(timeString).slice(11, 16);
  };

  const getStatusColor = (shift) => {
    if (shift.is_working) return styles.statusWorking;
    if (shift.end_time && shift.end_time !== shift.start_time) return styles.statusCompleted;
    return styles.statusScheduled;
  };

  if (!user) {
    return (
      <Layout Navbar={ManagerNav}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Loading...</h2>
          </div>
        </div>
      </Layout>
    );
  }

  const isManager = user.role === 'manager';

  return (
    <Layout Navbar={isManager ? ManagerNav : UserNav}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Today's Shifts</h2>
          <p className={styles.subtitle}>
            {isManager ? 'Monitor and manage current shift activities' : 'View today\'s shift schedule'}
          </p>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.statusIndicator} ${styles.statusWorking}`}></div>
            <span>Currently Working</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.statusIndicator} ${styles.statusCompleted}`}></div>
            <span>Completed</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.statusIndicator} ${styles.statusScheduled}`}></div>
            <span>Scheduled</span>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.shiftsTable}>
            <thead>
              <tr>
                <th>Staff Name</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Note</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shifts.length > 0 ? (
                shifts.map((shift) => (
                  <React.Fragment key={shift.id}>
                    <tr
                      className={`${styles.shiftRow} ${getStatusColor(shift)} ${expandedShift === shift.id ? styles.expanded : ''}`}
                      onClick={() => expandShift(shift)}
                    >
                      <td className={styles.staffCell}>
                        <div className={styles.staffName}>{shift.fullname}</div>
                        <div className={`${styles.statusIndicator} ${styles.statusIndicatorSmall} ${getStatusColor(shift)}`}></div>
                      </td>
                      <td className={styles.timeCell}>
                        <div className={styles.timeDisplay}>
                          {formatTime(shift.start_time)}
                        </div>
                      </td>
                      <td className={styles.timeCell}>
                        <div className={styles.timeDisplay}>
                          {formatTime(shift.end_time)}
                        </div>
                      </td>
                      <td className={styles.noteCell}>
                        <div className={styles.noteText} title={shift.note}>
                          {shift.note || "No note"}
                        </div>
                      </td>
                      <td className={styles.actionCell}>
                        <button className={`${styles.expandBtn} ${expandedShift === shift.id ? styles.rotate : ''}`}>
                          ▼
                        </button>
                      </td>
                    </tr>
                    {expandedShift === shift.id && (
                      <tr className={styles.detailRow}>
                        <td colSpan={5} className={styles.detailCell}>
                          <div className={styles.detailContent}>
                            <div className={styles.detailInfo}>
                              <div className={styles.detailItem}>
                                <strong>Staff ID:</strong> {shift.user_id}
                              </div>
                              <div className={styles.detailItem}>
                                <strong>Shift ID:</strong> {shift.id}
                              </div>
                              <div className={styles.detailItem}>
                                <strong>Status:</strong>
                                <span className={`${styles.statusBadge} ${getStatusColor(shift)}`}>
                                  {shift.is_working ? 'Active' : shift.end_time && shift.end_time !== shift.start_time ? 'Completed' : 'Scheduled'}
                                </span>
                              </div>
                            </div>

                            {isManager && (
                              <div className={styles.detailActions}>
                                {shift.is_working ? (
                                  <button
                                    className={`${styles.actionBtn} ${styles.checkOutBtn}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCheckOut(shift);
                                    }}
                                  >
                                    🕐 Check Out
                                  </button>
                                ) : (
                                  <div className={styles.updateActions}>
                                    <UpdateShift
                                      shift={shift}
                                      id={shift.user_id}
                                      expandShift={expandShift}
                                      setPopup={(msg) => popup(
                                        <div style={{ color: msg.includes('success') ? "#28a745" : "#dc3545", fontWeight: "500" }}>
                                          {msg}
                                        </div>
                                      )}
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.noShifts}>
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>📅</div>
                      <div className={styles.emptyMessage}>No shifts scheduled for today</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
