import React from "react";

const Timeline = ({ orderState }) => {
  const timelineStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",
  };

  const lineStyle = {
    position: "absolute",
    height: "2px",
    background: "#35A996",
    top: "50%",
    left: "25%",
    width: "50%", // Adjust as needed
  };

  const pointStyle = {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
  };

  const currentTimeStyle = {
    ...pointStyle,
    background: "#35A996",
    border: "2px solid #35A996",
    left: "25%", // Adjust as needed
  };

  const orderTimeStyle = {
    ...pointStyle,
    background: orderState.process ? "#35A996" : "white",
    border: `2px solid ${orderState.process ? "#35A996" : "#35A996"}`,
    left: "75%", // Adjust as needed
  };

  const timeTextStyle = {
    position: "absolute",
    top: "-50%", // Adjust as needed
    fontWeight: "bold",
  };

  return (
    <div style={timelineStyle}>
      <div style={lineStyle}></div>
      <div style={currentTimeStyle}></div>
      <div style={{ ...timeTextStyle, left: "22%" }}>{getCurrentTime()}</div>
      <div
        style={{
          position: "absolute",
          top: "100%",
          fontWeight: "bold",
          left: "17%",
        }}
      >
        訂單已接收
      </div>
      <div style={orderTimeStyle}></div>
      <div style={{ ...timeTextStyle, left: "72%" }}>{orderState.time}</div>
      <div
        style={{
          position: "absolute",
          top: "100%",
          fontWeight: "bold",
          left: "67%",
        }}
      >
        可前往取餐
      </div>
    </div>
  );
};

// Helper function to get the current time in HH:mm format
const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default Timeline;
