"use client";

import React from "react";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Toolbar from "@mui/material/Toolbar";

import AppNews from "@/components/Home/AppNews";
import CustomDrawer from "@/components/Home/HomeDrawer";

const cardData = [
  {
    title: "訂單管理",
    description:
      "新訂單：選擇是否接受訂單\n進行中：可以延時或者取消訂單\n等待取餐：餐點準備完成\n已完成：可察看歷史訂單",
    buttonText: "開始管理你的訂單",
    image: "https://i.imgur.com/9nOgcvE.png",
  },
  {
    title: "菜單管理",
    description:
      "概覽：在營業前，速覽一下菜單吧\n菜單：可新增菜單或編輯訂單\n品項控管：管理販售中以及暫停販售的品項",
    buttonText: "新建你的第一份菜單",
    image: "https://i.imgur.com/I0FKX9P.png",
  },
  {
    title: "營運管理",
    description:
      "基本資訊：讓消費者更了解你吧，完成填寫才能開始營運喔\n月結餐費：查看本月以及過往銷售額\n歷史評價：查看本月以及過往評價",
    buttonText: "看看本月表現如何吧",
    image: "https://i.imgur.com/u8cpKMi.png",
  },
];

export default function Home() {
  return (
    <Box className="flex h-full bg-white">
      <Box className="flex" sx={{ width: 322 }}>
        <CustomDrawer activePage={"首頁"} />
      </Box>

      <Box component="main" className="flex flex-col">
        <AppBar color="primary" sx={{ height: "130px" }}>
          <Toolbar></Toolbar>
        </AppBar>
        <Box className="mt-[160px] flex flex-1 flex-col items-center">
          <AppNews />

          <Box
            sx={{
              height: "75%",
              width: "100%",
              overflow: "visible",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: 7,
              mt: 1,
            }}
          >
            <Box className="mt-16 flex h-full w-full justify-between">
              {cardData.map((card, index) => (
                <Card
                  key={index}
                  className="relative mx-3 mb-1 h-[267px] flex-1"
                  sx={{
                    overflow: "visible",
                    ...(index === 0 && { marginRight: "auto" }),
                    ...(index === 1 && { marginX: "auto" }),
                    ...(index === 2 && { marginLeft: "auto" }),
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "primary.main",
                      height: "20%",
                      position: "relative",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        width: "100px",
                        height: "100px",
                        position: "absolute",
                        top: -48,
                        right: 10,
                      }}
                      image={card.image}
                      alt={card.title}
                    />
                  </Box>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="font-black"
                    >
                      {card.title}
                    </Typography>
                    {card.description.split("\n").map((line, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        color="text.secondary"
                        component="div"
                        className="mt-1 font-bold"
                      >
                        {line}
                      </Typography>
                    ))}
                  </CardContent>

                  <CardActions className="absolute bottom-0 right-0 ">
                    <Button size="small" color="primary">
                      {card.buttonText}
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
