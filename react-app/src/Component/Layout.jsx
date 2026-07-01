import React from "react";
import Header from "./Header";
import styles from "./Layout.module.css";

export default function Layout({ Navbar, children }) {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.content}>
        {children}
      </div>
      <div className={styles.navbar}>
        <Navbar />
      </div>
    </div>
  );
}
