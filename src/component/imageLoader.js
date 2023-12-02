import React, { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
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
              src={image}
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
