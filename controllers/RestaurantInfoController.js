const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const RestaurantsInfoService = require('../services/RestaurantInfoService');

// exports.modifyRestaurantInfo = asyncHandler(async (req, res, next) => {
//     const newUser = req.body;
//     await RestaurantsInfoModel.createUserCredential(newUser);
//     res.status(200).end()
// });

exports.showInfo = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    restaurantinfo = await RestaurantsInfoService.getRestaurantInfo(restaurantId);
    res.json(restaurantinfo);
});