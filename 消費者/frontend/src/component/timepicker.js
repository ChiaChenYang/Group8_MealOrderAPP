import React, { useState, useEffect } from "react";

const TimePicker = () => {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const [selectedHour, setSelectedHour] = useState(currentHour);
  const [selectedMinute, setSelectedMinute] = useState(0);

  useEffect(() => {
    console.log(`Selected time: ${selectedHour}:${selectedMinute}`);
  }, [selectedHour, selectedMinute]);

  const availableHours = Array.from(
    { length: 21 - currentHour },
    (_, index) => currentHour + index
  );

  let availableMinutes;
    
  if (selectedHour === 20){
    availableMinutes = [0, 10, 20, 30];
  }else{
    availableMinutes =
    selectedHour === currentHour
      ? [0, 10, 20, 30, 40, 50].filter((minute) => minute > currentMinute + 10)
      : [0, 10, 20, 30, 40, 50];
  }

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div style={{ marginRight: "10px" }}>
        <label htmlFor="hour"></label>
        <select
          id="hour"
          value={selectedHour}
          onChange={(e) => setSelectedHour(parseInt(e.target.value))}
          style={{
            width: "100px",
            marginLeft: "60px",
            border: "2px solid gray",
          }}
        >
          {availableHours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="minute"></label>
        <select
          id="minute"
          value={selectedMinute}
          onChange={(e) => setSelectedMinute(parseInt(e.target.value))}
          style={{
            width: "100px",
            marginLeft: "10px",
            border: "2px solid gray",
          }}
        >
          {availableMinutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TimePicker;
