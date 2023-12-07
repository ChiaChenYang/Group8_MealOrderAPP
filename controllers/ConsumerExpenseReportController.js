const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const ConsumerExpenseReportService = require('../services/ConsumerExpenseReportService');

exports.getExpenseReport = asyncHandler(async (req, res, next) => {
    const consumerId = req.params.consumerId;
    const { year, month } = req.query;
    expensereport = await ConsumerExpenseReportService.getExpenseReport(consumerId, year, month);
    res.json(expensereport);
});