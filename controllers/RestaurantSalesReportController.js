const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const RestaurantSalesReportService = require('../services/RestaurantSalesReportService');

exports.getYearlyReport = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    const { year, timeOfDay } = req.query;
    yearlyreport = await RestaurantSalesReportService.getYearlyReport(restaurantId, year, timeOfDay);
    res.json(yearlyreport);
});

exports.getMonthlyReport = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    const { year, month, timeOfDay } = req.query;
    monthlyreport = await RestaurantSalesReportService.getMonthlyReport(restaurantId, year, month, timeOfDay);
    res.json(monthlyreport);
});

exports.getＷeeklyReport = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    const { year, month, day, timeOfDay } = req.query;
    weeklyreport = await RestaurantSalesReportService.getWeeklyReport(restaurantId, year, month, day, timeOfDay);
    res.json(weeklyreport);
});

exports.getDailyReport = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    const { year, month, day, timeOfDay } = req.query;
    dailyreport = await RestaurantSalesReportService.getDailyReport(restaurantId, year, month, day, timeOfDay);
    res.json(dailyreport);
});

exports.getHistoryRating = asyncHandler(async (req, res, next) => {
    const restaurantId = req.params.restaurantId;
    restauranthistoryrating = await RestaurantSalesReportService.getHistoryRating(restaurantId);
    res.json(restauranthistoryrating);
});