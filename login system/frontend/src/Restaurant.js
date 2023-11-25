import React from 'react';
// import { useParams } from 'react-router-dom';
import menupng from './image/menu.png';
import BackButton from './component/return';
import StarIcon from '@mui/icons-material/Star';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BasicTabs from './component/tab-component';

function Restaurant() {
//   const { id } = useParams();
  let menu = {
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

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <img src={menupng} alt="menu" style={{ width: '100%', height: '20%', objectFit: 'cover' }} />

        <div style={{borderRight:"2px solid gray",borderLeft:"2px solid gray",borderTop:"2px solid gray",flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
            <BackButton style={{ position: 'absolute', top: 0, right: 0}} />
            <p></p><p></p><p></p><p></p>
            <div style={{position: 'absolute', top: '60px', left:'20px'}}>
                <h1><strong>{menu.name}</strong></h1>
                <p><StarIcon style={{ fontSize: '20px', color: 'yellow' }}/> {menu.evaluate} ({menu.comment}+)
                    <scan style={{ marginLeft: '100px' }}>{menu.location}</scan> 
                    <p>
                        {menu.prepare_time}
                    </p>
                </p>
                <p>
                    <NotificationsIcon style={{ fontSize: '20px', color: 'yellow' }}/>
                    <strong> 最新消息</strong>
                    <p style={{ marginLeft: '25px' }}>{menu.news}</p>
                </p>
                <BasicTabs />
            </div>
        </div>
    </div>
    </div>
  );
}

export default Restaurant;
