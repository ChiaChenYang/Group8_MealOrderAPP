"use client";

import React from "react";

import { usePathname } from "next/navigation";

import { InsertChartOutlined, ArrowBack } from "@mui/icons-material";
import {
  Drawer,
  List,
  ListItem,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function MenuManagementDrawer() {
  const theme = useTheme();
  const pathname = usePathname();
  const pageName = pathname.split("/").slice(-1)[0];
  const pageNames = ["overview", "menus", "items-control"];
  const getButtonVariant = (index: number) =>
    pageName === pageNames[index] ? "contained" : "text";
  return (
    <Drawer
      variant="permanent"
      className="flex w-full items-center justify-center"
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        [`& .MuiDrawer-paper`]: {
          justifyContent: "space-around",
          width: "21%",
          boxSizing: "border-box",
          top: 0,
          backgroundColor: theme.palette.background.default,
        },
      }}
    >
      <Box className="flex items-center px-4 py-8">
        <IconButton
          component="a"
          href="/home"
          sx={{
            marginRight: theme.spacing(1),
            color: theme.palette.text.secondary,
          }}
        >
          <ArrowBack />
        </IconButton>
      </Box>

      <Box className="my-3 flex items-center justify-center">
        <InsertChartOutlined sx={{ fontSize: 40, mr: 1 }} />
        <Typography variant="h4" fontWeight="bold" align="center">
          菜單管理
        </Typography>
      </Box>

      <Box className="mb-[200px] flex h-full flex-col justify-center">
        <List>
          {["概覽", "菜單", "品項控管"].map((text, index) => (
            <ListItem key={text} disablePadding className="my-2 flex-1">
              <Box className="w-full" sx={{ padding: theme.spacing(2) }}>
                <Button
                  className="rounded-2xl px-2 py-3 text-2xl"
                  href={`/menus-management/${pageNames[index]}`}
                  variant={getButtonVariant(index)}
                  fullWidth
                  sx={{
                    ...(getButtonVariant(index) === "contained" && {
                      color: "white",
                      backgroundColor: `${theme.palette.primary.main} !important`,
                      "&:hover": {
                        backgroundColor: `${theme.palette.primary.main} !important`,
                      },
                    }),
                    ...(getButtonVariant(index) === "text" && {
                      color: `${theme.palette.text.secondary} !important`,
                    }),
                  }}
                >
                  {text}
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}
