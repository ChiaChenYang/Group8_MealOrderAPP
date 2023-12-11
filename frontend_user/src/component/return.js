import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function BackButton() {
  const history = useNavigate();
  const { userId } = useParams();

  const goBack = () => {
    history(`/${userId}/home`);
  };

  return (
    <div>
      <Link id="return_btn" to={`/${userId}/main`} onClick={goBack} style={{ color: "gray" }}>
        <ArrowBackIcon
          style={{
            fontSize: 40,
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
        />
      </Link>
    </div>
  );
}

export default BackButton;
