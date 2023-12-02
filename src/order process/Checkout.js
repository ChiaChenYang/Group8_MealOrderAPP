import React, { useState, useEffect } from "react";
import BackButton from "../component/return";
import { useNavigate, useParams } from "react-router-dom";
import ColorToggleButton from "../component/toggle-component";
import TimePicker from "../component/timepicker";

function Checkout() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [selectedToggle, setSelectedToggle] = useState("");
  console.log(currentTime);
  console.log(selectedToggle);
  const { userId } = useParams();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${padZero(hours)}:${padZero(minutes)}`;

      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const padZero = (num) => (num < 10 ? `0${num}` : num);
  let checking = {
    id: 1, //訂單編號
    name: "麥當勞",
    evaluate: 5,
    prepare_time: "20-30 min",
    location: "台積總部及晶圓十二A廠",
    subsidy: 25, //餐補
    total: 1200,
    addition: "訂單的備註",
    meals: {
      1: {
        name: "牛肉麵",
        price: 100,
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s",
        quantity: 10,
        addition: "此餐點的備註",
      },
      2: {
        name: "牛肉麵",
        price: 100,
        image: "牛肉麵的照片",
        quantity: 2,
        addition: "此餐點的備註",
      },
    },
  };

  const meals = Object.values(checking.meals);

  const handleClick = (id) => {
    navigate(`/${userId}/orderstate/${id}`);
    //傳入DB
  };

  return (
    <div>
      <div
        style={{
          height: "70px",
          background: "#F4B63D",
          borderRadius: "0px 0px 30px 30px",
        }}
      >
        <BackButton style={{ color: "white" }} />
        <p style={{ padding: "10px 60px", fontSize: "30px", color: "white" }}>
          <strong>結帳</strong>
        </p>
      </div>
      <div>
        <p style={{ marginTop: "10px", marginLeft: "10px", fontSize: "20px" }}>
          <strong>{checking.name}</strong>
          <span style={{ fontSize: "15px", marginLeft: "150px" }}>
            {checking.location}
          </span></p>
          <p style={{ fontSize: "15px" }}>{checking.prepare_time}</p>
        <p style={{ fontSize: "20px", marginLeft: "10px" }}>
          <strong>用餐方式</strong>
        </p>
        <ColorToggleButton onAlignmentChange={setSelectedToggle} />
        <p style={{ fontSize: "20px", margin: "10px 10px" }}>
          <strong>預計前往取餐時間</strong>
          </p>
        <div
          style={{
            marginLeft: "10px",
            borderBottom: "2px solid gray",
            width: "350px",
          }}
        >
          <TimePicker />
        </div>
        {meals.map((meal, index) => (
        <div key={`${meal.name}-${index}`} style={{marginLeft: "10px" ,borderBottom: "2px solid gray"}}>
            <p>
              {meal.name}
              <img
                src={meal.image}
                alt={meal.name}
                style={{ marginLeft: "250px", width: "100px" }}
              />
              </p>
              <p>
                {meal.quantity}{" "}
                <span style={{ marginLeft: "250px" }}>
                  {meal.price * meal.quantity}
                </span>
              </p>
              <p>餐點備註：{meal.addition}</p>
          </div>
        ))}
        <p style={{ marginLeft: "10px", borderBottom: "2px solid gray" }}>
          訂單備註：{checking.addition}
        </p>
        <div style={{ marginLeft: "10px" }}>
          <p style={{ fontSize: "20px" }}>
            <strong>
              小計<span style={{ marginLeft: "250px" }}>{checking.total}</span>
            </strong>
          </p>
          <p style={{ fontSize: "20px" }}>
            <strong>
              餐補
              <span style={{ marginLeft: "250px" }}>{checking.subsidy}</span>
            </strong>
          </p>
          <p style={{ fontSize: "20px" }}>
            <strong>
              總計
              <span style={{ marginLeft: "250px" }}>
                {checking.total - checking.subsidy}
              </span>
            </strong>
          </p>
        </div>
        <button
          className="rounded"
          onClick={() => handleClick(checking.id)}
          style={{
            border: "none",
            width: "90%",
            marginLeft: "20px",
            backgroundColor: "#F4B63D",
          }}
        >
          <strong>送出</strong>
        </button>
      </div>
    </div>
  );
}

export default Checkout;
