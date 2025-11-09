import React, { useEffect, useState } from "react";
import * as managementService from "../Service/Management";
import { useNavigate, useParams } from "react-router-dom";

export default function LogsPage() {
  const { date } = useParams();
  const [popup, setPopup] = useState();
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await managementService.getLogs((date.replace(/-/g, '/')));
        if (response.data.status == "success") {
          setLogs(response.data.data);
          setPopup(<h4 style={{ color: "green" }}>{response.data.message}</h4>);
        } else {
          setLogs([]);
          setPopup(<h4 style={{ color: "red" }}>{response.data.message}</h4>);
        }
      } catch (err) {
        console.error(err);
        setPopup(<h4 style={{ color: "red" }}>{error.message}</h4>);
      }
    }
    setTimeout(() => setPopup(null), 5000);
    fetchLogs();
  }, [date])
  return (
    <div>
      {popup}
      <input
        type="date"
        value={date}
        onChange={(e) => navigate(`/Logs/${e.target.value}`)}
      />
      <table>
        <thead>
          <tr>
            <th>Actor</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.length > 0 ? (logs.map((log) => (
            <React.Fragment key={log.id}>
              <tr>
                <td style={{ border: '5px solid pink', padding: '1rem' }}>{log.fullname}</td>
                <td style={{ border: '5px solid pink', padding: '1rem' }}>{String(log.date_time).slice(11, 19)}</td>
                <td style={{ border: '5px solid pink', padding: '1rem' }}>{log.content}</td>
              </tr>
            </React.Fragment>
          ))) : (
            <tr>
              <td colSpan={3}>No log found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}