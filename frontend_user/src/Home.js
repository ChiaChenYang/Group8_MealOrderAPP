import React, { useState, useEffect, /*useCallback*/ } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import EqualizerIcon from "@mui/icons-material/Equalizer";
// import HistoryIcon from "@mui/icons-material/History";
// import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Navbar from "./component/navbar-component";
import ImageUploader from "./component/imageLoader";
import Notify from "./component/messenge-component";
import io from "socket.io-client";

function Home() {
  const navigate = useNavigate();
  // const [data, setData] = useState([]);
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


  const [User, setUser] = useState({});
  const [error, setError] = useState(null);
  console.log(error);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIdInt = parseInt(userId, 10);
        const response = await fetch(`http://localhost:3000/consumers/${userIdInt}/info`);

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }


        const responseData = await response.text();
        console.log("Response Data:", responseData);

        const data = JSON.parse(responseData);

        // Check if data is an object
        if (typeof data === "object" && data !== null) {
          // Transform object into the desired format
          const transformedData = {
            id: data.id,
            name: data.name,
            division: data.division,
            position: data.position,
            image: data.image || "./image/home.png", // Assuming there's a default image
          }; 

          setUser(transformedData);
        } else {
          // Handle the case when data is not in the expected format
          throw new Error("Data is not in the expected format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [userId]);

  if (mes && mes.receive_state && mes.receive_state === true){
    navigate(`/${userId}/evaluation/${mes.id}/${mes.order_id}`);
    return null;
  }

  const handleImageChange = (newImage) => {
    const base64Image = newImage.toString('base64');
  
    setUser((prevUser) => ({ ...prevUser, image: base64Image }));
  
    fetch(`http://localhost:3000/consumers/info/modify`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: User.id,
        name: User.name,
        division: User.division,
        position: User.position,
        image: {
          type: "Buffer",
          data: base64Image,
        },
      }),
    })
      .then(async (response) => {
        const responseData = await response.text();
  
        if (!response.ok) {
          throw new Error(`Server returned status ${response.status}: ${responseData}`);
        }
  
        if (!responseData.trim()) {
          console.error("Empty response data");
          return;
        }
  
        try {
          const parsedData = JSON.parse(responseData);
          console.log("Image updated successfully", parsedData);
        } catch (parseError) {
          console.error("Error parsing response:", parseError);
        }
      })
      .catch((error) => console.error("Error updating image:", error));
  };


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
      {<Notify />}
      <div style={{ position: "absolute", top: "5%" }}>
        <div style={{marginTop:"20px"}}>
          <h2>
            <strong>個人資訊</strong>
          </h2>
          <ImageUploader className="col-md-12" userId={userId} onImageChange={handleImageChange}/>
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
                姓名： {User.name} {/*{User.value}*/}
              </div>
            )}
            {User && (
              <div
                className="col-md-6"
                key={User.id}
                style={{ marginBottom: "0.2rem" }}
              >
                單位： {User.division} {/*User.value*/}
              </div>
            )}
            {User && (
              <div
                className="col-md-8"
                key={User.id}
                style={{ marginBottom: "1rem" }}
              >
                職稱： {User.position} {/*User.value*/}
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
            <Link to={`/${userId}/fee`} style={a_style}>
              <EqualizerIcon style={{ marginBottom: 3.5 }} /> 月結餐費
            </Link>
            <Link to={`/${userId}/temp`} style={a_style}>
              <NotificationsIcon style={{ marginBottom: 3.5 }} /> 查看通知
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