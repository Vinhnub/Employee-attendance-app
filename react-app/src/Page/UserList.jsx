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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {userList.length > 0 ? (
          userList.map((user, key) => (
            <div key={key} style={{ width: "100%" }}>
              {user.username}
              {user.fullname}
              {user.role}
            </div>
          ))
        ) : (
          <p>No user found</p>
        )}
      </div>
    </Layout>
  );
}

// <table>
//           <thead>
//             <tr>
//               <th>UserName</th>
//               <th>Full Name</th>
//               <th>Role</th>
//             </tr>
//           </thead>
//           <tbody>
//             {userList.length > 0 ? (
//               userList.map((user, index) => (
//                 <tr
//                   className={styles.user}
//                   key={index}
//                   onClick={() => navigate(`/user/${user.id}`)}
//                 >
//                   <td>{user.username}</td>
//                   <td>{user.fullname}</td>
//                   <td>{user.role}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <th colSpan={3}>No users</th>
//               </tr>
//             )}
//           </tbody>
//         </table>
