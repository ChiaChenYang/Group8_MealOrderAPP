import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
import defaultImage from '../image/defaultImage.jpg';
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

const Search = ({ restaurantInformation, onRestaurantClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(
    Object.keys(restaurantInformation)
  );
  const { userId } = useParams();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    const results = Object.keys(restaurantInformation).filter((key) =>
      restaurantInformation[key].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <div
        style={{
          marginBottom: "15px",
          marginLeft: "5px",
          width: "98%",
          borderRadius: "20px",
          border: "3px solid #F4B63D",
        }}
      >
        <input
          type="text"
          placeholder="Search for a restaurant..."
          value={searchTerm}
          onChange={handleInputChange}
          style={{
            marginLeft: "10px",
            borderRadius: "10px",
            width: "80%",
            border: "none",
            outline: "none",
          }}
        />
        <IconButton
          onClick={handleSearchClick}
          style={{ marginLeft: "10px", color: "#F4B63D" }}
        >
          <SearchIcon />
        </IconButton>
      </div>
      <div>
        {searchResults.map((key) => (
          <div key={key}>
            <Link
              to={`/${userId}/restaurant/${key}`}
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
                    src={restaurantInformation[key].image || defaultImage}
                    alt={restaurantInformation[key].name}
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
                  <h4 style={{marginTop:"10px"}}>
                    <strong>{restaurantInformation[key].name}</strong>
                  </h4>
                  <p style={{marginTop:"0px"}}>
                    {restaurantInformation[key].evaluate}{" "}
                    <StarIcon style={{ fontSize: "20px", color: "#F4B63D" }} />
                    </p>
                    <p style={{marginTop:"-10px"}}>
                      {restaurantInformation[key].service}
                      </p>
                      <p style={{marginTop:"-15px"}}>
                        {restaurantInformation[key].prepare_time}~
                        {restaurantInformation[key].prepare_time + 10} min
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
