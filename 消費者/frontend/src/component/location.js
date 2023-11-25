import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  let region = {
    location:["先進封測三廠","台積總部及晶圓十二A廠","研發中心及晶圓十二B廠"],
    class:["中式","美式","義式"]
  }

  return (
    <Box className='mx-auto' sx={{ width:'70%'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label='location'
          onChange={handleChange}
          input={<OutlinedInput/>}
          sx={{ borderRadius: '20px',height:'30px',border:'yellow' }} // Set the borderRadius as per your requirement
        >
          <MenuItem value={'先進封測三廠'}>{region.location[0]}</MenuItem>
          <MenuItem value={'台積總部及晶圓十二A廠'}>{region.location[1]}</MenuItem>
          <MenuItem value={'研發中心及晶圓十二B廠'}>{region.location[2]}</MenuItem>
          {/* <MenuItem value={'晶圓二廠'}>{region.location[3]}</MenuItem>
          <MenuItem value={'晶圓三廠'}>{region.location[4]}</MenuItem>
          <MenuItem value={'晶圓五廠'}>{region.location[5]}</MenuItem>
          <MenuItem value={'晶圓八廠'}>{region.location[6]}</MenuItem>
          <MenuItem value={'先進封測一廠'}>{region.location[7]}</MenuItem>
          <MenuItem value={'先進封測六廠'}>{region.location[8]}</MenuItem>
          <MenuItem value={'晶圓十五廠'}>{region.location[9]}</MenuItem>
          <MenuItem value={'先進封測五廠'}>{region.location[10]}</MenuItem>
          <MenuItem value={'晶圓六廠'}>{region.location[11]}</MenuItem>
          <MenuItem value={'晶圓十四廠'}>{region.location[12]}</MenuItem>
          <MenuItem value={'晶圓十八廠'}>{region.location[13]}</MenuItem>
          <MenuItem value={'先進封測二廠'}>{region.location[14]}</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}
