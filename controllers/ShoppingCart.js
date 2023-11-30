const express = require('express');
const asyncHandler = require("express-async-handler");
const OrderService = require('../services/OrderService');
const ShoppingCartService = require('../services/ShoppingCartService');

exports.getShoppingCartsForUser = asyncHandler(async (req, res, next) => {
    const user_id = parseInt(req.params.id);
    all_carts = await ShoppingCartService.getShoppingCartsForUser(user_id);
    res.json(all_carts);
});