import React, { useEffect, useState } from "react";
import * as managementService from "../Service/Management";
import { useNavigate, useParams } from "react-router-dom";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";
import { usePopup } from "../Component/PopUp";
import styles from "./LogsPage.module.css";

export default function LogsPage() {
  const { date } = useParams();
  const { popup } = usePopup();
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await managementService.getLogs(
          date.replace(/-/g, "/")
        );
        if (response.data.status === "success") {
          setLogs(response.data.data);
          popup(
            <div style={{ color: "#28a745", fontWeight: "500" }}>
              {response.data.message}
            </div>
          );
        } else {
          setLogs([]);
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

    fetchLogs();
  }, [date, popup]);

  const formatDateForDisplay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout Navbar={ManagerNav}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Activity Logs</h2>
        </div>

        <div className={styles.dateSelector}>
          <label htmlFor="dateInput" className={styles.dateLabel}>
            Select Date:
          </label>
          <input
            id="dateInput"
            type="date"
            value={date}
            onChange={(e) => navigate(`/Logs/${e.target.value}`)}
            className={styles.dateInput}
          />
          {date && (
            <div className={styles.selectedDate}>
              {formatDateForDisplay(date)}
            </div>
          )}
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.logsTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Time</th>
                <th>Activity</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <tr key={log.id} className={styles.logRow}>
                    <td className={styles.actorCell}>
                      <div className={styles.actorName}>{log.fullname}</div>
                    </td>
                    <td className={styles.timeCell}>
                      <div className={styles.timeText}>
                        {String(log.date_time).slice(11, 19)}
                      </div>
                      <div className={styles.dateText}>
                        {String(log.date_time).slice(0, 10)}
                      </div>
                    </td>
                    <td className={styles.actionCell}>
                      <div className={styles.actionContent}>{log.content}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className={styles.noLogs}>
                    No activity logs found for this date
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
