import React from "react";
import styles from "./Component.module.css";

export default function ConfirmDialog({ message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel" }) {
  return (
    <div className={styles["center-box-page"]}>
      <div className={styles["center-box"]}>
        <div style={{ marginBottom: "24px", fontSize: "16px", lineHeight: "1.5" }}>
          {message}
        </div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "8px 16px",
              border: "1px solid var(--border-light)",
              borderRadius: "6px",
              background: "var(--bg-card)",
              color: "var(--text-primary)",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              background: "var(--color-danger)",
              color: "white",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
