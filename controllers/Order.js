const express = require('express');
const asyncHandler = require("express-async-handler");
const OrderService = require('../services/OrderService');

exports.getProgressingOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    all_orders = await OrderService.getOrdersWithStatus(restaurant_id, 'progressing');
    res.json(all_orders);
});

exports.getIncomingOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    all_orders = await OrderService.getOrdersWithStatus(restaurant_id, 'incoming');
    res.json(all_orders);
});

exports.getWaitingOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    all_orders = await OrderService.getOrdersWithStatus(restaurant_id, 'waiting');
    res.json(all_orders);
});

exports.getCompletedOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    all_orders = await OrderService.getOrdersWithStatus(restaurant_id, 'completed');
    res.json(all_orders);
});

exports.acceptOrder = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    await OrderService.updateOrderStatus(order_id, 'incoming', 'progressing');
    res.status(200).end();
});

exports.finishPreparingOrder = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    await OrderService.updateOrderStatus(order_id, 'progressing', 'waiting');
    res.status(200).end();
});

exports.completeOrder = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    await OrderService.updateOrderStatus(order_id, 'waiting', 'completed');
    res.status(200).end();
});

exports.rejectOrder = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    await OrderService.updateOrderStatus(order_id, 'incoming', 'rejected');
    res.status(200).end();
});