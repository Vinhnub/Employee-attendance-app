import React, { useEffect, useState, useCallback } from "react";
import * as managementService from "../Service/Management";
import * as authService from "../Service/Auth";
import { UpdateShift } from "../Component/ShiftsTable";
import ManagerNav from "../Component/ManagerNav";
import UserNav from "../Component/UserNav";
import Layout from "../Component/Layout";
import { usePopup } from "../Component/PopUp";
import styles from "./TodayShifts.module.css";

export default function TodayShifts() {
  const [shifts, setShifts] = useState([]);
  const [user, setUser] = useState(null);
  const { popup } = usePopup();
  const [expandedShift, setExpandedShift] = useState(null);

  const fetchShifts = useCallback(async () => {
    try {
      const response = await managementService.getAllShifts();
      if (response.data.status === "success") {
        setShifts(response.data.data);
      } else {
        popup(
          <div style={{ color: "#dc3545", fontWeight: "500" }}>
            {response.data.message}
          </div>
        );
      }
    } catch (err) {
      console.error(err);
      popup(
        <div style={{ color: "#dc3545", fontWeight: "500" }}>
          {err.message}
        </div>
      );
    }
  }, [popup]);

  const handleRefreshSheet = useCallback(async () => {
    try {
      const response = await managementService.refreshSheet();
      if (response.data.status === "success") {
        popup(
          <div style={{ color: "#28a745", fontWeight: "500" }}>
            Đồng bộ dữ liệu thành công!
          </div>
        );
        // Refresh the shifts data after syncing
        await fetchShifts();
      } else {
        popup(
          <div style={{ color: "#dc3545", fontWeight: "500" }}>
            {response.data.message}
          </div>
        );
      }
    } catch (err) {
      console.error(err);
      popup(
        <div style={{ color: "#dc3545", fontWeight: "500" }}>
          {err.message}
        </div>
      );
    }
  }, [popup, fetchShifts]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.me();
        if (response.data.status === "success") {
          setUser(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    fetchShifts();
  }, [fetchShifts]);

  function expandShift(shift) {
    setExpandedShift(shift.id === expandedShift ? null : shift.id);
  }

  const handleCheckOut = async (shift) => {
    try {
      const response = await managementService.endShifts(shift.id);
      if (response.data.status === "success") {
        expandShift(shift);
      } else {
        popup(
          <div style={{ color: "#dc3545", fontWeight: "500" }}>
            {response.data.message}
          </div>
        );
      }
    } catch (err) {
      console.error(err);
      popup(
        <div style={{ color: "#dc3545", fontWeight: "500" }}>
          {err.message}
        </div>
      );
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return "--:--";
    return String(timeString).slice(11, 16);
  };

  const getStatusColor = (shift) => {
    if (shift.is_working) return styles.statusWorking;
    if (shift.end_time && shift.end_time !== shift.start_time) return styles.statusCompleted;
    return styles.statusScheduled;
  };

  if (!user) {
    return (
      <Layout Navbar={ManagerNav}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>Đang tải...</h2>
          </div>
        </div>
      </Layout>
    );
  }

  const isManager = user.role === 'manager';

  return (
    <Layout Navbar={isManager ? ManagerNav : UserNav}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.titleSection}>
              <h2 className={styles.title}>Ca làm việc hôm nay</h2>
              <p className={styles.subtitle}>
                {isManager ? 'Giám sát và quản lý hoạt động ca làm việc hiện tại' : 'Xem lịch ca làm việc hôm nay'}
              </p>
            </div>
            <button
              className={`${styles.actionBtn} ${styles.refreshBtn}`}
              onClick={handleRefreshSheet}
              title="Đồng bộ dữ liệu với Google Sheets"
            >
              🔄 Đồng bộ
            </button>
          </div>
        </div>

        <div className={styles.legend}>
          <div className={styles.legendItem}>
            <div className={`${styles.statusIndicator} ${styles.statusWorking}`}></div>
            <span>Đang làm việc</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.statusIndicator} ${styles.statusCompleted}`}></div>
            <span>Hoàn thành</span>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.statusIndicator} ${styles.statusScheduled}`}></div>
            <span>Đã lên lịch</span>
          </div>
        </div>

        <table className={styles.shiftsTable}>
            <thead>
              <tr>
                <th>Tên nhân viên</th>
                <th>Thời gian bắt đầu</th>
                <th>Thời gian kết thúc</th>
                <th>Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {shifts.length > 0 ? (
                shifts.map((shift) => (
                  <React.Fragment key={shift.id}>
                    <tr
                      className={`${styles.shiftRow} ${getStatusColor(shift)} ${expandedShift === shift.id ? styles.expanded : ''}`}
                      onClick={() => expandShift(shift)}
                    >
                      <td className={`${styles.shiftCell} ${styles.staffCell}`}>
                        <div className={styles.staffName}>{shift.fullname}</div>
                        <div className={`${styles.statusIndicator} ${styles.statusIndicatorSmall} ${getStatusColor(shift)}`}></div>
                      </td>
                      <td className={`${styles.shiftCell} ${styles.timeCell}`}>
                        <div className={styles.timeDisplay}>
                          {formatTime(shift.start_time)}
                        </div>
                      </td>
                      <td className={`${styles.shiftCell} ${styles.timeCell}`}>
                        <div className={styles.timeDisplay}>
                          {formatTime(shift.end_time)}
                        </div>
                      </td>
                      <td className={`${styles.shiftCell} ${styles.noteCell}`}>
                        <div className={styles.noteText} title={shift.note}>
                          {shift.note}
                        </div>
                      </td>
                    </tr>
                    {expandedShift === shift.id && (
                      <tr className={styles.detailRow}>
                        <td colSpan={5} className={styles.detailCell}>
                          <div className={styles.detailContent}>
                            <div className={styles.detailInfo}>
                              <div className={styles.detailItem}>
                                <strong>ID nhân viên:</strong> {shift.user_id}
                              </div>
                              <div className={styles.detailItem}>
                                <strong>ID ca làm việc:</strong> {shift.id}
                              </div>
                              <div className={styles.detailItem}>
                                <strong>Trạng thái:</strong>
                                <span className={`${styles.statusBadge} ${getStatusColor(shift)}`}>
                                  {shift.is_working ? 'Đang hoạt động' : shift.end_time && shift.end_time !== shift.start_time ? 'Hoàn thành' : 'Đã lên lịch'}
                                </span>
                              </div>
                            </div>

                            {isManager && (
                              <div className={styles.detailActions}>
                                {shift.is_working ? (
                                  <button
                                    className={`${styles.actionBtn} ${styles.checkOutBtn}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCheckOut(shift);
                                    }}
                                  >
                                    🕐 Điểm danh ra
                                  </button>
                                ) : (
                                  <div className={styles.updateActions}>
                                    <UpdateShift
                                      shift={shift}
                                      id={shift.user_id}
                                      expandShift={expandShift}
                                      setPopup={(msg) => popup(
                                        <div style={{ color: msg.includes('success') ? "#28a745" : "#dc3545", fontWeight: "500" }}>
                                          {msg}
                                        </div>
                                      )}
                                    />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className={styles.noShifts}>
                    <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>📅</div>
                      <div className={styles.emptyMessage}>Không có ca làm việc nào được lên lịch hôm nay</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
      </div>
    </Layout>
  );
}
