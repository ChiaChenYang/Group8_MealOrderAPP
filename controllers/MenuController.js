const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const MenuService = require('../services/MenuService');

exports.addNewMenu = asyncHandler(async (req, res) => {
  try {
    const { restaurantId, menuName, menuType, menuTime } = req.body;
    // 調用服務層的方法處理新增 newMenu
    const newMenuId = await MenuService.createNewMenu(restaurantId, menuName, menuType, menuTime);
    // 回傳新增的菜單的 ID
    res.status(201).json({ success: true, data: newMenuId });
  } catch (error) {
    console.error('Error creating newMenu:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// exports.addNewMenuDetails = asyncHandler(async (req, res) => {
//   try {
//     console.log('Received request with body:', req.body);

//     const { menuId, categories } = req.body;
//     console.log('Extracted menuId:', menuId);
//     console.log('Extracted newCategories:', categories);

//     // 調用服務層的方法處理新增 newMenuDetails
//     const result = await MenuService.createNewMenuDetails(menuId, categories);
//     console.log('Processed result:', result);

//     // 回傳新增的菜單的 ID 和新增的 item ID 陣列
//     res.status(201).json(result);
//   } catch (error) {
//     console.error('Error creating newMenuDetails:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

exports.showAllMenuDetails = asyncHandler(async (req, res) => {
  // 從請求中取得 restaurantId query 中
  const { restaurantId } = req.params;

  try {
    // 調用服務層的方法處理新增 getAllMenuDetails 取得菜單詳細資訊
    const menuDetails = await MenuService.getAllMenuDetails(restaurantId);
    // 回傳成功的回應給客戶端
    res.status(200).json({ success: true, data: menuDetails });
  } catch (error) {
    // 如果發生錯誤，回傳錯誤的回應給客戶端
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.processAllMenuDetails = asyncHandler(async (req, res) => {
  try {
    console.log('Received request with body:', req.body);

    const { menuId, categories } = req.body;
    console.log('Extracted menuId:', menuId);
    console.log('Extracted newCategories:', categories);
    const result = await MenuService.processMenu(menuId, categories);
    console.log('Processed result:', result);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error processing MenuDetails:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});
