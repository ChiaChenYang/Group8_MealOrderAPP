// Selector.js
import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";

export default function ControllableStates({ onValueChange }) {
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setAge(selectedValue);
    onValueChange(selectedValue); // Pass the selected value to the parent component
  };

  let region = {
    location: [
      "先進封測一廠",
      "先進封測二廠",
      "先進封測三廠",
      "先進封測五廠",
      "先進封測六廠",
      "台積總部及晶圓十二A廠",
      "研發中心及晶圓十二B廠",
      "晶圓二廠",
      "晶圓三廠",
      "晶圓五廠",
      "晶圓六廠",
      "晶圓八廠",
      "晶圓十四廠",
      "晶圓十八廠",
    ],
    class: ["中式", "美式", "義式"],
  };

  return (
    <Box className="mx-auto" sx={{ width: "70%" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="location"
          onChange={handleChange}
          input={<OutlinedInput />}
          displayEmpty
          sx={{ borderRadius: "20px", height: "30px", border: "2px solid #F4B63D" }}
        >
          <MenuItem value="" disabled>
            <em>主廠區</em>
          </MenuItem>
          {region.location.map((item, index) => (
            <MenuItem key={index} value={region.location[index]}>
              {region.location[index]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
/* <MenuItem value={'晶圓二廠'}>{region.location[3]}</MenuItem> <MenuItem value={'晶圓三廠'}>{region.location[4]}</MenuItem> <MenuItem value={'晶圓五廠'}>{region.location[5]}</MenuItem> <MenuItem value={'晶圓八廠'}>{region.location[6]}</MenuItem> <MenuItem value={'先進封測一廠'}>{region.location[7]}</MenuItem> <MenuItem value={'先進封測六廠'}>{region.location[8]}</MenuItem> <MenuItem value={'晶圓十五廠'}>{region.location[9]}</MenuItem> <MenuItem value={'先進封測五廠'}>{region.location[10]}</MenuItem> <MenuItem value={'晶圓六廠'}>{region.location[11]}</MenuItem> <MenuItem value={'晶圓十四廠'}>{region.location[12]}</MenuItem> <MenuItem value={'晶圓十八廠'}>{region.location[13]}</MenuItem> <MenuItem value={'先進封測二廠'}>{region.location[14]}</MenuItem> */
