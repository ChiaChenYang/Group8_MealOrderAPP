import React, { useState, useEffect } from "react";
import BackButton from "../component/return-order";
import { useNavigate, useParams } from "react-router-dom";
import ColorToggleButton from "../component/toggle-component";
import TimePicker from "../component/timepicker";
import TimePicker2 from "../component/timepicker-cabinet";
import defaultImage from "../image/defaultMenu.png";

function Checkout() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState("");
  const [selectedToggle, setSelectedToggle] = useState("");
  console.log(currentTime);
  const { userId } = useParams();
  const { id } = useParams();
  const [checking, setChecking] = useState({});
  const [error, setError] = useState(null);
  console.log(error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/shopping/cart/to/checkout/user/${userId}/shop/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData);

        setChecking(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [userId, id]);

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

  // let checking = {
  //   order_id: 1, //訂單編號
  //   type:false, //true是固定櫃 false是流動櫃
  //   name: "麥當勞",
  //   evaluate: 5,
  //   prepare_time: 20,
  //   location: "台積總部及晶圓十二A廠",
  //   subsidy: 25, //餐補
  //   total: 1200,
  //   addition: "訂單的備註",
  //   meals: {
  //     1: {
  //       name: "牛肉麵",
  //       price: 100,
  //       image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s",
  //       quantity: 10,
  //       addition: "此餐點的備註",
  //     },
  //     2: {
  //       name: "牛肉麵",
  //       price: 100,
  //       image: "牛肉麵的照片",
  //       quantity: 2,
  //       addition: "此餐點的備註",
  //     },
  //   },
  // };

  // const checkingWithArrayMeals = {
  //   ...checking,
  //   meals: Object.values(checking.meals || {}),
  // };
  const now = new Date();
  const months = now.getMonth();
  const dates = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const [reservationData, setReservationData] = useState({
    user_id: userId,
    shop_id: id,
    pick_up_meals: "內用",
    estimate_time_month: months,
    estimate_time_date: dates,
    estimate_time_hour: hours,
    estimate_time_minute: minutes,
  });

  const handleToggleChange = (alignment) => {
    // Update selectedToggle state
    setSelectedToggle(alignment);

    // Update reservationData with the selected alignment
    setReservationData((prevData) => ({
      ...prevData,
      pick_up_meals: alignment,
    }));
  };

  const handleTimePickerChange = (month, date, hour, minute) => {
    console.log("Selected Time:", `${month}/${date} ${hour}:${minute}`);

    // Update reservationData with the selected values
    setReservationData((prevData) => ({
      ...prevData,
      estimate_time_month: month,
      estimate_time_date: date,
      estimate_time_hour: hour,
      estimate_time_minute: minute,
    }));
  };

  const handleClick = async (id) => {
    try {
      console.log(reservationData);
      const response = await fetch(
        "http://localhost:3000/shopping/set/reservation/time/and/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data posted successfully:", responseData);
        navigate(`/${userId}/orderstate/${id}/${responseData.order_id}`);
      } else {
        console.error(`Error: ${response.status}, ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const start = parseInt(checking.prepare_time, 10);
  const end = start + 10;

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
          </span>
        </p>
        <p style={{ fontSize: "15px", marginLeft: "10px" }}>
          {start}~{end} min
        </p>
        <p style={{ fontSize: "20px", marginLeft: "10px" }}>
          <strong>用餐方式</strong>
        </p>
        <ColorToggleButton onAlignmentChange={handleToggleChange} />
        <p style={{ fontSize: "20px", margin: "10px 10px" }}>
          <strong>預計前往取餐時間</strong>
        </p>
        <div
          style={{
            marginLeft: "-23px",
            borderBottom: "2px solid gray",
            paddingBottom: "10px",
            width: "450px",
          }}
        >
          {checking.type ? (
            <TimePicker onChange={handleTimePickerChange} />
          ) : (
            <TimePicker2 onChange={handleTimePickerChange} />
          )}
        </div>
        {checking &&
          checking.meals &&
          Object.values(checking.meals).map((meal, index) => (
            <div
              key={`${meal.name}-${index}`}
              style={{ marginLeft: "10px", borderBottom: "2px solid gray" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>{meal.name}</span>
                <img
                  src={meal.image || defaultImage}
                  alt={meal.name}
                  style={{ marginLeft: "200px", width: "100px" }}
                />
              </div>
              <p>
                數量：{meal.quantity}{" "}
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
              總計
              <span style={{ marginLeft: "250px" }}>{checking.total}</span>
            </strong>
          </p>
        </div>
        <button
          id="push_btn"
          className="rounded"
          onClick={() => handleClick(id)}
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
