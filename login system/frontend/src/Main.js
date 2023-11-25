import React from 'react';
import ControllableStates from './component/location';
import CustomizedInputBase from './component/searchingBar';
import NestedGrid from './component/flexblock';
import image from './image/main.png';
import Navbar from './component/navbar-component';
import StarIcon from '@mui/icons-material/Star';
import mainp from './image/mainp.png';
import { Routes,Route,Link } from 'react-router-dom';
import Restaurant from './Restaurant';

function Main() {
  let restaurant_information = {
    1:{name:"麥當勞",
    image:"https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj",
    prepare_time:"20-30 min",
    evaluate: 5,
    service:"內用|外帶",
    menu:{
        name:"薯條",
        price: 50,
        class: "炸物",
        describe:"採用新鮮馬鈴薯",
        image:"data:image/jpeg;base64,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",
        choice:{
            amount:["小","中","大"],
            spice:["不辣","小辣","中辣","大辣"]
        }
    }}
}

  return (
    <div className='d-flex justify-content-center vh-100'>
        <div>
        <div className="mb-3 p-3">
          <ControllableStates />
        </div>
        <div className="mb-3 p-3">
          <h2>
            <strong>想要吃什麼？</strong>
            <img src={image} alt="main" style={{ width: '50%', position: 'relative', left: '30px', bottom: '20px' }} />
          </h2>
          <div><img src={mainp} alt="mainp"  style={{width:'100%'}}/></div>
          <p></p>
          <CustomizedInputBase />
        </div>
        <div>
          <NestedGrid />
        </div>
        <div className="mb-3 p-3">
        {Object.keys(restaurant_information).map((key) => (
          <Link to={`/restaurant/${key}`} key={key} className="mb-3" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div key={key} className="mb-3" style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flex: '0 0 60%'}}>
              <img src={restaurant_information[key].image} alt={restaurant_information[key].name} style={{ width: '90%' }} className='rounded'/>
            </div>
            <div style={{ flex: '0 0 40%', backgroundColor: 'white', padding: '1.5rem'}} className="shadow-lg bg-body bg-white rounded">
              <h3>{restaurant_information[key].name}</h3>
              <p>{restaurant_information[key].evaluate} <StarIcon style={{ fontSize: '20px', color: 'yellow' }} /></p>
              <p>{restaurant_information[key].service}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
      </div>
      <Routes>
        <Route path="/restaurant/:id" component={<Restaurant />} />
      </Routes>
      <div style={{position:"absolute",bottom:0,width:'100%'}}><Navbar /></div>
    </div>
  );
}

export default Main;