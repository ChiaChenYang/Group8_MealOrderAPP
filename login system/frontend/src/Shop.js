import React, { useState, useEffect } from 'react';
import menupng from './image/menu.png';
import QuantityInput from './component/plus_minus';
import BackButton from './component/return';

function Shop() {
  const [item, setItem] = useState({
    restaurant: "麥當勞",
    name: "牛肉麵",
    price: 100,
    quantity: 1,
    tag: ["牛肉", "湯麵"],
    description: "半筋半肉，保證一次成主顧",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s"
  });

  const handleQuantityChange = (quantity) => {
    setItem((prevItem) => ({
      ...prevItem,
      quantity: quantity,
      total: quantity * prevItem.price, 
    }));
  };

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <img src={menupng} alt="menu" style={{ width: '100%', height: '10%', objectFit: 'cover' }} />
        <div style={{ borderRight: "2px solid gray", borderLeft: "2px solid gray", borderTop: "2px solid gray", flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <BackButton />
          <div style={{ paddingLeft: '20px', paddingTop: '70px' }}>
            <h2 style={{ fontSize: "40px" }}><strong>{item.restaurant}</strong></h2>
            <scan style={{ fontSize: '25px' }}><strong>{item.name}</strong></scan>
            <scan style={{ marginLeft: '150px' }}> <img src={item.image} style={{ width: '30%' }} /> </scan>
            <QuantityInput onQuantityChange={handleQuantityChange} />
            <p style={{ marginLeft: '300px' }}>$ {item.price}</p>
            <p style={{ borderBottom: '2px solid gray' }}></p>
            <strong><p>小計<scan style={{ marginLeft: '280px' }}>{item.total}</scan></p></strong>
          </div>
          <p style={{ paddingLeft: '20px' }}><strong>新增備註</strong></p>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <input
              className='rounded'
              placeholder="備註"
              type="text"
              style={{ width: '90%', height: "100px", fontSize: '16px', backgroundColor: "#D3D3D3" }}
            />
          </div>
          <p></p>
          <button className='rounded' style={{ width: '90%', marginLeft: '20px', backgroundColor: "#F4B63D" }}>
            繼續點餐
          </button>
          <p></p>
          <button className='rounded' style={{ width: '90%', marginLeft: '20px', backgroundColor: "#F4B63D" }}>
            前往結帳
          </button>
        </div>
      </div>
    </div>
  )
}

export default Shop;