import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DishComponent from './calorie-component';

let menu = {
    id:1,
    name:"麥當勞",
    evaluate:5,
    comment:200,
    prepare_time:"20-30 min",
    location:"台積總部及晶圓十二A廠",
    time:"全日",
    news:"新品辣椒醬歡迎試吃 ~ !",
    menu_lunch: {
        main_dish:{
            1: {
                name:"牛肉麵",
                price: 100,
                Calorie:500,
                tag:["牛肉","湯麵"],
                description:"半筋半肉，保證一次成主顧",
                image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s"
            },
            
        },
        drinks:{
            1: {
                name:"薑汁檸檬茶",
                price: 60,
                Calorie:100,
                tag:["護肝飲食"],
                description:"薑可以活血化瘀，助於護肝",
                image:""
            },
        }
    },
    menu_dinner:{

        },
        menu_allday: {
            main_dish:{
                1: {
                    name:"牛肉麵",
                    price: 100,
                    Calorie:500,
                    tag:["牛肉","湯麵"],
                    description:"半筋半肉，保證一次成主顧",
                    image:""
                },
                
            },
            drinks:{
                1: {
                    name:"薑汁檸檬茶",
                    price: 60,
                    Calorie:100,
                    tag:["護肝飲食"],
                    description:"薑可以活血化瘀，助於護肝",
                    image:""
                },
            }
        }
    };

const theme = createTheme({
    palette: {
      secondary: {
        main: '#35A996',
      },
    },
  });

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [selectedDish, setSelectedDish] = React.useState(null);
  const { userId } = useParams();

    console.log(selectedDish);

  const handleDishClick = (dish, index) => {
    setSelectedDish({ ...dish, index });
    console.log('Clicked on dish at index:', index);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{width:'100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <ThemeProvider theme={theme}> 
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
        textColor="secondary" indicatorColor="secondary" >
          <Tab label={<div><p>午間時段</p><p style={{fontSize:"12px",marginTop:"-15px"}}>11:00-17:00</p></div>} {...a11yProps(0)} sx={{paddingLeft:'28px',paddingRight:'28px'}}/>
          <Tab label={<div><p>晚間時段</p><p style={{fontSize:"12px",marginTop:"-15px"}}>17:00-21:00</p></div>} {...a11yProps(1)} sx={{paddingLeft:'28px',paddingRight:'28px'}}/>
          <Tab label={<div><p>全日時段</p><p style={{fontSize:"12px",marginTop:"-15px"}}>11:00-21:00</p></div>} {...a11yProps(2)} sx={{paddingLeft:'28px',paddingRight:'28px'}}/>
        </Tabs>
        </ThemeProvider>
      </Box>
      <CustomTabPanel value={value} index={0} >
    <div style={{position:'absolute',left:0}}>
        <div style={{ height:'190px'}}>
        <h2><strong>主食</strong></h2>
        {menu.menu_lunch.main_dish && Object.values(menu.menu_lunch.main_dish).map((dish, index) => (
            <Link to={`/${userId}/restaurant/${menu.id}/${index}/${dish.name}`} key={dish.name}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <div onClick={() => handleDishClick(dish, index)} key={dish.name} style={{ display: 'flex', alignItems: 'center',borderBottom:'2px solid gray' }}>
                <div style={{ flex: '1', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{marginTop:"-20px"}}>{dish.name}</strong>
                    <span style={{ marginLeft: '10px' }}>
                        <DishComponent dish={dish} />
                    </span>
                    </div>
                <p>${dish.price}</p>
                <div style={{ display: 'inline',marginTop:"-15px" }}>
                {dish.tag.map((tag, index) => (
                    <div
                        key={index}
                        style={{
                        display: 'inline-block',
                        margin: '2px',
                        padding: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#D3D3D3',
                        }}
                    >
                        {tag}
                    </div>
                    ))}
                </div>
                <p>{dish.description}</p>
                </div>
                <img src={dish.image} alt={dish.name} style={{ flex: '1', maxWidth: '35%', maxHeight: '35%' }} />
            </div>
            </Link>
            ))}
            </div>

            <div style={{ marginTop:"50px",height:'190px',borderBottom:'2px solid gray'}}>
            <h2><strong>飲品</strong></h2>
            {menu.menu_lunch.drinks && Object.values(menu.menu_lunch.drinks).map((dish,index) => (
                <Link to={`/${userId}/restaurant/${menu.id}/${index}/${dish.name}`} key={dish.name}
                style={{ textDecoration: 'none', color: 'inherit' }}>
                <div onClick={() => handleDishClick(dish)} key={dish.name} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: '1', padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{marginTop:"-20px"}}>{dish.name}</strong>
                    <span style={{ marginLeft: '10px' }}>
                        <DishComponent dish={dish} />
                    </span>
                    </div>
                <p>${dish.price}</p>
                    <p style={{marginTop:"-15px",marginBottom:"0px"}}>Calorie：{dish.Calorie}</p>
                    <div style={{ display: 'inline' }}>
                    {dish.tag.map((tag, index) => (
                        <div
                            key={index}
                            style={{
                            display: 'inline-block',
                            margin: '2px',
                            padding: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#D3D3D3',
                            }}
                        >
                            {tag}
                        </div>
                        ))}
                    </div>
                    <p>{dish.description}</p>
                    </div>
                    <img src={dish.image} alt={dish.name} style={{ flex: '1', maxWidth: '35%', maxHeight: '35%' }} />
                </div>
                </Link>
                ))}
            </div>
    </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
      <div style={{position:'absolute',left:0}}>
        <div style={{ height:'190px'}}>
        <h2><strong>主食</strong></h2>
        {menu.menu_dinner.main_dish && Object.values(menu.menu_dinner.main_dish).map((dish) => (
            <Link to={`/${userId}/restaurant/${menu.id}/${dish.name}`} key={dish.name}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <div key={dish.name} style={{ display: 'flex', alignItems: 'center' ,borderBottom:'2px solid gray'}}>
                <div style={{ flex: '1', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{marginTop:"-20px"}}>{dish.name}</strong>
                    <span style={{ marginLeft: '10px' }}>
                        <DishComponent dish={dish} />
                    </span>
                    </div>
                <p>${dish.price}</p>
                <p style={{marginTop:"-15px",marginBottom:"0px"}}>{dish.Calorie}</p>
                <div style={{ display: 'inline' }}>
                    {dish.tag.map((tag, index) => (
                    <div
                        key={index}
                        style={{
                        display: 'inline-block',
                        margin: '2px',
                        padding: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#D3D3D3',
                        }}
                    >
                        {tag}
                    </div>
                    ))}
                </div>
                <p style={{borderBottom:'2px solid gray'}}>{dish.description}</p>
                </div>
                <img src={dish.image} alt={dish.name} style={{ flex: '1', maxWidth: '35%', maxHeight: '35%' }} />
            </div>
            </Link>
            ))}
        </div>
            <p></p>
            <div style={{ height:'190px',borderBottom:'2px solid gray'}}>
            <h2><strong>飲品</strong></h2>
            {menu.menu_dinner.drinks && Object.values(menu.menu_dinner.drinks).map((dish) => (
            <Link to={`/${userId}/restaurant/${menu.id}/${dish.name}`} key={dish.name}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <div key={dish.name} style={{ display: 'flex', alignItems: 'center',borderBottom:'2px solid gray' }}>
                <div style={{ flex: '1', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{marginTop:"-20px"}}>{dish.name}</strong>
                    <span style={{ marginLeft: '10px' }}>
                        <DishComponent dish={dish} />
                    </span>
                    </div>
                <p>${dish.price}</p>
                <p style={{marginTop:"-15px",marginBottom:"0px"}}>{dish.Calorie}</p>
                <div style={{ display: 'inline' }}>
                    {dish.tag.map((tag, index) => (
                    <div
                        key={index}
                        style={{
                        display: 'inline-block',
                        margin: '2px',
                        padding: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#D3D3D3',
                        }}
                    >
                        {tag}
                    </div>
                    ))}
                </div>
                <p style={{borderBottom:'2px solid gray'}}>{dish.description}</p>
                </div>
                <img src={dish.image} alt={dish.name} style={{ flex: '1', maxWidth: '35%', maxHeight: '35%' }} />
            </div>
            </Link>
            ))}
        </div>
    </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
      <div style={{position:'absolute',left:0}}>
        <div style={{ height:'190px'}}>
        <h2><strong>主食</strong></h2>
        {menu.menu_allday.main_dish && Object.values(menu.menu_allday.main_dish).map((dish) => (
            <Link to={`/${userId}/restaurant/${menu.id}/${dish.name}`} key={dish.name}
            style={{ textDecoration: 'none', color: 'inherit' }}>
            <div key={dish.name} style={{ display: 'flex', alignItems: 'center',borderBottom:'2px solid gray' }}>
                <div style={{ flex: '1', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{marginTop:"-20px"}}>{dish.name}</strong>
                    <span style={{ marginLeft: '10px' }}>
                        <DishComponent dish={dish} />
                    </span>
                    </div>
                <p>${dish.price}</p>
                <p style={{marginTop:"-15px",marginBottom:"0px"}}>{dish.Calorie}</p>
                <div style={{ display: 'inline' }}>
                {dish.tag.map((tag, index) => (
                    <div
                        key={index}
                        style={{
                        display: 'inline-block',
                        margin: '2px',
                        padding: '5px',
                        borderRadius: '50%',
                        backgroundColor: '#D3D3D3',
                        }}
                    >
                        {tag}
                    </div>
                    ))}
                </div>
                <p>{dish.description}</p>
                </div>
                <img src={dish.image} alt={dish.name} style={{ flex: '1', maxWidth: '35%', maxHeight: '35%' }} />
            </div>
            </Link>
            ))}
            </div>
            <p></p>
            <div style={{ height:'190px',borderBottom:'2px solid gray'}}>
            <h2><strong>飲品</strong></h2>
            {menu.menu_allday.drinks && Object.values(menu.menu_allday.drinks).map((dish) => (
                <Link to={`/${userId}/restaurant/${menu.id}/${dish.name}`} key={dish.name}
                style={{ textDecoration: 'none', color: 'inherit' }}>
                <div key={dish.name} style={{ display: 'flex', alignItems: 'center',borderBottom:'2px solid gray' }}>
                    <div style={{ flex: '1', padding: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <strong style={{marginTop:"-20px"}}>{dish.name}</strong>
                    <span style={{ marginLeft: '10px' }}>
                        <DishComponent dish={dish} />
                    </span>
                    </div>
                <p>${dish.price}</p>
                    <p style={{marginTop:"-15px",marginBottom:"0px"}}>{dish.Calorie}</p>
                    <div style={{ display: 'inline' }}>
                    {dish.tag.map((tag, index) => (
                        <div
                            key={index}
                            style={{
                            display: 'inline-block',
                            margin: '2px',
                            padding: '5px',
                            borderRadius: '50%',
                            backgroundColor: '#D3D3D3',
                            }}
                        >
                            {tag}
                        </div>
                        ))}
                    </div>
                    <p>{dish.description}</p>
                    </div>
                    <img src={dish.image} alt={dish.name} style={{ flex: '1', maxWidth: '35%', maxHeight: '35%' }} />
                </div>
                </Link>
                ))}
            </div>
    </div>
      </CustomTabPanel>
    </Box>
  );
}