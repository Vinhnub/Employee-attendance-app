import React, { useState,useEffect } from "react";
import * as managementService from "../Service/Management";
import styles from "./UserList.module.css";

export default function UserList() {
  const [userList, setUserList] = useState([]);

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
        setError("Failed to load users list: " + err.message);
      }
    };
    fetchUserList();
  }, []);
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Full Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {userList.length > 0 ? (
            userList.map((user, index) => (
              <tr className={styles.user} key={index}>
                <th>{user.id}</th>
                <th>{user.username}</th>
                <th>{user.fullname}</th>
                <th>{user.role}</th>
                
              </tr>
            ))
          ) : (
            <tr>
              <th colSpan={4}>No users</th>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
