import React, { createContext, useContext, useCallback, useState, useMemo } from "react";
import styles from "./Component.module.css";

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [popups, setPopups] = useState([]);

  const popup = useCallback((content, type = "top-box", duration = 3000) => {
    const id = Date.now();
    const close = () => setPopups((p) => p.filter((p) => p.id != id));
    setPopups((p) => [...p, { content, id, type, close }]);
    if (type !== "confirm") {
      setTimeout(close, duration);
    }
    return close;
  }, []);

  const confirm = useCallback((message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel") => {
    const id = Date.now();
    const close = () => setPopups((p) => p.filter((p) => p.id != id));

    const content = (
      <div>
        <div style={{ marginBottom: "24px", fontSize: "16px", lineHeight: "1.5" }}>
          {message}
        </div>
        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            onClick={() => {
              if (onCancel) onCancel();
              close();
            }}
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
            onClick={() => {
              if (onConfirm) onConfirm();
              close();
            }}
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
    );

    setPopups((p) => [...p, { content, id, type: "confirm", close }]);
    return close;
  }, []);

  const contextValue = useMemo(() => ({ popup, confirm }), [popup, confirm]);

  return (
    <PopupContext.Provider value={contextValue}>
      {children}
      <PopupRenderer popups={popups} />
    </PopupContext.Provider>
  );
};

export default function PopupRenderer({ popups }) {
  const types = [...new Set(popups.map((p) => p.type))];
  return (
    <>
      {types.map((type) => {
        const tpopup = popups.filter((p) => p.type === type);
        return (
          <div className={styles[`${type}-page`]} key={type}>
            {tpopup.map((popup) => (
              <div className={styles[type]} key={popup.id}>
                {popup.content}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
}
