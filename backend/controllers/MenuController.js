const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const MenuService = require('../services/MenuService');

exports.addNewMenu = asyncHandler(async (req, res) => {
  try {
    const { restaurantId, menuName, menuType, menuTime } = req.body;
    const newMenuId = await MenuService.createNewMenu(restaurantId, menuName, menuType, menuTime);
    res.status(201).json({ success: true, data: newMenuId });
  } catch (error) {
    console.error('Error creating newMenu:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.showAllMenuDetails = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const menuDetails = await MenuService.getAllMenuDetails(restaurantId);
    res.status(200).json({ success: true, data: menuDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.processAllMenuDetails = asyncHandler(async (req, res) => {
  try {
    console.log('Received request with body:', req.body);

    const { menuId, menuName, menuTime, menuType, categories } = req.body;
    const result = await MenuService.processMenu(menuId, menuName, menuTime, menuType, categories);
    console.log('Processed result:', result);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error processing MenuDetails:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// exports.addNewMenuDetails = asyncHandler(async (req, res) => {
//   try {
//     console.log('Received request with body:', req.body);
//     const { menuId, categories } = req.body;
//     console.log('Extracted menuId:', menuId);
//     console.log('Extracted newCategories:', categories);
//     const result = await MenuService.createNewMenuDetails(menuId, categories);
//     console.log('Processed result:', result);
//     res.status(201).json(result);
//   } catch (error) {
//     console.error('Error creating newMenuDetails:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });
