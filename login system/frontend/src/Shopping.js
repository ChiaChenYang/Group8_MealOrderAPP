import React from 'react'
import Navbar from './component/navbar-component'

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
        <div style={{marginTop:"20px",marginLeft:"20px"}}>
            <h1><strong>購物車</strong></h1>
            <p></p>
            {Object.keys(shopping_cart).map((itemId) => {
          const item = shopping_cart[itemId];
          return (
            <div className='rounded' key={itemId} style={{ display: 'flex', marginBottom: '20px',border:'2px solid black'}}>
              <div style={{ flex: '0 0 50%', marginRight: '20px' }}>
                <img
                  src={item.image}
                  alt={`${item.shop_name} Image`}
                  style={{ width:'80%', height: '100%',marginLeft:'10px' }}
                />
              </div>
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', marginRight:'5px' }}>
                <p style={{marginTop:"5px"}}><strong>{item.shop_name}</strong>
                <p>$ {item.price} | {item.quantity}項餐點</p></p>
                <button className='rounded' style={{ backgroundColor: "#F4B63D" ,marginBottom:"5px"}}>檢視購物車</button>
                <button  className='rounded'>檢視商店</button>
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