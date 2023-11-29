import React from "react";
import Navbar from "./component/navbar-component";
import imagei from "./image/imagei.jpg";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();
  let now_order = {
    1: {
      id: 1,
      shop_name: "麥當勞",
      quantity: 3,
      price: 300,
      image:
        "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj",
      time: "12:30", //預計可取餐時間
    },
    2: {
      id: 2,
      shop_name: "麥當勞2",
      quantity: 4,
      price: 350,
      image: "照片（店家照片）",
      time: "12:50", //預計可取餐時間
    },
  };
  const handleClick = (id) => {
    navigate(`/orderstate/${id}`);
  };

  return (
    <div>
      <div style={{ marginTop: "50px", marginLeft: "20px" }}>
        <h1 style={{ marginLeft: "5px", fontSize: "2rem" }}>
          <strong>進行中的訂單</strong>
        </h1>
        <p></p>
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
                  src={imagei}
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
                <p style={{ marginTop: "5px" }}>
                  <strong>{item.shop_name}</strong>
                  <p style={{ marginBottom: "0.5rem" }}>
                    $ {item.price} | {item.quantity}項餐點
                  </p>
                  <p style={{ fontSize: "small", marginBottom: "0.75rem" }}>
                    <strong>預計取餐時間: {item.time}</strong>
                  </p>
                  <button
                    onClick={() => handleClick(item.id)}
                    className="rounded"
                    style={{
                      width: "118px",
                      border: "none",
                      marginBottom: "2px",
                    }}
                  >
                    訂單狀況追蹤
                  </button>
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Navbar />
      </div>
    </div>
  );
}

export default History;
