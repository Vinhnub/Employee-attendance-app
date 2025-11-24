import React, { useEffect, useState } from "react";
import * as managementService from "../Service/Management";
import { useParams } from "react-router-dom";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";

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
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (
            logs.map((log) => (
              <React.Fragment key={log.id}>
                <tr>
                  <td>{String(log.date_time).slice(11, 19)}</td>
                  <td>{log.content}</td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={2}>Use have no log</td>
            </tr>
          )}
        </tbody>
      </table>
    </Layout>
  );
}
