import React, { useState,useEffect } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

function Notify() {
  const { userId } = useParams();
  const [m, setM] = useState(null);

  useEffect(() => {
    const user_id = 2;
  
    const socket = io();
  
    socket.on(`${user_id} order state message`, (msg) => {
      console.log(msg);
      setM(msg); // Update m with the received msg
    });
  }, [userId]);

  // let m = {
  //   restaurant: "麥當勞",
  //   messenge: "您好，已於 12:05 接收到您的訂單！",
  //   receive_state: false,
  //   estimated_time: "12:20",
  // };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: m && !m.receive_state ? "100px" : "0",
        overflow: "hidden",
        background: "#35A996",
        borderRadius: "0px 0px 30px 30px",
        transition: "height 0.3s ease-in-out",
        opacity: m && !m.receive_state ? 1 : 0,
      }}
    >
      {m && !m.receive_state && (
        <strong>
          <p style={{ paddingTop: "10px", marginLeft: "20px", color: "white" }}>
            {m.restaurant}
          </p>
          <p style={{ marginLeft: "20px", color: "white" }}>{m.messenge}</p>
        </strong>
      )}
    </div>
  );
}

export default Notify;