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

exports.setReservationTime = asyncHandler(async (req, res, next) => {
    const user_id = req.body.user_id;
    const shop_id = req.body.shop_id;
    const estimate_time_hour = req.body.estimate_time_hour;
    const estimate_time_minute = req.body.estimate_time_minute;
    await ShoppingCartService.setReservationTime(user_id, shop_id, estimate_time_hour, estimate_time_minute);
    res.status(200).end();
})

exports.checkout = asyncHandler(async (req, res, next) => {
    const user_id = req.body.user_id;
    const shop_id = req.body.shop_id;
    const new_order = await ShoppingCartService.checkout(user_id, shop_id);
    res.json(new_order);
});

exports.getCartInfo = asyncHandler(async (req, res, next) => {
    const user_id = req.body.user_id;
    const shop_id = req.body.shop_id;
    const cart_info = await ShoppingCartService.getCartInfo(user_id, shop_id);
    res.json(cart_info);
});