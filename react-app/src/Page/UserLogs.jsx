import React, { useEffect, useState } from "react";
import * as managementService from "../Service/Management";
import { useParams } from "react-router-dom";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";
import styles from "./UserLogs.module.css";

export default function UserLogs() {
  const { id } = useParams();
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    const fetchUserLogs = async () => {
      try {
        const response = await managementService.getUserLogs(id);
        if (response.data.status == "success") {
          setLogs(response.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserLogs();
  }, [id]);
  return (
    <Layout Navbar={ManagerNav}>
      <div className={styles.container}>
        <h2 className={styles.title}>User Logs</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.logsTable}>
            <thead>
              <tr>
                <th className={styles.timeHeader}>Time</th>
                <th className={styles.actionHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <React.Fragment key={log.id}>
                    <tr className={styles.logRow}>
                      <td className={styles.timeCell}>{String(log.date_time).slice(11, 19)}</td>
                      <td className={styles.actionCell}>{log.content}</td>
                    </tr>
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td className={styles.noLogs} colSpan={2}>No logs available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
