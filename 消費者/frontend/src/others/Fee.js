import React from 'react'
import BackButton from '../component/return'
import image from '../image/fee.png'
import HomeIcon from '@mui/icons-material/Home';

const HistoryItem = ({ name, price, time }) => (
    <div style={{ display: 'flex',alignItems:'center', border: '2px solid gray', marginBottom: '10px', paddingBottom: '10px' }}>
        <HomeIcon style={{width:"50px"}} />
        <p style={{marginLeft:"10px",marginTop:"30px"}}><strong>{name}</strong>
        <p><strong>{price} | {time}</strong></p>
        </p>
        
    </div>
  );

function Fee() {
    let fee_information = {
        accumulate_fee: 2500,
        time:"2023年10月", 
        history:{ 
            1:{
                name: "麥當勞",
                price: 100, //這邊是總價格喔~ price*quantity
                time: "10月30號",
            },
            2:{
                name:"麥當勞 2",
                price: 200,
                time: "10月30號"
            }
        }
    };
        
  return (
    <div>
    <div style={{height:'70px',background: "#35A996", borderRadius:"0px 0px 30px 30px"}}>
        <BackButton />
        <h1 style={{paddingTop:"15px",marginLeft:"60px", color:'white'}}>月結餐費</h1>
        <img src={image} alt="man" style={{width:"70%",marginLeft:"60px",paddingTop:"40px"}}/>
        <h1 style={{paddingTop:"15px",marginLeft:"120px"}}>{fee_information.time}</h1>
        <strong><h1 style={{paddingTop:"15px",marginLeft:"150px"}}>$ {fee_information.accumulate_fee}</h1></strong>
        </div>
        <div style={{ marginLeft: "10px", marginTop: "450px", flex: '1' }}>
          {Object.values(fee_information.history).map(item => (
            <HistoryItem key={item.name} {...item} />
          ))}
        </div>
    </div>
  )
}

export default Fee