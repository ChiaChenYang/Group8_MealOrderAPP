const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const ItemManagementService = require('../services/ItemManagementService');

exports.showSellingItems = asyncHandler(async (req, res) => {
  try {
    const { menuId } = req.params;
    const result = await ItemManagementService.getSellingItems(menuId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.showPausingItems = asyncHandler(async (req, res) => {
  try {
    const { menuId } = req.params;
    const result = await ItemManagementService.getPausingItems(menuId);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.updateItem = asyncHandler(async (req, res) => {
  try {
    const { itemId, isSelling, totalNumber } = req.body;
    // 檢查必要的參數
    if (!itemId || isSelling === undefined || !totalNumber) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }
    const updatedItems = await ItemManagementService.modifyItem(itemId, isSelling, totalNumber);
    return res.json({ success: true, data: updatedItems });
  } catch (error) {
    console.error('Error modifying item:', error);
    return res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
}); 
