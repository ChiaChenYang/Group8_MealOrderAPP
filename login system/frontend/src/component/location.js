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
    location:["1廠","2廠","3廠","4廠"],
    class:["中式","美式","義式"]
  }

  return (
    <Box className='mx-auto' sx={{ width:'50%'}}>
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
          <MenuItem value={'一廠'}>{region.location[0]}</MenuItem>
          <MenuItem value={'二廠'}>{region.location[1]}</MenuItem>
          <MenuItem value={'三廠'}>{region.location[2]}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
