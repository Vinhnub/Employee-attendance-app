import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Unauthorized.module.css";

export default function Unauthorized() {
  const navigate = useNavigate();

  const handleReturnToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Access Denied</h1>
        <p className={styles.message}>You are not authorized to view this page</p>
        <button className={styles.button} onClick={handleReturnToLogin}>
          Return to Login
        </button>
      </div>
    </div>
  );
}
