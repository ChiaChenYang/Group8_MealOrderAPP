import React from "react";
import imagei from "../image/imagei.jpg";

const CabinetDisplay = ({ cabinetInformation }) => {
  return (
    <div
      className="mb-3"
      style={{
        width: "100%",        // Set a fixed width to allow scrolling
        overflowX: "auto",     // Enable horizontal scrolling
        whiteSpace: "nowrap",  // Prevent items from wrapping to the next line
      }}
    >
      {Object.keys(cabinetInformation).map((key) => {
        const item = cabinetInformation[key];

        return (
          <div
            key={key}
            style={{
              display: "inline-block", // Keep items on the same line
              margin: "0 20px",         // Add margin between items
              width:"60%"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: "15px",
                border: "2px solid #F0F0F0",
                width: "100%",
              }}
            >
              <div style={{ flex: "0 0 40%" }}>
                <h5 style={{ marginLeft: "8px" }}>
                  <strong>{item.name}</strong>
                </h5>
                <div style={{ marginLeft: "5px" }}>{item.LatestNews}</div>
              </div>
              <div
                style={{
                  flex: "0 0 60%",
                  alignItems: "center",
                  borderTop: "2px solid #F0F0F0",
                }}
              >
                <img
                  src={imagei}
                  alt={item.name}
                  style={{
                    width: "100%",
                    borderRadius: "0px 15px 15px 0px",
                    objectFit: "cover",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CabinetDisplay;