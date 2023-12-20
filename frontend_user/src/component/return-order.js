import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackButton() {
    const navigate = useNavigate();
  
    const goBack = () => {
      navigate(-1); // Navigate back
    };

  return (
    <div>
      <ArrowBackIcon
        id="return_btn"
        onClick={goBack}
        style={{
          fontSize: 40,
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "gray",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default BackButton;
