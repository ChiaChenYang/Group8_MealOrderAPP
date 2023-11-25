import React,{useState,useEffect} from 'react'
import BackButton from './component/return'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ColorToggleButton from './component/toggle-component';
import CustomTimePicker from './component/timepicker';
import TimePicker from './component/timepicker';

function Checkout() {
    const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const formattedTime = `${padZero(hours)}:${padZero(minutes)}`;

      setCurrentTime(formattedTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []); 

  const padZero = (num) => (num < 10 ? `0${num}` : num);
    let restaurant_information = {
        name:"麥當勞",
        evaluate:5,
        comment:200,
        prepare_time:"20-30 min",
        location:"台積總部及晶圓十二A廠",
        time:"全日",
        news:"新品辣椒醬歡迎試吃 ~ !",
        menu_lunch: {
            "主食":{
                1: {
                    name:"牛肉麵",
                    price: 100,
                    Calorie:500,
                    tag:["牛肉","湯麵"],
                    description:"半筋半肉，保證一次成主顧",
                    image:""
                },
                
            },
            "飲品":{
                1: {
                    name:"薑汁檸檬茶",
                    price: 60,
                    Calorie:100,
                    tag:["護肝飲食"],
                    description:"薑可以活血化瘀，有助於保護肝臟",
                    image:""
                },
            }
        },
        menu_dinner:{

            },
            menu_allday: {
                "主食":{
                    1: {
                        name:"牛肉麵",
                        price: 100,
                        Calorie:500,
                        tag:["牛肉","湯麵"],
                        description:"半筋半肉，保證一次成主顧",
                        image:""
                    },
                    
                },
                "飲品":{
                    1: {
                        name:"薑汁檸檬茶",
                        price: 60,
                        Calorie:100,
                        tag:["護肝飲食"],
                        description:"薑可以活血化瘀，有助於保護肝臟",
                        image:""
                    },
                }
            }
        };
        let order = {
            name:"牛肉麵",
            price: 100,
            quantity:1,
            image:"https://storage.googleapis.com/cw-com-tw/article/201808/article-5b7389d4522c2.jpg"
        }
        const [selectedTime, setSelectedTime] = useState(null);

        const handleTimeChange = (time) => {
            setSelectedTime(time);
            console.log('Selected Time:', time);
        };
  return (
    <div>
    <div style={{height:"70px", background: "#F4B63D", borderRadius: "0px 0px 30px 30px", display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 20px'}}>
        <BackButton style={{color:"white", fontSize:"30px"}}/>
        <p style={{fontSize:"30px",color:'white'}}><strong>結帳</strong></p>
        <div style={{ width: '48px' }}></div> {/* Placeholder for spacing */}
    </div>
    <div>
        <p style={{marginTop:"10px",marginLeft:"10px",fontSize:"20px"}}><strong>{restaurant_information.name}</strong><span style={{fontSize:"15px",marginLeft:"150px"}}>{restaurant_information.location}</span></p>
        <p style={{marginLeft:"10px", fontSize:"15px"}}>{restaurant_information.prepare_time}</p>
        <p style={{fontSize:"20px",marginLeft:"10px"}}><strong>用餐方式</strong></p>
        <ColorToggleButton />
        <p style={{fontSize:"20px",margin:"10px 10px"}}><strong>預計前往取餐時間</strong></p>
        <div style={{marginLeft:"10px",borderBottom:"2px solid gray" ,width:"350px"}}>
            <TimePicker />
        </div>
        <p style={{fontSize:"20px",margin:"10px 10px"}}><strong>您的餐點</strong></p>
        <div style={{marginLeft:"10px", borderBottom:"2px solid gray"}}>
            <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '350px', marginBottom: '10px' }}>
                <span>{order.name}</span>
                <img src={order.image} alt={order.name} style={{width:"100px"}}/>
            </p>
            <p style={{ display: 'flex', justifyContent: 'space-between', width: '350px' }}>
                <span>{order.quantity}</span>
                <span>{order.price}</span>
            </p>
        </div>
        <div style={{marginLeft:"10px"}}>
            <p style={{fontSize:"20px"}}><strong>小計<span style={{float:"right"}}>{order.price}</span></strong></p>
            <p style={{fontSize:"20px"}}><strong>餐補</strong></p>
            <p style={{fontSize:"20px"}}><strong>總計</strong></p>
        </div>
        <button style={{ width:'90%', margin: '20px 5% 20px 5%', padding: '10px 0', backgroundColor:"#F4B63D", color: 'white', fontSize: '20px', border: 'none', borderRadius: '30px'}}>
            送出
        </button>
    </div>
</div>
  )
}

export default Checkout