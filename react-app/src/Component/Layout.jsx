import React from "react";
import styles from "./Layout.module.css";

export default function Layout({ Navbar, children }) {
  return (
    <div className={styles.layout}>
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.navbar}>
        <Navbar />
      </div>
    </div>
  );
}
