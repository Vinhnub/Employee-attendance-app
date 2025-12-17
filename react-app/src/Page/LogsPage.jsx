import React, { useEffect, useState } from "react";
import * as managementService from "../Service/Management";
import { useNavigate, useParams } from "react-router-dom";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";
import { usePopup } from "../Component/PopUp";
import Calendar from "../Component/Calendar";
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
  }, [date]);

  return (
    <Layout Navbar={ManagerNav}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Activity Logs</h2>
        </div>

        <div className={styles.dateSelector}>
          <Calendar
            value={date}
            onChange={(dateStr) => navigate(`/Logs/${dateStr}`)}
          />
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
