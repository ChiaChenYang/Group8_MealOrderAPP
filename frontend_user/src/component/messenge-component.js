import React, { useState,useEffect } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";

function Notify() {
  const { userId } = useParams();
  const [m, setM] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = userId;
  
    const socket = io('http://localhost:3000');
    socket.connect();
  
    socket.on(`${user_id} order state message`, (msg) => {
      console.log("the message is:", msg);
      console.log(`${user_id} receive message:`, msg);
      setM((prevM) => {
        console.log("m is:", prevM); // log previous state
        return msg; // Update m with the received msg
      });
    });
  }, [userId]);
  
  useEffect(() => {
    console.log("m is:", m);
  }, [m]);
  
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
          <p style={{ marginLeft: "20px", color: "white" }}>{m.message}</p>
        </strong>
      )}
    </div>
  );
}

export default Notify;