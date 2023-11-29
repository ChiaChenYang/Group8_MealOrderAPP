import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const Counter = ({ initialValue, onCountChange }) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    setCount(count + 1);
    onCountChange(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
    onCountChange(count - 1);
  };

  useEffect(() => {
    onCountChange(count);
  }, [count, onCountChange]);

  return (
    <div>
      <button
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
