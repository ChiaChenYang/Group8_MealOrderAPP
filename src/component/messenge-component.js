import React from "react";

function Notify() {
  let m = {
    restaurant: "麥當勞",
    messenge: "您好，已於 12:05 接收到您的訂單！",
    receive_state: false,
    estimated_time: "12:20",
  };

  return (
    <div
      style={{
        height: "100px",
        background: "#35A996",
        borderRadius: "0px 0px 30px 30px",
      }}
    >
      <strong>
        <p style={{ paddingTop: "10px", marginLeft: "20px", color: "white" }}>
          {m.restaurant}
        </p>
        <p style={{ marginLeft: "20px", color: "white" }}>{m.messenge}</p>
      </strong>
    </div>
  );
}

export default Notify;
