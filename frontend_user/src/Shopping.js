import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./component/navbar-component";
import menupng from "./image/defaultImage.jpg";
import Notify from "./component/messenge-component";
import io from "socket.io-client";

function Shopping() {
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

  const [shopping_cart, setCart] = useState([]);
  const [error, setError] = useState(null);
  console.log(error);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/shopping/${userId}/get/carts`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.text();
        console.log("Response Data:", responseData);

        const data = JSON.parse(responseData);

        // Transform the data into the desired format
        const transformedData = Object.keys(data).reduce((acc, key) => {
          const intKey = parseInt(key, 10);
          const defaultImage =
            "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj";

          return {
            ...acc,
            [intKey]: {
              shop_id: data[key].shop_id,
              shop_name: data[key].shop_name,
              quantity: data[key].quantity,
              price: data[key].price,
              image: data[key].image || defaultImage,
            },
          };
        }, {});

        setCart(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [userId]);

  // let shopping_cart = {
  //   1: {
  //     shop_id: 1,
  //     shop_name: "麥當勞",
  //     quantity: 3,
  //     price: 300,
  //     image:
  //       "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj",
  //   },
  //   2: {
  //     shop_id: 2,
  //     shop_name: "麥當勞2",
  //     quantity: 4,
  //     price: 350,
  //     image: "照片（店家照片）",
  //   },
  // };

  const handleViewCartClick = (shopId) => {
    navigate(`/${userId}/restaurant/${shopId}/shop`);
    console.log(shopId);
  };

  const handleViewShopClick = (shopId) => {
    navigate(`/${userId}/restaurant/${shopId}`);
  };

  if (mes && mes.receive_state && mes.receive_state === true){
    navigate(`/${userId}/evaluation/${mes.id}/${mes.order_id}`);
    return null;
  }


  return (
    <div>
      <Notify/>
      <div style={{ marginTop: "50px", marginLeft: "20px" }}>
        <h1 style={{ marginLeft: "5px", fontSize: "2rem" }}>
          <strong>購物車</strong>
        </h1>
        <p></p>
        <div style={{ paddingBottom: "30px" }}>
          {Object.keys(shopping_cart).map((itemId) => {
            const item = shopping_cart[itemId];
            return (
              <div
                key={itemId}
                className="mb-3"
                style={{
                  marginTop: "30px",
                  marginLeft: "2.5px",
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
                      width: "100%",
                      height: "138.2px",
                      borderRadius: "15px 0px 0px 15px",
                    }}
                  />
                </div>
                <div
                  style={{
                    flex: "0 0 40%",
                    marginLeft: "13px",
                    borderRadius: "0px 15px 15px px",
                  }}
                >
                  <p style={{ marginTop: "10px" }}>
                    <strong>{item.shop_name}</strong>
                  </p>
                  <p style={{ marginTop: "-15px" }}>
                    $ {item.price} | {item.quantity}項餐點
                  </p>
                  <button
                    id="shoppingcart_btn"
                    className="rounded"
                    style={{
                      width: "115px",
                      border: "none",
                      backgroundColor: "#F4B63D",
                      marginBottom: "6px",
                    }}
                    onClick={() => handleViewCartClick(item.shop_id)}
                  >
                    檢視購物車
                  </button>
                  <button
                    id="shop_btn"
                    className="rounded"
                    style={{
                      width: "115px",
                      border: "none",
                      marginBottom: "2px",
                    }}
                    onClick={() => handleViewShopClick(item.shop_id)}
                  >
                    檢視商店
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

export default Shopping;
