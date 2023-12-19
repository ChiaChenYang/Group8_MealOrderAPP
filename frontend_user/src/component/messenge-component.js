import React, { useState,useEffect } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../component/return";

function Notify() {
  const { userId } = useParams();
  const [m, setM] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = userId;
  
    const socket = io();
  
    socket.on(`${user_id} order state message`, (msg) => {
      console.log(msg);
      setM(msg); // Update m with the received msg
    });
  }, [userId]);

  // let m = {
  //   id:1,
  //   order_id:1,
  //   restaurant: "元記古早味",
  //   messenge: "訂單已完成",
  //   receive_state: false,
  //   estimated_time: "12:20",
  // };
  const handleClick = () => {
    if (m && !m.receive_state) {
      navigate(`/${userId}/orderstate/${m.id}/${m.order_id}`);
    }
  };
  
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
      onClick={handleClick}
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