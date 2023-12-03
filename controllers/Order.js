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
    await OrderService.updateSoldQuantity(order_id);
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

exports.delayOrder = asyncHandler(async (req, res, next) => {
    const delayed_order = req.body;
    const order_id = parseInt(delayed_order.orderId);
    const delay_time = parseInt(delayed_order.delayTime);
    await OrderService.delayOrder(order_id, delay_time);
    res.status(200).end();
});

exports.getSingleOrder = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    retrieved_order = await OrderService.getSingleOrder(order_id);
    res.json(retrieved_order);
});

exports.getHistoryOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    retrieved_orders = await OrderService.getHistoryOrders(restaurant_id);
    res.json(retrieved_orders);
});

exports.getCurrentOrdersForConsumer = asyncHandler(async (req, res, next) => {
    const consumer_id = parseInt(req.params.id);
    retrieved_orders = await OrderService.getCurrentOrdersForConsumer(consumer_id);
    res.json(retrieved_orders);
});