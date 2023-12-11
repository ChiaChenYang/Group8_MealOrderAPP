import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import HistoryIcon from "@mui/icons-material/History";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Navbar from "./component/navbar-component";
import ImageUploader from "./component/imageLoader";

function Home() {
  const [data, setData] = useState([]);
  const { userId } = useParams();
 
  const fetchUser = useCallback(async () => {
    try {
      const result = await fetch(`http://localhost:8081/user/${userId}`).then(
        (res) => res.json()
      );
      setData(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [userId]);
  
  useEffect(() => {
    const fetchData = async () => {
      await fetchUser();
    };

    fetchData(); // Call fetchUser directly

  }, [fetchUser, userId]);

  // Access the user directly from the data array
  const User = Array.isArray(data) && data.length > 0 ? data[0] : null;

  let a_style = {
    background: "rgb(240, 240, 240)",
    fontSize: "1em",
    padding:"1em",
    marginTop: "0.5em",
    marginBottom:"0.5em",
    color: "black",
    textDecoration: "none",
    flexGrow: 1,
    width:"100%"
  };

  return (
    <div className="d-flex justify-content-center">
      <div style={{ position: "absolute", top: "5%" }}>
        <div style={{marginTop:"20px"}}>
          <h2>
            <strong>個人資訊</strong>
          </h2>
          <ImageUploader className="col-md-12" />
          <div
            className="col-md-12"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {User && (
              <div
                className="col-md-6"
                key={User.id}
                style={{ marginBottom: "0.2rem" }}
              >
                姓名： {User.name} {User.value}
              </div>
            )}
            {User && (
              <div
                className="col-md-6"
                key={User.id}
                style={{ marginBottom: "0.2rem" }}
              >
                單位： {User.division} {User.value}
              </div>
            )}
            {User && (
              <div
                className="col-md-8"
                key={User.id}
                style={{ marginBottom: "1rem" }}
              >
                職稱： {User.position} {User.value}
              </div>
            )}
          </div>
          <div
            className="button-area"
            style={{
              margin: "5px auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              flexWrap: "nowrap",
              maxWidth: "320px",
            }}
          >
            <Link to={`/${userId}/Favorite`} style={a_style}>
              <FavoriteIcon style={{ marginBottom: 3.5 }} /> 最愛商家
            </Link>
            <Link to={`/${userId}/fee`} style={a_style}>
              <EqualizerIcon style={{ marginBottom: 3.5 }} /> 月結餐費
            </Link>
            <Link to={`/${userId}/order-history`} style={a_style}>
              <HistoryIcon style={{ marginBottom: 3.5 }} /> 歷史訂單
            </Link>
            <Link to={`/${userId}/settings`} style={a_style}>
              <SettingsIcon style={{ marginBottom: 3.5 }} /> 飲食偏好設定
            </Link>
            <Link to={`/${userId}/notifications`} style={a_style}>
              <NotificationsIcon style={{ marginBottom: 3.5 }} />{" "}
              健保食品服用提醒設定
            </Link>
          </div>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Navbar />
      </div>
    </div>
  );
}
export default Home;