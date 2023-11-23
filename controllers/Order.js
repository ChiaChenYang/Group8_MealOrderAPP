const express = require('express');
const asyncHandler = require("express-async-handler");
const OrderService = require('../services/OrderService');

exports.getProgressingOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    all_orders = await OrderService.getOrdersWithStatus(restaurant_id, 'progressing');
    res.json(all_orders);
})