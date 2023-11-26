import React from 'react'
import Navbar from './component/navbar-component'
import imagei from './image/imagei.jpg';

function Shopping() {
    let shopping_cart = {
        1:{
            shop_id:1,
            shop_name:"麥當勞",
            quantity:3,
            price:300,
            image: "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj"
        },
        2:{
            shop_id:2,
            shop_name:"麥當勞2",
            quantity: 4,
            price: 350,
            image: "照片（店家照片）"
        }
    
    }
  return (
    <div>
        <div style={{marginTop:"50px",marginLeft:"20px"}}>
            <h1 style={{marginLeft:"5px",fontSize:"2rem"}}><strong>購物車</strong></h1>
            <p></p>
            {Object.keys(shopping_cart).map((itemId) => {
          const item = shopping_cart[itemId];
          return (
            <div key={itemId} className="mb-3" style={{marginTop:"30px",marginLeft:"2.5px",width:"95%",display: 'flex', alignItems: 'center',borderRadius:"15px",border:"2px solid #F0F0F0"}}>
            <div style={{ flex: '0 0 60%'}}>
                <img
                  src={imagei}
                  alt={`${item.shop_name} Image`}
                  style={{ height:"100%",width: '100%',borderRadius:"15px 0px 0px 15px" }}
                />
              </div>
              <div style={{ flex: '0 0 40%',marginLeft:"13px",borderRadius:"0px 15px 15px px"}}>
                <p style={{marginTop:"5px"}}><strong>{item.shop_name}</strong>
                <p>$ {item.price} | {item.quantity}項餐點</p></p>
                <button className='rounded' style={{ width:"115px",border:"none",backgroundColor: "#F4B63D" ,marginBottom:"6px"}}>檢視購物車</button>
                <button  className='rounded'style={{width:"115px",border:"none",marginBottom:"2px"}}>檢視商店</button>
              </div>
            </div>
          );
        })}
        </div>
        <div  style={{position:"absolute",bottom:0, width:'100%'}}>
            <Navbar/>
        </div>
    </div>
  )
}

export default Shopping