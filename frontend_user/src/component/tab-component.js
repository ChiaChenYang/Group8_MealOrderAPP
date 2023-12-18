import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import defaultImage from "../image/defaultMenu.png";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import DishComponent from "./calorie-component";

// let menu = {
//   id: 1,
//   name: "麥當勞",
//   evaluate: 5,
//   comment: 200,
//   prepare_time: "20-30 min",
//   location: "台積總部及晶圓十二A廠",
//   time: "全日",
//   menu_lunch: {
//     type: ["主餐", "飲料"],
//     dish: {
//       1: {
//         1: {
//           id:1,
//           name: "牛肉麵",
//           price: 100,
//           Calorie: 500,
//           tag: ["牛肉", "湯麵"],
//           description: "半筋半肉，保證一次成主顧",
//           image:
//             "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s",
//         },
//       },
//       2: {
//         1: {
//           id:2,
//           name: "薑汁檸檬茶",
//           price: 60,
//           Calorie: 100,
//           tag: ["護肝飲食"],
//           description: "薑可以活血化瘀，助於護肝",
//           image: "",
//         },
//       },
//     },
//   },
//   menu_dinner: {},
//   menu_allday: {
//     type: ["主餐"],
//     dish: {
//       1: {
//         1: {
//           id:3,
//           name: "牛肉麵",
//           price: 100,
//           Calorie: 500,
//           tag: ["牛肉", "湯麵"],
//           description: "半筋半肉，保證一次成主顧",
//           image: "",
//         },
//         2: {
//           id:4,
//           name: "牛肉麵2",
//           price: 100,
//           Calorie: 500,
//           tag: ["牛肉", "湯麵"],
//           description: "半筋半肉，保證一次成主顧",
//           image: "",
//         },
//       },
//     },
//   },
// };

const theme = createTheme({
  palette: {
    secondary: {
      main: "#35A996",
    },
  },
});

function CustomTabPanel({ menu, value, index: tabPanelIndex, handleDishClick }) {
  let tabData;

  // Adjust the condition based on the structure of your menu object
  if (value === 0) {
    tabData = menu.menu_lunch;
  } else if (value === 1) {
    tabData = menu.menu_dinner;
  } else if (value === 2) {
    tabData = menu.menu_allday;
  }else if (value === 3) {
    tabData = menu.menu_preorder;
  }
  const { userId } = useParams();
  const { id } = useParams();
  


  return (
    <div
      role="tabpanel"
      hidden={value !== tabPanelIndex}
      id={`simple-tabpanel-${tabPanelIndex}`}
      aria-labelledby={`simple-tab-${tabPanelIndex}`}
      style={{ width: '420px',marginLeft:"-15px" }}
    >
      {value === tabPanelIndex && (
        <Box sx={{ p: 4 }}>
          {tabData && tabData.type && (
            <>
              {tabData.type.map((tabType, typeIndex) => (
                <div key={typeIndex}>
                  <h2>
                    <strong>{tabType}</strong>
                  </h2>
                  {Object.values(tabData.dish[typeIndex + 1]).map((dish, dishIndex) => (
                    <Link
                      to={`/${userId}/restaurant/${id}/${tabData.menuId}/${dish.id}`}
                      key={dishIndex}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <div
                        onClick={() => handleDishClick(dish, dishIndex)}
                        key={dishIndex}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderBottom: "2px solid gray",
                          marginTop:"10px"
                        }}
                      >
                        <div style={{ flex: "1", padding: "10px" }}>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <strong style={{ marginTop: "-20px" }}>{dish.name}</strong>
                            <span style={{ marginLeft: "10px" }}>
                              <DishComponent dish={dish} />
                            </span>
                          </div>
                          <p>${dish.price}</p>
                          {dish.tag && (
                            <div style={{ display: "inline", marginTop: "-15px" }}>
                              {dish.tag.map((tag, tagIndex) => (
                                <div
                                  key={tagIndex}
                                  style={{
                                    display: "inline-block",
                                    margin: "2px",
                                    padding: "5px",
                                    borderRadius: "50%",
                                    backgroundColor: "#D3D3D3",
                                  }}
                                >
                                  {tag}
                                </div>
                              ))}
                            </div>
                          )}
                          <p>{dish.description}</p>
                        </div>
                        <img
                          src={dish.image || defaultImage}
                          alt={dish.name}
                          style={{ flex: "1", maxWidth: "35%", maxHeight: "35%" }}
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              ))}
            </>
          )}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  menu: PropTypes.object.isRequired,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  handleDishClick: PropTypes.func.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = useState(0);
  const [selectedDish, setSelectedDish] = useState(null);
  console.log(selectedDish);
  const { id } = useParams();
  const [menuData, setMenuDetails] = useState({});
  const [error, setError] = useState(null);
  console.log(error);
  
  useEffect(() => {
    const fetchMenuDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/menus/allmenudetailsforconsumer/${id}`);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        let responseData = await response.json(); 
        console.log('Response Data:', responseData.data);
  
        setMenuDetails(responseData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      }
    };
  
    fetchMenuDetails();
  }, [id]);
  // const menuData = {
  //   id: 1,
  // name: "麥當勞",
  // evaluate: 5,
  // comment: 200,
  // prepare_time: "20-30 min",
  // location: "台積總部及晶圓十二A廠",
  // time: "全日",
  // menu_lunch: {
  //   type: ["主餐", "飲料"],
  //   dish: {
  //     1: {
  //       1: {
  //         name: "牛肉麵",
  //         price: 100,
  //         Calorie: 500,
  //         tag: ["牛肉", "湯麵"],
  //         description: "半筋半肉，保證一次成主顧",
  //         image:
  //           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhG_cZjxXIlwfsjseD7-LMSMzWI7txguoSLjCbwM85&s",
  //       },
  //     },
  //     2: {
  //       1: {
  //         name: "薑汁檸檬茶",
  //         price: 60,
  //         Calorie: 100,
  //         tag: ["護肝飲食"],
  //         description: "薑可以活血化瘀，助於護肝",
  //         image: "",
  //       },
  //     },
  //   },
  // },
  // menu_dinner: {},
  // menu_allday: {
  //   type: ["主餐"],
  //   dish: {
  //     1: {
  //       1: {
  //         name: "牛肉麵",
  //         price: 100,
  //         Calorie: 500,
  //         tag: ["牛肉", "湯麵"],
  //         description: "半筋半肉，保證一次成主顧",
  //         image: "",
  //       },
  //       2: {
  //         name: "牛肉麵2",
  //         price: 100,
  //         Calorie: 500,
  //         tag: ["牛肉", "湯麵"],
  //         description: "半筋半肉，保證一次成主顧",
  //         image: "",
  //       },
  //     },
  //   },
  // },
  // };

  const handleDishClick = (dish, index) => {
    setSelectedDish({ ...dish, index });
    console.log("Clicked on dish at index:", index);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <ThemeProvider theme={theme}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab
              label={
                <div>
                  <p>午間時段</p>
                  <p style={{ fontSize: "12px", marginTop: "-15px" }}>11:00-17:00</p>
                </div>
              }
              {...a11yProps(0)}
              sx={{ paddingLeft: "15px", paddingRight: "15px" }}
            />
            <Tab
              label={
                <div>
                  <p>晚間時段</p>
                  <p style={{ fontSize: "12px", marginTop: "-15px" }}>17:00-21:00</p>
                </div>
              }
              {...a11yProps(1)}
              sx={{ paddingLeft: "15px", paddingRight: "15px" }}
            />
            <Tab
              label={
                <div>
                  <p>全日時段</p>
                  <p style={{ fontSize: "12px", marginTop: "-15px" }}>11:00-21:00</p>
                </div>
              }
              {...a11yProps(2)}
              sx={{ paddingLeft: "15px", paddingRight: "15px" }}
            />
            <Tab
              label={<div><p>預購</p></div>}
              {...a11yProps(3)}
              sx={{ paddingLeft: "15px", paddingRight: "15px" }}
            />
          </Tabs>
        </ThemeProvider>
      </Box>
      <CustomTabPanel
        menu={menuData}
        value={value}
        index={0}
        handleDishClick={handleDishClick}
      />
      <CustomTabPanel
        menu={menuData}
        value={value}
        index={1}
        handleDishClick={handleDishClick}
      />
      <CustomTabPanel
        menu={menuData}
        value={value}
        index={2}
        handleDishClick={handleDishClick}
      />
      <CustomTabPanel
        menu={menuData}
        value={value}
        index={3}
        handleDishClick={handleDishClick}
      />
    </Box>
  );
}
