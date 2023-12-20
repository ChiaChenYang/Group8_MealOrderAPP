import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import menupng from "../image/defaultImage.jpg";
import BackButton from "../component/return";
import StarIcon from "@mui/icons-material/Star";
import NotificationsIcon from "@mui/icons-material/Notifications";
import BasicTabs from "../component/tab-component";

function Restaurant() {
  const { id } = useParams();
  const [menu, setMenuDetails] = useState({});
  const [error, setError] = useState(null);
  console.log(error);

  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/menus/allmenudetailsforconsumer/${id}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let responseData = await response.json();
        console.log("Response Data:", responseData.data);

        setMenuDetails(responseData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchMenuDetails();
  }, [id]);

  // let menu = {
  //   restaurantName: "麥當勞",
  //   evaluate: 5,
  //   comment: 200,
  //   prepare_time: "20-30 min",
  //   location: "台積總部及晶圓十二A廠",
  //   time: "全日",
  //   news: "新品辣椒醬歡迎試吃 ~ !",
  //   menu_lunch: {
  //     type:["主餐","飲料"],
  //     dish: {
  //       1: {
  //         id:1,
  //         name: "牛肉麵",
  //         price: 100,
  //         Calorie: 500,
  //         tag: ["牛肉", "湯麵"],
  //         description: "半筋半肉，保證一次成主顧",
  //         image: "",
  //       },
  //       2: {
  //         1: {
  //           id:2,
  //           name: "薑汁檸檬茶",
  //           price: 60,
  //           Calorie: 100,
  //           tag: ["護肝飲食"],
  //           description: "薑可以活血化瘀，助於護肝",
  //           image: "",
  //         },
  //       },
  //     },
  //   },
  //   menu_dinner: {},
  //   menu_allday: {
  //     dish: {
  //       1: {
  //         id:1,
  //         name: "牛肉麵",
  //         price: 100,
  //         Calorie: 500,
  //         tag: ["牛肉", "湯麵"],
  //         description: "半筋半肉，保證一次成主顧",
  //         image: "",
  //       },
  //       2: {
  //         1: {
  //           id:2,
  //           name: "薑汁檸檬茶",
  //           price: 60,
  //           Calorie: 100,
  //           tag: ["護肝飲食"],
  //           description: "薑可以活血化瘀，助於護肝",
  //           image: "",
  //         },
  //       },
  //     },
  //   },
  // };

  return (
    <div>
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <img
          src={menu.image || menupng}
          alt="menu"
          style={{ width: "100%", height: "20%", objectFit: "cover" }}
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
          <BackButton style={{ position: "absolute", top: 0, right: 0 }} />
          <p></p>
          <p></p>
          <p></p>
          <p></p>
          <div style={{ position: "absolute", top: "60px", left: "20px" }}>
            <h1>
              <strong>{menu.restaurantName}</strong>
            </h1>
            <div>
              <StarIcon style={{ fontSize: "20px", color: "#F4B63D" }} />{" "}
              {menu.evaluate} ({menu.comment}+)
              <span style={{ marginLeft: "70px" }}>{menu.location}</span>
            </div>
            {menu && menu.prepare_time && (
              <p>
                {menu.prepare_time}~{menu.prepare_time + 10} min
              </p>
            )}
            <div>
              <NotificationsIcon
                style={{ fontSize: "20px", color: "#F4B63D" }}
              />
              <strong> 最新消息</strong>
              <p style={{ marginLeft: "25px" }}>{menu.news}</p>
            </div>
            <div style={{ marginLeft: "-20px", width: "100%" }}>
              <BasicTabs />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurant;
