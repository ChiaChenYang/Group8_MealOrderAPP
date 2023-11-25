import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Navbar from './component/navbar-component';
import ImageUploader from './component/imageLoader';

function Home() {
  const [data, setData] = useState([]);

  const fetchUser = async () => {
    const result = await fetch('http://localhost:8081/user').then((res) => res.json());
    setData(result);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const User = Array.isArray(data) && data.length > 0 ? data[4] : null;

  let a_style = {
    background: 'rgb(240, 240, 240)',
    padding: '1em 1.2em',
    fontSize: '1em',
    margin: '0.5em',
    color: 'black',
    textDecoration: 'none',
    flexGrow: 1,
  };

  return (
    <div className='d-flex justify-content-center vh-100'>
      <div style={{ position: 'absolute', top: '5%' }}>
        <div className='mb-3  p-3'>
          <h2>
            <strong>個人資訊</strong>
          </h2>
          <ImageUploader className='col-md-6' />
          <div className='col-md-12' style={{ display: 'flex', flexDirection: 'column' }}>
            {User && (
              <div className='col-md-6' key={User.id} style={{ marginBottom: '0.2rem' }}>
                姓名： {User.name} {User.value}
              </div>
            )}
            {User && (
              <div className='col-md-6' key={User.id} style={{ marginBottom: '0.2rem' }}>
                單位： {User.division} {User.value}
              </div>
            )}
            {User && (
              <div className='col-md-8' key={User.id} style={{ marginBottom: '0.2rem' }}>
                職稱： {User.position} {User.value}
              </div>
            )}
          </div>
          <div
            className='button-area'
            style={{
              margin: '5px auto',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              flexWrap: 'nowrap',
              maxWidth: '320px',
            }}
          >
            <Link to='/Favorite' style={a_style}>
              <FavoriteIcon style={{ marginBottom: 3.5 }} /> 最愛商家
            </Link>
            <Link to='/fee' style={a_style}>
              <EqualizerIcon style={{ marginBottom: 3.5 }} /> 月結餐費
            </Link>
            <Link to='/order-history' style={a_style}>
              <HistoryIcon style={{ marginBottom: 3.5 }} /> 歷史訂單
            </Link>
            <Link to='/settings' style={a_style}>
              <SettingsIcon style={{ marginBottom: 3.5 }} /> 飲食偏好設定
            </Link>
            <Link to='/notifications' style={a_style}>
              <NotificationsIcon style={{ marginBottom: 3.5 }} /> 健保食品服用提醒設定
            </Link>
          </div>
        </div>
      </div>
      <div style={{position:"absolute",bottom:0,width:'100%'}}><Navbar /></div>
    </div>
  );
}

export default Home;
