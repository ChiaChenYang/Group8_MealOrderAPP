import React from "react";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  const isSelected = (path) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ width: "100%", borderTop: "5px solid rgb(240, 240, 240)" }}>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={
            <HomeIcon
              sx={{ color: isSelected("/main") ? "#35A996" : "black" }}
            />
          }
          component={Link}
          to="/main"
          sx={{ color: "#35A996" }}
        />
        <BottomNavigationAction
          label="shop"
          icon={
            <ShoppingCartIcon
              sx={{ color: isSelected("/shopping") ? "#35A996" : "black" }}
            />
          }
          component={Link}
          to="/shopping"
          sx={{ color: "#35A996" }}
        />
        <BottomNavigationAction
          label="history"
          icon={
            <StickyNote2Icon
              sx={{ color: isSelected("/history") ? "#35A996" : "black" }}
            />
          }
          component={Link}
          to="/history"
          sx={{ color: "#35A996" }}
        />
        <BottomNavigationAction
          label="home"
          icon={
            <AccountCircleIcon
              sx={{ color: isSelected("/home") ? "#35A996" : "black" }}
            />
          }
          component={Link}
          to="/home"
          sx={{ color: "#35A996" }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default Navbar;
