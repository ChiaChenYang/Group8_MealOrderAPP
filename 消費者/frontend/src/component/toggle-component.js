// ColorToggleButton.js
import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function ColorToggleButton({ onAlignmentChange }) {
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    onAlignmentChange(newAlignment); // Call the callback function
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton
        value="外帶"
        style={{
          marginLeft: "40px",
          width: "100px",
          borderRadius: "20px",
          marginRight: "20px",
        }}
      >
        外帶
      </ToggleButton>
      <ToggleButton
        value="內用"
        style={{ width: "100px", borderRadius: "20px" }}
      >
        內用
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
