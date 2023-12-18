import React, { useState, useEffect } from "react";
import BackButton from "../component/return";
import Timeline from "../component/timeline-component";
import imagepng from "../image/order_state.png";
import { useParams, useNavigate } from "react-router-dom";
import defaultImage from "../image/defaultMenu.png";

function OrderState() {
  const { userId, id, order_id } = useParams();
  const navigate = useNavigate();

  const [order_state, setOrder] = useState({});
  const [error, setError] = useState(null);
  console.log(error);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/orders/${order_id}/orderstate`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const responseData = await response.json();
        console.log("Response Data:", responseData);

        setOrder(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [order_id]);

  // let order_state = {
  //   id: 1,
  //   name: "麥當勞",
  //   location: "台積總部及晶圓十二A廠",
  //   time: "12:30",
  //   accept: true,
  //   process: false,
  //   meals: {
  //     1: {
  //       name: "牛肉麵",
  //       image:
  //         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s",
  //       quantity: 10,
  //       addition: "備註的事項",
  //     },
  //   },
  //   addition: "備註的事項",
  // };

  if (order_state.process) {
    navigate(`/${userId}/evaluation/${id}/${order_id}`);
    return null;
  }

  // reject 結束

  return (
    <div>
      <div
        style={{
          height: "70px",
          background: "#35A996",
          borderRadius: "0px 0px 30px 30px",
        }}
      >
        <BackButton style={{ color: "white" }} />
        <p
          style={{
            color: "white",
            fontSize: "1.8rem",
            paddingTop: "10px",
            marginLeft: "60px",
          }}
        >
          訂單狀況
        </p>
      </div>
      <div style={{ marginTop: "20px", marginBottom: "40px" }}>
        <div
          style={{ marginTop: "10px", marginLeft: "20px", fontSize: "20px" }}
        >
          <strong>{order_state.name}</strong>
          <span style={{ fontSize: "15px", marginLeft: "140px" }}>
            {order_state.location}
          </span>
          <p style={{ fontSize: "15px" }}>{order_state.time.split(':').slice(0, 2).join(':')}</p>
        </div>
      </div>
      {Object.keys(order_state).length > 0 && (
        <Timeline orderState={order_state} />
      )}
      <img src={imagepng} alt="圖片" style={{ width: "100%" }} />
      <h2 style={{ marginLeft: "10px" }}>
        <strong>餐點資訊</strong>
      </h2>
      {order_state.Meals &&
        Object.keys(order_state.Meals).map((mealId) => {
          const meal = order_state.Meals[mealId];
          return (
            <div
              key={mealId}
              style={{
                display: "flex",
                marginLeft: "20px",
                borderBottom: "2px solid gray",
              }}
            >
              <div style={{ flex: "1" }}>
                <p>
                  <strong>{meal.name}</strong>
                </p>
                <p style={{ marginTop: "-15px" }}>{meal.quantity}</p>
                <p style={{ marginTop: "-15px", backgroundColor: "#f4f4f4" }}>
                  備註： {meal.addition}
                </p>
              </div>
              <div style={{ flex: "0 0 40%" }}>
                <img
                  src={meal.image || defaultImage}
                  alt={`${meal.name}`}
                  style={{ marginLeft: "40px",marginTop:"-20px", width: "60%", height: "auto" }}
                />
              </div>
            </div>
          );
        })}

      <h2 style={{ margin: "10px" }}>
        <strong>訂單備註</strong>
      </h2>
      <p style={{ marginLeft: "10px", backgroundColor: "#f4f4f4" }}>
        {order_state.addition}
      </p>
    </div>
  );
}

export default OrderState;
