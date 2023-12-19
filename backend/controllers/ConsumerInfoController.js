const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const ConsumerInfoService = require('../services/ConsumerInfoService');

exports.showInfo = asyncHandler(async (req, res, next) => {
    const consumerId = req.params.consumerId;
    consumerInfo = await ConsumerInfoService.showInfo(consumerId);
    res.json(consumerInfo);
});

exports.modifyInfo = asyncHandler(async (req, res, next) => {
    const consumerInfo = req.body;
    await ConsumerInfoService.modifyInfo(consumerInfo);
    res.status(200).end();
});