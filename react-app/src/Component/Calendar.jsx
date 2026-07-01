import React, { useState } from 'react';
import styles from './Calendar.module.css';

export default function Calendar({ value, onChange }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const selectedDate = value ? new Date(value) : null;

  const getDaysInMonth = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const days = [];

    // Add previous month's days to fill the first week
    const dayOfWeek = start.getDay();
    const prevMonthEnd = new Date(date.getFullYear(), date.getMonth(), 0).getDate();

    for (let i = dayOfWeek - 1; i >= 0; i--) {
      const prevDate = prevMonthEnd - i;
      days.push({
        date: new Date(date.getFullYear(), date.getMonth() - 1, prevDate),
        isCurrentMonth: false
      });
    }

    // Add current month's days
    for (let day = 1; day <= end.getDate(); day++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth(), day),
        isCurrentMonth: true
      });
    }

    // Add next month's days to fill the last week
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        date: new Date(date.getFullYear(), date.getMonth() + 1, day),
        isCurrentMonth: false
      });
    }

    return days;
  };

  const handleDateSelect = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    onChange(dateStr);
    setShowCalendar(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return 'Select Date';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const days = getDaysInMonth(currentDate);
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className={styles.calendarContainer}>
      <div
        className={styles.dateDisplay}
        onClick={() => setShowCalendar(!showCalendar)}
      >
        <span className={styles.displayText}>
          {formatDisplayDate(value)}
        </span>
        <svg className={`${styles.arrow} ${showCalendar ? styles.rotated : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {showCalendar && (
        <>
          <div className={styles.overlay} onClick={() => setShowCalendar(false)} />
          <div className={styles.calendar}>
            <div className={styles.header}>
              <button type="button" onClick={handlePrevMonth} className={styles.navButton}>
                ‹
              </button>
              <div className={styles.monthYear}>
                {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button type="button" onClick={handleNextMonth} className={styles.navButton}>
                ›
              </button>
            </div>

            <div className={styles.weekDays}>
              {weekDays.map(day => (
                <div key={day} className={styles.weekDay}>
                  {day}
                </div>
              ))}
            </div>

            <div className={styles.daysGrid}>
              {days?.map((day, index) => {
                const isSelected = selectedDate && day.date.toDateString() === selectedDate.toDateString();
                const isToday = day.date.toDateString() === new Date().toDateString();

                return (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.dayButton} ${!day.isCurrentMonth ? styles.otherMonth : ''} ${isSelected ? styles.selected : ''} ${isToday ? styles.today : ''}`}
                    onClick={() => handleDateSelect(day.date)}
                  >
                    {day.date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
