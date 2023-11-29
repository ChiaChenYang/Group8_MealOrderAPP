import React, { useState } from "react";
import ControllableStates from "./component/location";
import image from "./image/main.png";
import Navbar from "./component/navbar-component";
import StarIcon from "@mui/icons-material/Star";
import mainp from "./image/mainp.png";
import { Routes, Route, Link } from "react-router-dom";
import Restaurant from "./order process/Restaurant";
import imagei from "./image/imagei.jpg";
import Selector from "./component/class";
import Search from "./component/search"; // Import the Search component

function Main() {
  const [selectedClass, setSelectedClass] = useState("全類別");
  const [selectedLocation, setSelectedLocation] = useState("主廠區");
  const [searchResults, setSearchResults] = useState([]);

  let restaurant_information = {
    //全類別
    1: {
      id: 1,
      name: "麥當勞",
      image:
        "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj",
      prepare_time: 20,
      evaluate: 5,
      service: "內用|外帶",
    },
    2: {
      id: 1,
      name: "麥當勞",
      image:
        "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj",
      prepare_time: 20,
      evaluate: 5,
      service: "內用|外帶",
    },
  };

  const handleClassChange = (selectedValue) => {
    setSelectedClass(selectedValue);
  };

  const handleLocationChange = (selectedValue) => {
    setSelectedLocation(selectedValue);
  };

  return (
    <div
      className="d-flex justify-content-center vh-100"
      style={{ backgroundColor: "#FFFEFD" }}
    >
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
                bottom: "20px",
              }}
            />
          </h2>
          <div>
            <img
              src={mainp}
              alt="mainp"
              style={{
                width: "90%",
                position: "absolute",
                top: "180px",
                right: "20px",
              }}
            />
          </div>
          <p style={{ marginTop: "80px" }}></p>
        </div>
        <div style={{ marginBottom: "10px", width: "100%" }}>
          <Selector onValueChange={handleClassChange} />
          {console.log(selectedClass)}
        </div>
        <div className="mb-3 p-3">
          <Search
            restaurantInformation={restaurant_information}
            onRestaurantClick={(key) =>
              console.log(`Clicked on restaurant with key: ${key}`)
            }
            setSearchResults={setSearchResults} // Pass setSearchResults function to Search component
          />
        </div>
        {/* Display search results */}
        {searchResults.length > 0 && (
          <div>
            {searchResults.map((key) => (
              <Link
                to={`/restaurant/${key}`}
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
                      src={imagei}
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
                    <p>
                      {restaurant_information[key].evaluate}{" "}
                      <StarIcon
                        style={{ fontSize: "20px", color: "#F4B63D" }}
                      />
                      <p>
                        {restaurant_information[key].service}
                        <p>
                          {restaurant_information[key].prepare_time}~
                          {restaurant_information[key].prepare_time + 10} min
                        </p>
                      </p>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Routes>
        <Route path="/restaurant/:id" component={<Restaurant />} />
      </Routes>
      <div style={{ position: "fixed", bottom: 0, width: "100%" }}>
        <Navbar />
      </div>
    </div>
  );
}

export default Main;
