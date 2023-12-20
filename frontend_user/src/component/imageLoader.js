import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ImageUploader = ({ onImageChange }) => {
  const [image, setImage] = useState(null);
  const { userId } = useParams();

  const [user, setUser] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userIdInt = parseInt(userId, 10);
        const response = await fetch(
          `http://localhost:3000/consumers/${userIdInt}/info`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData);

        const transformedData = {
          id: responseData.id,
          name: responseData.name,
          division: responseData.division,
          position: responseData.position,
          image: responseData.image || null, // Assuming there's a default image
        };

        setUser(transformedData);
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
              src={image || user.image || "default-image-url"} // "default-image-url" is a placeholder for a default image URL
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
