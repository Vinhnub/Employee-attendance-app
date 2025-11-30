import React, { useState, useEffect } from "react";
import * as managementService from "../Service/Management";
import styles from "./UserList.module.css";
import { useNavigate } from "react-router-dom";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await managementService.getAllUser();
        if (response.data.data && Array.isArray(response.data.data)) {
          setUserList(response.data.data);
        } else {
          setUserList([]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUserList();
  }, []);

  return (
    <Layout Navbar={ManagerNav}>
      <div className={styles.container}>
        <h2 className={styles.title}>User List</h2>
        <div className={styles.tableWrapper}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 ? (
                userList.map((user, index) => (
                  <tr
                    className={styles.user}
                    key={index}
                    onClick={() => navigate(`/user/${user.id}`)}
                  >
                    <td>{user.username}</td>
                    <td>{user.fullname}</td>
                    <td>{user.role}</td>
                    <td className={styles.statusCell}>
                      {user.isOnline || user.is_working ?
                        <span className={styles.online}>Đang làm</span> :
                        <span className={styles.offline}>Offline</span>
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noUsers}>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
