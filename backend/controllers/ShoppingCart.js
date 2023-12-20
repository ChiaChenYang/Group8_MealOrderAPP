const express = require('express');
const asyncHandler = require("express-async-handler");
const OrderService = require('../services/OrderService');
const ShoppingCartService = require('../services/ShoppingCartService');

exports.getShoppingCartsForUser = asyncHandler(async (req, res, next) => {
    const user_id = parseInt(req.params.id);
    const all_carts = await ShoppingCartService.getShoppingCartsForUser(user_id);
    res.json(all_carts);
});

exports.addItemToCart = asyncHandler(async (req, res, next) => {
    await ShoppingCartService.addItemToCart(req.body);
    res.status(200).end();
});

exports.addNoteAndSyncCartItems = asyncHandler(async (req, res, next) => {
    const user_id = req.body.user_id;
    const shop_id = req.body.shop_id;
    const items = req.body.items;
    const note = req.body.addition;
    await ShoppingCartService.addNote(user_id, shop_id, note);
    await ShoppingCartService.syncAllCartItems(user_id, shop_id, items);
    res.status(200).end();
});

exports.setReservationTimeAndCheckout = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const user_id = req.body.user_id;
    const shop_id = req.body.shop_id;
    const pick_up_method = req.body.pick_up_meals;
    const estimate_time_month = req.body.estimate_time_month;
    const estimate_time_date = req.body.estimate_time_date;
    const estimate_time_hour = req.body.estimate_time_hour;
    const estimate_time_minute = req.body.estimate_time_minute;

    // set reservation time
    await ShoppingCartService.setReservationTime(user_id, shop_id, pick_up_method, 
        estimate_time_month, estimate_time_date, estimate_time_hour, estimate_time_minute);

    // create order
    const new_order = await ShoppingCartService.checkout(user_id, shop_id);

    // inform the restaurant
    const incoming_orders = await OrderService.getOrdersWithStatus(shop_id, 'incoming');
    res.io.emit(`${shop_id} incoming orders`, incoming_orders);
    console.log(`send new orders to restaurant ${shop_id}`);

    // respond to the consumer
    res.json(new_order);
    res.status(200).end();
});

exports.getCartInfo = asyncHandler(async (req, res, next) => {
    const user_id = req.params.user_id;
    const shop_id = req.params.shop_id;
    const cart_info = await ShoppingCartService.getCartInfo(user_id, shop_id);
    res.json(cart_info);
});

exports.getCartInfoToCheckout = asyncHandler(async (req, res, next) => {
    const user_id = req.params.user_id;
    const shop_id = req.params.shop_id;
    var cart_info = await ShoppingCartService.getCartInfoToCheckout(user_id, shop_id);

    // get rating information
    const rating_info = await OrderService.getRatingInfo(shop_id);
    cart_info.evaluation = rating_info.evaluation;
    cart_info.comment = rating_info.comment;
    res.json(cart_info);
});