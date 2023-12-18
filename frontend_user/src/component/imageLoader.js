import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ImageUploader = ({ onImageChange }) => {
  const [image, setImage] = useState(null);
  const { userId } = useParams();

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="col-md-12"
      style={{ position: "relative", right: "0", marginBottom: "10px" }}
    >
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {image && (
        <div>
          <div
            style={{
              position: "absolute",
              top: "0px",
              left: "209px",
              width: "100px",
              height: "100px",
              overflow: "hidden",
              borderRadius: "50%",
              margin: "0 auto",
            }}
          >
            <img
              src={User.image || image}
              alt="Uploaded"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
