import React, { useState, useEffect } from "react";

const TimePicker = ({ onChange }) => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed
  const [selectedHour, setSelectedHour] = useState(null);
  const [selectedMinute, setSelectedMinute] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null); // Default to the current month
  const [selectedDate, setSelectedDate] = useState(null); // Default to the current date
  
  const availableHours = Array.from(
    { length: 21 - currentHour },
    (_, index) => currentHour + index
  );

  const availableMinutes =
    selectedHour === currentHour
      ? [0, 10, 20, 30, 40, 50].filter(
          (minute) => minute > currentMinute + 20
        )
      : [0, 10, 20, 30, 40, 50];

      useEffect(() => {
        onChange(selectedMonth, selectedDate, availableHours[0], availableMinutes[0]);
      }, [selectedMonth, selectedDate, availableHours[0], availableMinutes[0]]);

  // Define the valid range of months (current month to current month + 1)
  const validMonths = Array.from({ length: 1 }, (_, index) => currentMonth + index);

  // Define the valid range of dates (current date to current date + 7 days)
  const validDates = Array.from({ length: 7 }, (_, index) => currentDay + index);

  // Dynamically calculate available hours based on the selected date
  const availableHoursForSelectedDate = () => {
    if (selectedDate === currentDay) {
      return availableHours;
    } else {
      return Array.from({ length: 10 }, (_, index) => 11 + index);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Month selection */}
      <div style={{ marginRight: "10px" }}>
        <label htmlFor="month"></label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          style={{
            width: "65px",
            marginLeft: "60px",
            border: "2px solid gray",
          }}
        >
          {validMonths.map((month) => (
            <option key={month} value={month}>
              {month}月
            </option>
          ))}
        </select>
      </div>

      {/* Date selection */}
      <div style={{ marginRight: "10px" }}>
        <label htmlFor="date"></label>
        <select
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(parseInt(e.target.value))}
          style={{
            width: "65px",
            marginLeft: "10px",
            border: "2px solid gray",
          }}
        >
          {validDates.map((date) => (
            <option key={date} value={date}>
              {date}日
            </option>
          ))}
        </select>
      </div>

      {/* Hour selection */}
      <div style={{ marginRight: "10px" }}>
        <label htmlFor="hour"></label>
        <select
          id="hour"
          value={selectedHour}
          onChange={(e) => setSelectedHour(parseInt(e.target.value))}
          style={{
            width: "65px",
            marginLeft: "10px",
            border: "2px solid gray",
          }}
        >

          {availableHoursForSelectedDate().map((hour) => (
            <option key={hour} value={hour}>
              {hour}時
            </option>
          ))}
        </select>
      </div>

      {/* Minute selection */}
      <div>
        <label htmlFor="minute"></label>
        <select
          id="minute"
          value={selectedMinute}
          onChange={(e) => setSelectedMinute(parseInt(e.target.value))}
          style={{
            width: "65px",
            marginLeft: "10px",
            border: "2px solid gray",
          }}
        >
          {availableMinutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}分
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
