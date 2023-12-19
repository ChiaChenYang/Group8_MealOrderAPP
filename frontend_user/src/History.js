import React, { useState, useEffect } from "react";
import Navbar from "./component/navbar-component";
import menupng from "./image/defaultImage.jpg";
import { useNavigate, useParams } from "react-router-dom";
import Notify from "./component/messenge-component";
import io from "socket.io-client";

function History() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [mes, setMes] = useState(null);

  useEffect(() => {
    const user_id = userId;

    const socket = io();

    socket.on(`${user_id} order state message`, (msg) => {
      console.log(msg);
      setMes(msg); // Update m with the received msg
    });
  }, [userId]);

  const [now_order, setOrder] = useState([]);
  const [error, setError] = useState(null);
console.log(error);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/orders/consumer/${userId}/get/current`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.text();
        console.log("Response Data:", responseData);

        const data = JSON.parse(responseData);

        const transformedData = Object.keys(data).reduce((acc, key) => {
          const intKey = parseInt(key, 10);
          const defaultImage = "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj";
  
          return {
            ...acc,
            [intKey]: {
              id: data[key].id,
              order_id: data[key].order_id,
              shop_name: data[key].shop_name,
              quantity: data[key].quantity,
              price: data[key].price,
              image: data[key].image || menupng,
              time: data[key].time, // Assuming the server provides 'time'
            },
          };
        }, {});
  
        setOrder(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };
  
    fetchData();
  }, [userId]);

  // let now_order = {
  //   1: {
  //     id: 1,
  //     shop_name: "麥當勞",
  //     quantity: 3,
  //     price: 300,
  //     image:
  //       "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj",
  //     time: "12:30", //預計可取餐時間
  //   },
  //   2: {
  //     id: 2,
  //     shop_name: "麥當勞2",
  //     quantity: 4,
  //     price: 350,
  //     image: "照片（店家照片）",
  //     time: "12:50", //預計可取餐時間
  //   },
  // };
  const handleClick = (id,order_id) => {
    navigate(`/${userId}/orderstate/${id}/${order_id}`);
  };

  if (mes && mes.receive_state && mes.receive_state === true){
    navigate(`/${userId}/evaluation/${mes.id}/${mes.order_id}`);
    return null;
  }


  return (
    <div>
      {<Notify/>}
      <div style={{ marginTop: "50px", marginLeft: "20px" }}>
        <h1 style={{ marginLeft: "5px", fontSize: "2rem" }}>
          <strong>進行中的訂單</strong>
        </h1>
        <p></p>
        <div style={{ paddingBottom: "60px" }}>
          {Object.keys(now_order).map((itemId) => {
            const item = now_order[itemId];
            return (
              <div
                key={itemId}
                className="mb-3"
                style={{
                  marginTop: "30px",
                  width: "95%",
                  display: "flex",
                  alignItems: "center",
                  borderRadius: "15px",
                  border: "2px solid #F0F0F0",
                }}
              >
                <div style={{ flex: "0 0 60%" }}>
                  <img
                    src={item.image || menupng}
                    alt={`${item.shop_name}`}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "15px 0px 0px 15px",
                    }}
                  />
                </div>
                <div
                  style={{
                    flex: "0 0 40%",
                    marginLeft: "10px",
                    borderRadius: "0px 15px 15px px",
                  }}
                >
                  <p>
                    <strong>{item.shop_name}</strong>
                  </p>
                  <p style={{ marginBottom: "0.5rem", marginTop: "-15px" }}>
                    $ {item.price} | {item.quantity}項餐點
                  </p>
                  <p style={{ fontSize: "small" }}>
                  <strong>預計取餐時間: </strong></p>
                  <p style={{fontSize: "small",marginTop:"-10px", marginBottom: "0.75rem"}}><strong>{item.time.split(':').slice(0, 2).join(':')}</strong>
                  </p>
                  <button
                    id="trace_order_btn"
                    onClick={() => handleClick(item.id,item.order_id)}
                    className="rounded"
                    style={{
                      width: "118px",
                      border: "none",
                      marginBottom: "2px",
                    }}
                  >
                    訂單狀況追蹤
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Navbar />
      </div>
    </div>
  );
}

export default History;
