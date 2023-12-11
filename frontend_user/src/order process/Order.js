import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import menupng from "../image/menu.png";
import BackButton from "../component/return";
import QuantityInputWithButton from "../component/plus_minus-component";

function Order() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);
  const { userId, index } = useParams();

  console.log(index);
  let item = {
    shop_id: 1,
    name: "牛肉麵",
    price: 100,
    Calorie: 500,
    tag: ["牛肉", "湯麵"],
    description: "半筋半肉，保證一次成主顧",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s",
  };

  const handleClick = (shopId) => {
    console.log("Quantity:", quantity);
    navigate(`/${userId}/restaurant/${shopId}/shop`);
    //傳入DB
  };

  useEffect(() => {
    console.log("Quantity updated:", quantity);
  }, [quantity]);

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <img
          src={menupng}
          alt="menu"
          style={{ width: "100%", height: "150px", objectFit: "cover" }}
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
          <BackButton />
          <div style={{ paddingLeft: "20px", paddingTop: "70px" }}>
            <div>
              <div style={{ display: "inline" }}>
                <span style={{ fontSize: "30px" }}>
                  <strong>{item.name}</strong>
                </span>
                <span style={{ marginLeft: "90px" }}> </span>
                {item.tag.map((tag, index) => (
                  <div
                    key={index}
                    style={{
                      display: "inline-block",
                      margin: "2px",
                      padding: "5px",
                      borderRadius: "50%",
                      backgroundColor: "#D3D3D3",
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
              <span
                style={{
                  display: "inline-block",
                  margin: "2px",
                  padding: "5px",
                  borderRadius: "50%",
                  backgroundColor: "#D3D3D3",
                }}
              >
                {item.Calorie} 大卡
              </span>
            </div>
            <p>$ {item.price}</p>
            <p>{item.description}</p>
          </div>
          <p style={{ paddingLeft: "20px" }}>
            <strong>新增備註</strong>
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              className="rounded"
              placeholder="備註"
              type="text"
              style={{
                width: "90%",
                height: "100px",
                fontSize: "16px",
                backgroundColor: "#D3D3D3",
              }}
            />
          </div>
          <p></p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QuantityInputWithButton onQuantityChange={setQuantity} />
            <button
              id="add_cart_btn"
              className="rounded"
              onClick={() => handleClick(item.shop_id)}
              style={{
                width: "120px",
                marginLeft: "8px",
                border: "none",
                backgroundColor: "#F4B63D",
              }}
            >
              <strong>加入購物車</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
