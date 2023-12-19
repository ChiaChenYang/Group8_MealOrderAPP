const express = require('express');
const { consumers, restaurants, orders, sequelize, Sequelize } = require('../models')
const { Op } = require('sequelize');
const asyncHandler = require("express-async-handler");

exports.getExpenseReport = async(consumerId, year, month) => {
    
    let MonthStartDate = new Date();
    MonthStartDate.setFullYear(year);
    MonthStartDate.setMonth(month - 1);
    MonthStartDate.setDate(1);
    MonthStartDate.setHours(8, 0, 0, 0);
    let MonthEndDate = new Date();
    MonthEndDate.setFullYear(year);
    MonthEndDate.setMonth(month);
    MonthEndDate.setDate(0);
    MonthEndDate.setHours(31, 59, 59, 999);;

    // console.log(MonthStartDate);
    // console.log(MonthEndDate);

    const historyOrders = await orders.findAll({
        include: [
            {
                model: restaurants,
                attributes: ['restaurantName']
            }
        ],
        attributes:[
            'orderId',
            'totalPrice',
            'completeTime'
        ],
        where: {
            consumerId: consumerId,
            completeTime: {
                [Sequelize.Op.between]: [MonthStartDate, MonthEndDate]
            }
        },
        order: [
            ['completeTime', 'DESC']
        ]
    });

    // console.log(historyOrders);

    let results = {};
    let historyOrderResults = {};
    results['user_id'] = consumerId;
    results['accumulate_fee'] = 0;
    // results['time'] = {'year': year, 'month': month};
    results['time'] = `${year}年${month}月`;

    for (const historyOrder of historyOrders) {
        let historyOrderResult = {};
        historyOrderResult['name'] = historyOrder.restaurant.dataValues.restaurantName;
        historyOrderResult['price'] = historyOrder.dataValues.totalPrice;
        // historyOrderResult['time'] = historyOrder.dataValues.completeTime;
        const dateObj = new Date(historyOrder.dataValues.completeTime);
        const month = dateObj.getMonth() + 1;
        const day = dateObj.getDate();
        const formattedDate = `${month}月${day}號`;
        historyOrderResult['time'] = formattedDate;
        historyOrderResults[historyOrder.dataValues.orderId] = historyOrderResult;
        results['accumulate_fee'] += historyOrder.dataValues.totalPrice;
    }

    results['history'] = historyOrderResults;

    return results;
};