import React from "react";
import HalfRating from "../component/rating-component";

function Evaluate() {
  let evaluation_information = {
    name: "麥當勞",
    location: "台積總部及晶圓十二A廠",
    image:
      "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj",
  };
  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <img
          src={evaluation_information.image}
          alt="menu"
          style={{ width: "100%", height: "20%", objectFit: "cover" }}
        />

        <div
          style={{
            borderRight: "2px solid gray",
            borderLeft: "2px solid gray",
            borderTop: "2px solid gray",
            flex: 1,
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", top: "60px", left: "20px" }}>
            <div style={{ marginLeft: "80px" }}>
              <h1 style={{ marginLeft: "45px" }}>
                <strong>{evaluation_information.name}</strong>
              </h1>
              <p>{evaluation_information.location}</p>
            </div>
            <h1 style={{ marginTop: "80px", marginLeft: "115px" }}>
              <strong>您的評價</strong>
            </h1>
            <div style={{ marginLeft: "50px" }}>
              <HalfRating />
            </div>
            <input
              className="rounded"
              placeholder="備註"
              type="text"
              style={{
                marginLeft: "40px",
                width: "90%",
                height: "100px",
                fontSize: "16px",
                backgroundColor: "#D3D3D3",
              }}
            />
            <button
              className="rounded"
              style={{
                width: "90%",
                marginTop: "20px",
                marginLeft: "40px",
                backgroundColor: "#F4B63D",
              }}
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Evaluate;
