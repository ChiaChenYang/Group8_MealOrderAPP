// let cabinet_time = {
//   end_time: {
//     month: 12,
//     date: 30,
//   },
//   prepare_time: 10, // Example: prepare_time is set to 10 minutes
// };

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TimePicker = ({ onChange }) => {
  const [cabinet_time, setCabinetTime] = useState({});
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Initialize validDates and validMonths with default values
  const [validDates, setValidDates] = useState([]);
  const [validMonths, setValidMonths] = useState([]);
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentDay = new Date().getDate();
  const currentMonth = new Date().getMonth() + 1; // Months are zero-indexed
  const [selectedHour, setSelectedHour] = useState(currentHour);
  const [selectedMinute, setSelectedMinute] = useState(currentMinute);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth); // Default to the current month
  const [selectedDate, setSelectedDate] = useState(currentDay); // Default to the current date


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/restaurants/${id}/time`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const transformedData = await response.json();
        console.log('Response Data:', transformedData);

        setCabinetTime(transformedData);

        // Update validDates and validMonths with fetched data
        if (transformedData.end_time) {
          setValidDates(
            Array.from(
              { length: transformedData.end_time.date - new Date().getDate() + 1 },
              (_, index) => new Date().getDate() + index
            )
          );

          setValidMonths(
            Array.from(
              { length: Math.min(transformedData.end_time.month - new Date().getMonth(), 12) },
              (_, index) => new Date().getMonth() + 1 + index
            )
          );
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [id]);
  
  useEffect(() => {
    onChange(selectedMonth, selectedDate, selectedHour, selectedMinute);
  }, [selectedMonth, selectedDate, selectedHour, selectedMinute]);

  const availableHours = Array.from(
    { length: 21 - currentHour },
    (_, index) => currentHour + index
  );
  console.log(availableHours);

  // Dynamically calculate available hours based on the selected date
  const availableHoursForSelectedDate = () => {
    if (
      cabinet_time.end_time &&
      selectedDate === currentDay &&
      selectedMonth === currentMonth
    ) {
      if (currentHour > 11) {
        return Array.from(
          { length: 20 - currentHour + 1 },
          (_, index) => currentHour + index
        );
      } else {
        return Array.from({ length: 10 }, (_, index) => 11 + index);
      }
    } else {
      return Array.from({ length: 10 }, (_, index) => 11 + index);
    }
  };
  
  // Dynamically calculate available minutes based on the selected hour
  const availableMinutes = (hour) => {
    if (
      selectedDate === currentDay &&
      selectedMonth === currentMonth &&
      hour === currentHour
    ) {
      return [0, 10, 20, 30, 40, 50].filter(
        (minute) => minute >= currentMinute + cabinet_time.prepare_time
      );
    } else {
      return [0, 10, 20, 30, 40, 50];
    }
  };

  useEffect(() => {
    onChange(selectedMonth, selectedDate, selectedHour, selectedMinute);
  }, [selectedMonth, selectedDate, selectedHour, selectedMinute
]);

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
        {availableMinutes(selectedHour).map((minute) => (
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
