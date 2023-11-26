import React from 'react'
import Navbar from './component/navbar-component';

function History() {
  let now_order = {
                  1:{
                    shop_name:"麥當勞",
                    quantity:3,
                    price:300,
                    image: "https://yt3.googleusercontent.com/ytc/APkrFKZi46pled4Gcj8WhRnYE1vO9Py1S-hDB1ntiybvCQ=s900-c-k-c0x00ffffff-no-rj",
                    time:"12:30"  //預計可取餐時間
                  },
                  2:{
                    shop_name:"麥當勞2",
                    quantity:4,
                    price:350,
                    image: "照片（店家照片）",
                    time:"12:50"  //預計可取餐時間
                  },
            }
  
  return (
    <div> 
      <div>
        <div style={{marginTop:"20px",marginLeft:"20px"}}>
            <h1><strong>進行中的訂單</strong></h1>
            <p></p>
            {Object.keys(now_order).map((itemId) => {
          const item = now_order[itemId];
          return (
            <div className='rounded' key={itemId} style={{ display: 'flex', marginBottom: '20px',border:'2px solid black'}}>
              <div style={{ flex: '0 0 50%', marginRight: '30px',marginTop:'10px'}}>
                <img
                  src={item.image}
                  alt={`${item.shop_name} Image`}
                  style={{ width:'80%', height: '90%',marginLeft:'10px' }}
                />
              </div>
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', marginRight:'5px' }}>
                <p style={{marginTop:"5px"}}><strong>{item.shop_name}</strong>
                <p>$ {item.price} | {item.quantity}項餐點</p>
                <p>預計可取餐時間：{item.time}</p>
                <button className='rounded' style={{}}>訂單狀況追蹤</button>
                </p>
              </div>
            </div>
          );
        })}
        </div>
        <div  style={{position:"absolute",bottom:0, width:'100%'}}>
            <Navbar/>
        </div>
    </div>
    </div>
  )
}

export default History