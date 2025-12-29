import React, { useState } from "react";
import * as managementService from "../Service/Management";
import styles from "./ShiftsTable.module.css";
import { usePopup } from "../Component/PopUp";

export function ShiftsTable({
  shifts,
  func,
  extra,
  showEmployeeName = false,
  user = null,
  expandedShift,
  setExpandedShift,
  handleCheckOut,
  isTodayShifts = false,
  allowExpand = false,
}) {
  const { popup } = usePopup();

  const formatTime = (timeString) => {
    if (!timeString) return "--:--";
    return String(timeString).slice(11, 16);
  };

  const getStatusColor = (shift) => {
    if (shift.is_working) return styles.working;
    if (shift.end_time && shift.end_time !== shift.start_time)
      return styles.completed;
    return styles.scheduled;
  };

  function expandShift(shift) {
    setExpandedShift &&
      setExpandedShift(shift.id === expandedShift ? null : shift.id);
  }

  const handleCheckOutInternal = async (shift) => {
    if (handleCheckOut) {
      handleCheckOut(shift);
    }
  };

  return (
    <table className={styles.shiftsTable}>
      <thead>
        <tr>
          {showEmployeeName && <th>Tên nhân viên</th>}
          <th>Bắt đầu</th>
          <th>Kết thúc</th>
        </tr>
      </thead>
      <tbody>
        {shifts.length > 0 ? (
          [...shifts]
            .sort()
            .reverse()
            .map((shift) => (
              <React.Fragment key={shift.id}>
                <tr
                  className={`${styles.shiftRow} ${getStatusColor(shift)} ${
                    expandedShift === shift.id ? styles.expanded : ""
                  }`}
                  onClick={() => expandShift(shift)}
                >
                  {showEmployeeName && (
                    <td className={`${styles.shiftCell} ${styles.staffCell}`}>
                      <div className={styles.staffName}>{shift.fullname}</div>
                      <div
                        className={`${styles.statusIndicator} ${
                          styles.statusIndicatorSmall
                        } ${getStatusColor(shift)}`}
                      ></div>
                    </td>
                  )}
                  <td className={`${styles.shiftCell} ${styles.timeCell}`}>
                    {isTodayShifts ? (
                      <div className={styles.timeDisplay}>
                        {formatTime(shift.start_time)}
                      </div>
                    ) : (
                      shift.start_time || "Không có"
                    )}
                  </td>
                  <td className={`${styles.shiftCell} ${styles.timeCell}`}>
                    {isTodayShifts ? (
                      <div className={styles.timeDisplay}>
                        {formatTime(shift.end_time)}
                      </div>
                    ) : (
                      shift.end_time || "Không có"
                    )}
                  </td>
                </tr>
                <tr
                  className={`${styles.shiftRow} ${getStatusColor(shift)} ${
                    expandedShift === shift.id ? styles.expanded : ""
                  }`}
                  onClick={() => expandShift(shift)}
                >
                  <td
                    colSpan={showEmployeeName ? 3 : 2}
                    className={`${styles.shiftCell} ${styles.noteCell}`}
                  >
                    <div className={styles.noteText} title={shift.note}>
                      {shift.note}
                    </div>
                  </td>
                </tr>
                {((isTodayShifts && expandedShift === shift.id) ||
                  (allowExpand && expandedShift === shift.id)) && (
                  <tr className={styles.detailRow}>
                    <td
                      colSpan={showEmployeeName ? 3 : 2}
                      className={styles.detailCell}
                    >
                      <div className={styles.detailContent}>
                        <div className={styles.detailInfo}>
                        <div className={styles.detailItem}>
                          <strong>ID nhân viên:</strong> {shift.user_id || user?.id}
                        </div>
                          <div className={styles.detailItem}>
                            <strong>ID ca làm việc:</strong> {shift.id}
                          </div>
                          <div className={styles.detailItem}>
                            <strong>Trạng thái:</strong>
                            <span
                              className={`${
                                styles.statusBadge
                              } ${getStatusColor(shift)}`}
                            >
                              {shift.is_working
                                ? "Đang hoạt động"
                                : shift.end_time &&
                                  shift.end_time !== shift.start_time
                                ? "Hoàn thành"
                                : "Đã lên lịch"}
                            </span>
                          </div>
                          {shift.note && (
                            <div className={styles.detailItem}>
                              <strong>Ghi chú:</strong> {shift.note}
                            </div>
                          )}
                        </div>
                        {user && (isTodayShifts || allowExpand) && (
                          <div className={styles.detailActions}>
                            {shift.is_working ? (
                              <button
                                className={`${styles.actionBtn} ${styles.checkOutBtn}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCheckOutInternal(shift);
                                }}
                              >
                                🕐 Điểm danh ra
                              </button>
                            ) : (
                              user.role === "manager" && (
                                <div className={styles.updateActions}>
                                  <UpdateShift
                                    shift={shift}
                                    id={shift.user_id || user?.id}
                                    expandShift={expandShift}
                                    setPopup={(msg) =>
                                      popup(
                                        <div
                                          style={{
                                            color: msg.includes("success")
                                              ? "#28a745"
                                              : "#dc3545",
                                            fontWeight: "500",
                                          }}
                                        >
                                          {msg}
                                        </div>
                                      )
                                    }
                                  />
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
                {extra && extra(shift)}
              </React.Fragment>
            ))
        ) : (
          <tr>
            <td className={styles.noShifts} colSpan={showEmployeeName ? 3 : 2}>
              {isTodayShifts ? (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>📅</div>
                  <div className={styles.emptyMessage}>
                    Không có ca làm việc nào được lên lịch hôm nay
                  </div>
                </div>
              ) : (
                "Không tìm thấy ca làm việc"
              )}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export function UpdateShift({ shift, id, expandShift, setPopup = () => {} }) {
  const [startTime, setStartTime] = useState(
    shift.start_time ? String(shift.start_time).slice(11, 16) : ""
  );
  const [endTime, setEndTime] = useState(
    shift.end_time ? String(shift.end_time).slice(11, 16) : ""
  );
  const [note, setNote] = useState(shift.note || "");
  const { popup } = usePopup();
  const handleChange = async (shift) => {
    const editShift = {
      new_start_time:
        String(shift.start_time).slice(0, 10) + " " + startTime + ":00",
      new_end_time: String(shift.end_time).slice(0, 10) + " " + endTime + ":00",
      new_note: note,
    };
    try {
      const response = await managementService.editShifts(
        id,
        shift.id,
        editShift
      );
      if (response.data.status == "success") {
        expandShift(shift);
        shift.start_time = editShift.new_start_time;
        shift.end_time = editShift.new_end_time;
        shift.note = editShift.new_note;
        popup(<div style={{ color: "green" }}>{response.data.message}</div>);
      } else {
        setPopup(<h4 style={{ color: "red" }}>{response.data.message}</h4>);
      } 
    } catch (err) {
      console.error(err);
      setPopup(<h4 style={{ color: "red" }}>{err.message}</h4>);
    }
    setTimeout(() => setPopup(null), 5000);
  };
  return (
    <div className={styles.updateForm}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleChange(shift);
        }}
      >
        <input
          className={styles.updateInput}
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          className={styles.updateInput}
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
        <input
          className={styles.updateInput}
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button className={styles.updateButton} type="submit">
          Cập nhật
        </button>
      </form>
    </div>
  );
}
