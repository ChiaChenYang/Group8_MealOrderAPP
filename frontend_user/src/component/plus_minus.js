import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Counter = ({ initialValue, onCountChange }) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    const updatedCount = count + 1;
    setCount(updatedCount);
    onCountChange(updatedCount);
  };

  const handleDecrement = () => {
    // Prevent decrementing below 0
    if (count > 0) {
      const updatedCount = count - 1;
      setCount(updatedCount);
      onCountChange(updatedCount);
    }
  };

  useEffect(() => {
    // Remove the direct call to onCountChange from here
    // onCountChange(count);
  }, [count]);

  return (
    <div>
      <button
        id="increase_btn"
        onClick={handleIncrement}
        style={{
          borderRadius: "10px",
          border: "2px solid #F4B63D",
          backgroundColor: "white",
        }}
      >
        <FaPlus style={{ color: "#F4B63D" }} />
      </button>
      <span style={{ margin: "0px 10px" }}>{count}</span>
      <button
        id="decrease_btn"
        onClick={handleDecrement}
        style={{
          borderRadius: "10px",
          border: "2px solid #F4B63D",
          backgroundColor: "white",
        }}
      >
        <FaMinus style={{ color: "#F4B63D" }} />
      </button>
    </div>
  );
};

export default Counter;
