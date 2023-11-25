import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
  
export default function CustomizedInputBase() {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        borderRadius: '20px',
        border: '2px solid orange', 
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1, borderRadius: '20px', border: 'none' }} 
        placeholder="searching..."
        inputProps={{ 'aria-label': 'searching...' }}
      />
      <IconButton sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}