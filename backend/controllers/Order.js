const express = require('express');
const asyncHandler = require("express-async-handler");
const OrderService = require('../services/OrderService');

exports.getProgressingOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    const all_orders = await OrderService.getOrdersWithStatus(restaurant_id, 'progressing');
    res.json(all_orders);
});

exports.getIncomingOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    const all_orders = await OrderService.getOrdersWithStatus(restaurant_id, 'incoming');
    res.json(all_orders);
});

exports.getWaitingOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    const all_orders = await OrderService.getOrdersWithStatus(restaurant_id, 'waiting');
    res.json(all_orders);
});

exports.getCompletedOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    const all_orders = await OrderService.getOrdersWithStatus(restaurant_id, 'completed');
    res.json(all_orders);
});

exports.acceptOrder = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    const consumer_id = await OrderService.updateOrderStatus(order_id, 'incoming', 'progressing');
    await OrderService.updateSoldQuantity(order_id);
    const message = await OrderService.getOrderStateChangeMessage(order_id);
    /*res.io.on('connection', async (socket) => {
        if (socket.handshake.auth.user_id === consumer_id) {
            socket.emit('order state message', message);
        }
    });*/
    console.log(`send order state message to user ${consumer_id}`);
    res.io.emit(`${consumer_id} order state message`, message);
    res.status(200).end();
});

exports.finishPreparingOrder = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    const consumer_id = await OrderService.updateOrderStatus(order_id, 'progressing', 'waiting');
    const message = await OrderService.getOrderStateChangeMessage(order_id);
    console.log(`send order state message to user ${consumer_id}`);
    res.io.emit(`${consumer_id} order state message`, message);
    res.status(200).end();
});

exports.completeOrder = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    const consumer_id = await OrderService.updateOrderStatus(order_id, 'waiting', 'completed');
    const message = await OrderService.getOrderStateChangeMessage(order_id);
    console.log(`send order state message to user ${consumer_id}`);
    res.io.emit(`${consumer_id} order state message`, message);
    res.status(200).end();
});

exports.rejectOrder = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    const consumer_id = await OrderService.updateOrderStatus(order_id, 'incoming', 'rejected');
    const message = await OrderService.getOrderStateChangeMessage(order_id);
    console.log(`send order state message to user ${consumer_id}`);
    res.io.emit(`${consumer_id} order state message`, message);
    res.status(200).end();
});

exports.delayOrder = asyncHandler(async (req, res, next) => {
    const delayed_order = req.body;
    const order_id = parseInt(delayed_order.orderId);
    const delay_time = parseInt(delayed_order.delayTime);
    const consumer_id = await OrderService.delayOrder(order_id, delay_time);
    res.status(200).end();
});

exports.getSingleOrder = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    const retrieved_order = await OrderService.getSingleOrder(order_id);
    res.json(retrieved_order);
});

exports.getHistoryOrders = asyncHandler(async (req, res, next) => {
    const restaurant_id = parseInt(req.params.id);
    const retrieved_orders = await OrderService.getHistoryOrders(restaurant_id);
    res.json(retrieved_orders);
});

exports.getCurrentOrdersForConsumer = asyncHandler(async (req, res, next) => {
    const consumer_id = parseInt(req.params.id);
    const retrieved_orders = await OrderService.getCurrentOrdersForConsumer(consumer_id);
    res.json(retrieved_orders);
});

exports.getOrderState = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    const order_state = await OrderService.getOrderState(order_id);
    res.json(order_state);
});

exports.getRestaurantInfo = asyncHandler(async (req, res, next) => {
    const order_id = parseInt(req.params.id);
    const restaurant_info = await OrderService.getRestaurantInfo(order_id);
    res.json(restaurant_info);
});

exports.setOrderRating = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const order_id = req.body.id;
    const rating = req.body.star;
    const comment = req.body.comment;
    await OrderService.setOrderRating(order_id, rating, comment);
    res.status(200).end();
});