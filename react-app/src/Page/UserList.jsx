import React, { useState, useEffect } from "react";
import * as managementService from "../Service/Management";
import styles from "./UserList.module.css";
import { useNavigate } from "react-router-dom";
import ManagerNav from "../Component/ManagerNav";
import Layout from "../Component/Layout";

export default function UserList() {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const roleLabels = { staff: "Nhân viên", manager: "Quản lý" };
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
        <h2 className={styles.title}>Danh sách Nhân viên</h2>

        {/* Desktop Table View */}
        <div className={styles.desktopTable}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Tên đăng nhập</th>
                <th>Họ và tên</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
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
                    <td className={styles.roleCell}>{roleLabels[user.role] || user.role}</td>
                    <td className={styles.statusCell}>
                      {user.isOnline || user.is_working ?
                        <span className={styles.online}>Trực tuyến</span> :
                        <span className={styles.offline}>Ngoại tuyến</span>
                      }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className={styles.noUsers}>Không tìm thấy người dùng nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List View */}
        <div className={styles.mobileList}>
          {userList.length > 0 ? (
            userList.map((user, index) => (
              <div
                className={styles.userRow}
                key={index}
                onClick={() => navigate(`/user/${user.id}`)}
              >
                <div className={styles.userInfo}>
                  <div className={styles.topRow}>
                    <span className={styles.username}>{user.fullname}</span>
                    <span className={`${styles.statusLabel} ${user.isOnline || user.is_working ? styles.onlineLabel : styles.offlineLabel}`}>
                      {user.isOnline || user.is_working ? '● Trực tuyến' : '● Ngoại tuyến'}
                    </span>
                  </div>
                  <div className={styles.bottomRow}>
                    <span className={styles.fullName}>{user.username || 'Không có tên'}</span>
                    <span className={`${styles.roleLabel} ${styles[user.role]}`}>
                      {roleLabels[user.role] || user.role}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noUsers}>Không tìm thấy người dùng nào</div>
          )}
        </div>
      </div>
    </Layout>
  );
}
