import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar({ components }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className={styles.navbar}>
      {components.map((component, key) => (
        <button
          key={key}
          className={`${styles.navButton} ${
            location.pathname.includes(component.link) ? styles.active : ""
          }`}
          onClick={() => navigate(`../${component.link}`)}
        >
          <span className={styles.icon}>{component.icon}</span>
          <span className={styles.navLabel}>{component.label}</span>
        </button>
      ))}
    </nav>
  );
}
