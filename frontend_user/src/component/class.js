import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function Selector({ onValueChange }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setAge(selectedValue);
    onValueChange(selectedValue); // Pass the selected value to the parent component
  };

  let region = {
    location: [
      "先進封測三廠",
      "台積總部及晶圓十二A廠",
      "研發中心及晶圓十二B廠",
    ],
    class: [
      "健康",
      "甜點",
      "飲品",
      "中式",
      "日式",
      "韓式",
      "義式",
      "美式",
      "泰式",
    ],
  };

  return (
    <Box className="mx-auto" sx={{ width: "90%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="location"
          onChange={handleChange}
          input={<OutlinedInput />}
          sx={{ borderRadius: "20px", height: "30px", border: "2px solid #F4B63D" }}
          displayEmpty
        >
          <MenuItem value="">
            <em>全類別</em>
          </MenuItem>
          {region.class.map((item, index) => (
            <MenuItem key={index} value={region.class[index]}>
              {region.class[index]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
