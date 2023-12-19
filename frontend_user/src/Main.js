import React, { useState, useEffect } from "react";
import ControllableStates from "./component/location";
import image from "./image/main.png";
import Navbar from "./component/navbar-component";
import StarIcon from "@mui/icons-material/Star";
import { Link, useParams, useNavigate } from "react-router-dom";
// import imagei from "./image/imagei.jpg";
import Selector from "./component/class";
import Search from "./component/search";
import CabinetDisplay from "./component/cabinet-component";
import Notify from "./component/messenge-component";
import io from "socket.io-client";

function Main() {
  const [selectedClass, setSelectedClass] = useState("全類別");
  const [selectedLocation, setSelectedLocation] = useState("晶圓二廠");
  const [searchResults, setSearchResults] = useState([]);
  const { userId } = useParams();
  const [load, setLoad] = useState(false);
  const [restaurant_information, setRestaurants] = useState({});
  const [error, setError] = useState(null);
  console.log(error);
  const [mes, setMes] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user_id = userId;

    const socket = io();

    socket.on(`${user_id} order state message`, (msg) => {
      console.log(msg);
      setMes(msg); // Update m with the received msg
    });
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/restaurants/all?location=${selectedLocation}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.text();
        console.log("Response Data:", responseData);

        const data = JSON.parse(responseData);

        // Check if data is an object
        if (typeof data === "object" && data !== null) {
          // Transform object into the desired format
          const transformedData = Object.keys(data).reduce((acc, key) => {
            const intKey = parseInt(key, 10); 
            const defaultValue = {
              name: "麥當勞",
              // image: "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj",
              prepare_time: 20,
              evaluate: 5,
              service: "內用|外帶",
            };
            return {
              ...acc,
              [intKey]: {
                id: data[key].id,
                name: data[key].name || defaultValue.name,
                image: data[key].image,
                prepare_time: data[key].prepare_time || defaultValue.prepare_time,
                evaluate: data[key].evaluate || defaultValue.evaluate,
                service: data[key].service || defaultValue.service,
              },
            };
          }, {});

          // Assuming you want to keep the object structure with integer keys
          setRestaurants(transformedData);
          setLoad(true);
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
  }, [selectedLocation]);

  console.log("data:", restaurant_information);
  const [cabinet_information, setCabinet] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/restaurants/news?location=${selectedLocation}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.text();
        console.log('Response Data:', responseData);

        const data = JSON.parse(responseData);
        setCabinet(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };

    fetchData();
  }, [selectedLocation]);

  const handleClassChange = (selectedValue) => {
    setSelectedClass(selectedValue);
  };

  const handleLocationChange = (selectedValue) => {
    setSelectedLocation(selectedValue);
  };

  if (mes && mes.receive_state && mes.receive_state === true){
    navigate(`/${userId}/evaluation/${mes.id}/${mes.order_id}`);
    return null;
  }

  return (
    <div
      className="d-flex justify-content-center vh-100"
      style={{ backgroundColor: "#FFFEFD" }}
    >
       {<Notify />}
      <div>
        <div className="mb-3 p-3">
          <ControllableStates onValueChange={handleLocationChange} />
          {console.log(selectedLocation)}
        </div>
        <div className="mb-3 p-3">
          <h2 style={{ marginLeft: "5px" }}>
            <strong>想要吃什麼？</strong>
            <img
              src={image}
              alt="main"
              style={{
                width: "50%",
                position: "relative",
                left: "30px",
                bottom: "30px",
              }}
            />
          </h2>
          <div>
            <div
              style={{
                width: "100%",
                overflowX: "auto",
                margin: "0 auto",
                position: "absolute",
                top: "165px",
                right: "0px",
              }}
            >
              <CabinetDisplay cabinetInformation={cabinet_information} />
            </div>
          </div>
          <p style={{ marginTop: "85px" }}></p>
        </div>
        <div style={{ marginBottom: "10px", width: "100%" }}>
          <Selector onValueChange={handleClassChange} />
          {console.log(selectedClass)}
        </div>
        { load === true && (
        <div className="mb-3 p-3">
          <Search
            restaurantInformation={restaurant_information}
            onRestaurantClick={(key) =>
              console.log(`Clicked on restaurant with key: ${key}`)
            }
            setSearchResults={setSearchResults} // Pass setSearchResults function to Search component
          />
        </div>)}
        <div style={{ paddingBottom: "30px" }}>
          {/* Display search results */}
          {searchResults.length >= 0 && (
            <div>
              {searchResults.map((key) => (
                <Link
                  to={`/${userId}/restaurant/${restaurant_information[key].id}`}
                  key={key}
                  className="mb-3"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <div
                    className="mb-3"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "15px",
                      border: "2px solid #F0F0F0",
                    }}
                  >
                    <div style={{ flex: "0 0 60%" }}>
                      <img
                        src={restaurant_information[key].image}
                        alt={restaurant_information[key].name}
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
                        alignItems: "center",
                        paddingLeft: "1rem",
                        borderRadius: "0px 15px 15px px",
                      }}
                    >
                      <h4>
                        <strong>{restaurant_information[key].name}</strong>
                      </h4>
                      <div>
                        {restaurant_information[key].evaluate}{" "}
                        <StarIcon
                          style={{ fontSize: "20px", color: "#F4B63D" }}
                        />
                      </div>
                      <div>{restaurant_information[key].service}</div>
                      <div>
                        {restaurant_information[key].prepare_time}~
                        {restaurant_information[key].prepare_time + 10} min
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Navbar />
      </div>
    </div>
  );
}

export default Main;
