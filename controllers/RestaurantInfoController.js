const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const RestaurantsInfoService = require('../services/RestaurantInfoService');

// exports.modifyRestaurantInfo = asyncHandler(async (req, res, next) => {
//     const newUser = req.body;
//     await RestaurantsInfoModel.createUserCredential(newUser);
//     res.status(200).end()
// });

exports.createInfo = asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    restaurantInfo = req.body;
    await RestaurantsInfoService.createRestaurantInfo(restaurantInfo);
    res.status(200).end();
});

exports.modifyInfo = asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    restaurantInfo = req.body;
    await RestaurantsInfoService.modifyRestaurantInfo(restaurantInfo);
    res.status(200).end();
});

exports.showInfo = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    restaurantinfo = await RestaurantsInfoService.getRestaurantInfo(restaurantId);
    res.json(restaurantinfo);
});

exports.showInfoStatus = asyncHandler(async(req, res, next) => {
    const restaurantId = req.params.restaurantId;
    restaurantinfostatus = await RestaurantsInfoService.showInfoStatus(restaurantId);
    res.json(restaurantinfostatus);
});