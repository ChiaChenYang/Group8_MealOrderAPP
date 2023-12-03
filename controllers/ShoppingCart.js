const express = require('express');
const asyncHandler = require("express-async-handler");
const OrderService = require('../services/OrderService');
const ShoppingCartService = require('../services/ShoppingCartService');

exports.getShoppingCartsForUser = asyncHandler(async (req, res, next) => {
    const user_id = parseInt(req.params.id);
    all_carts = await ShoppingCartService.getShoppingCartsForUser(user_id);
    res.json(all_carts);
});

exports.addItemToCart = asyncHandler(async (req, res, next) => {
    await ShoppingCartService.addItemToCart(req.body);
    res.status(200).end();
});

exports.addNote = asyncHandler(async (req, res, next) => {
    const user_id = req.body.user_id;
    const shop_id = req.body.shop_id;
    const note = req.body.addition;
    await ShoppingCartService.addNote(user_id, shop_id, note);
    res.status(200).end();
});