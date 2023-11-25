import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function BackButton() {
    const history = useNavigate();
    

  const goBack = () => {
    history('/home');
  };

  return (
    <div>
      <Link to="/main" onClick={goBack} style={{color:"gray"}}>
      <ArrowBackIcon style={{ fontSize: 40, position:'absolute', top:"10px", left:"10px"}}/>
      </Link>
    </div>
  );
}

export default BackButton;
