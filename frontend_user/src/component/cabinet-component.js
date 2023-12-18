import React from "react";
import imagei from "../image/imagei.jpg";
import { Link, useParams } from "react-router-dom";
import defaultImage from '../image/defaultImage.jpg';

const CabinetDisplay = ({ cabinetInformation }) => {
  const { userId } = useParams();
  return (
    <div
      className="mb-3"
      style={{
        width: "100%",
        overflowX: "auto",
        whiteSpace: "nowrap",
      }}
    >
      {Object.keys(cabinetInformation).map((key) => {
        const item = cabinetInformation[key];

        return (
          <Link
                to={`/${userId}/restaurant/${cabinetInformation[key].id}`}
                key={key}
                className="mb-3"
                style={{ textDecoration: "none", color: "inherit" }}
              >
          <div
            key={key}
            style={{
              display: "inline-block",
              marginRight: "50px",      
              marginLeft: "20px",
              width:"90%"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                borderRadius: "15px",
                border: "2px solid #F0F0F0",
                width: "100%"
              }}
            >
              <div style={{ flex: "0 0 40%" }}>
                <h5 style={{ marginLeft: "8px" }}>
                  <strong>{item.name}</strong>
                </h5>
                <div style={{ marginLeft: "8px" }}>開始預購囉！</div>
              </div>
              <div
                style={{
                  flex: "0 0 60%",
                  alignItems: "center",
                  borderTop: "2px solid #F0F0F0",
                }}
              >
                <img
                  src={item.image || defaultImage}
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
          </Link>
        );
      })}
    </div>
  );
};

export default CabinetDisplay;