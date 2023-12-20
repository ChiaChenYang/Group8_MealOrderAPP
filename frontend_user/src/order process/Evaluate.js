import React, { useState, useEffect } from "react";
import HalfRating from "../component/rating-component";
import { useNavigate, useParams } from "react-router-dom";
import menupng from "../image/defaultImage.jpg";
import BackButton from "../component/return";
import Notify from "../component/messenge-component";

function Evaluate() {
  const { userId } = useParams();
  const { id } = useParams();
  const { order_id } = useParams();
  const [note, setNote] = useState("");
  const [rating, setRating] = useState(5);
  const navigate = useNavigate();
  console.log(rating);
  const handleNoteChange = (event) => {
    // Update the note value in the state
    setNote(event.target.value);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const [evaluation_information, setEvaluate] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/orders/${order_id}/restaurantinfo`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json(); // Assuming the response is JSON
        console.log("Response Data:", responseData);

        // Assuming responseData is in the desired structure
        const transformedData = {
          name: responseData.name,
          location: responseData.location,
          image: responseData.image,
        };

        setEvaluate(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    };

    fetchData();
  }, [order_id]);

  // let evaluation_information = {
  //   name: "麥當勞",
  //   location: "台積總部及晶圓十二A廠",
  //   image:
  //     "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj",
  // };

  const handleRatingSubmit = async () => {
    const ratingData = {
      id: id,
      name: evaluation_information.name,
      star: rating,
      comment: note,
    };

    try {
      const response = await fetch("http://localhost:3000/orders/set/rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingData),
      });

      if (response.ok) {
        console.log("Rating posted successfully");
        // You may want to perform additional actions upon successful submission
      } else {
        console.error(`Error: ${response.status}, ${await response.text()}`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    navigate(`/${userId}/main`);
  };

  return (
    <div>
      {<Notify />}
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <img
          src={evaluation_information.image || menupng}
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
          <BackButton />
          <div style={{ position: "absolute", top: "60px", left: "20px" }}>
            <div style={{ marginLeft: "40px", textAlign: "center" }}>
              <h1 style={{ marginLeft: "25px", margin: "0" }}>
                <strong>{evaluation_information.name}</strong>
              </h1>
              <p style={{ margin: "0" }}>{evaluation_information.location}</p>
            </div>
            <h1 style={{ marginTop: "80px", marginLeft: "115px" }}>
              <strong>您的評價</strong>
            </h1>
            <div style={{ marginLeft: "50px" }}>
              <HalfRating onRatingChange={handleRatingChange} />
            </div>
            <input
              className="rounded"
              placeholder="備註"
              type="text"
              value={note} // Set the value of the input from state
              onChange={handleNoteChange}
              style={{
                marginLeft: "40px",
                width: "90%",
                height: "100px",
                fontSize: "16px",
                backgroundColor: "#D3D3D3",
              }}
            />
            <button
              id="push_btn"
              className="rounded"
              onClick={handleRatingSubmit}
              style={{
                width: "90%",
                marginTop: "20px",
                marginLeft: "40px",
                backgroundColor: "#F4B63D",
              }}
            >
              送出
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Evaluate;
