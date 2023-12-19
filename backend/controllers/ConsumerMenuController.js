const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const ConsumerMenuService = require('../services/ConsumerMenuService');

exports.showSingleItemDetails = asyncHandler(async (req, res) => {
  const { itemId } = req.params;
  try {
    const SingleItemDetails = await ConsumerMenuService.getSingleItem(itemId);
    res.status(200).json({ success: true, data: SingleItemDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

exports.showAllMenuDetailsForConsumer = asyncHandler(async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const menuDetails = await ConsumerMenuService.getAllMenuDetailsForConsumer(restaurantId);
    res.status(200).json({ success: true, data: menuDetails });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

