const express = require('express');
const { restaurants, orders, sequelize } = require('../models')
const { Op } = require('sequelize');
const asyncHandler = require("express-async-handler");

exports.getYearlyReport = async (restaurantId, year, timeOfDay) => {
    
    let monthlySales = new Array(12).fill(0);

    // 建置查詢條件
    let whereClause = {
        restaurantId: restaurantId,
        orderTime: {
            [Op.gte]: new Date(`${year}-01-01`),
            [Op.lt]: new Date(`${year}-12-31`)
        }
        // 如果需要根據 timeOfDay 進一步過濾數據，在這裡添加條件
    };

    // 查詢訂單數據
    const ordersData = await orders.findAll({
        where: whereClause,
        attributes: [
            [sequelize.fn('month', sequelize.col('orderTime')), 'month'],
            [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalSales']
        ],
        group: [sequelize.fn('month', sequelize.col('orderTime'))]
    });

    // 每月銷售額統計
    ordersData.forEach(order => {
        let monthIndex = parseInt(order.getDataValue('month')) - 1;
        monthlySales[monthIndex] = parseFloat(order.getDataValue('totalSales'));
    });

    return monthlySales;

};

// 計算指定日期所在的週數（相對於月份）
function getWeekNumber(date) {
    let startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let firstDay = startOfMonth.getDay();
    let dayOffset = date.getDate() + firstDay - 1; // 計算從月初開始的天數偏移量
    return Math.floor(dayOffset / 7);
}

// 計算指定月份中的週數
function getWeeksInMonth(year, month) {
    let startOfMonth = new Date(year, month - 1, 1);
    let endOfMonth = new Date(year, month, 0);
    let firstDay = startOfMonth.getDay();
    let totalDays = endOfMonth.getDate();
    return Math.ceil((firstDay + totalDays) / 7);
}

exports.getMonthlyReport = async (restaurantId, year, month, timeOfDay) => {
    
    let weeksInMonth = getWeeksInMonth(year, month);
    let weeklySales = new Array(weeksInMonth).fill(0);

    let startDate = new Date(year, month - 1, 1);
    let endDate = new Date(year, month, 0);

    // 建置查詢條件
    let whereClause = {
        restaurantId: restaurantId,
        orderTime: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
        }
        // 如果需要根據 timeOfDay 進一步過濾數據，在這裡添加條件
    };

    // 查詢訂單數據
    const ordersData = await orders.findAll({
        where: whereClause,
        attributes: ['orderTime', 'totalPrice'],
    });

    // 每週銷售額統計
    for (let order of ordersData) {
        let weekIndex = getWeekNumber(order.orderTime);
        weeklySales[weekIndex] += order.totalPrice;
    }

    return weeklySales;

};

exports.getWeeklyReport = async (restaurantId, year, month, day, timeOfDay) => {
    
    let dailySales = new Array(7).fill(0);

    // 計算一週的開始和结束日期
    let endDate = new Date(Date.UTC(year, month - 1, day));
    endDate.setDate(endDate.getDate() + 1); // 由於時間是 00:00，因此加 1，確保 day 的當天被涵蓋到
    let startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7); // 一週的第一天（包含當天）

    console.log(startDate, endDate);

    let whereClause = {
        restaurantId: restaurantId,
        orderTime: {
            [Op.gte]: startDate,
            [Op.lte]: endDate
        }
        // 如果需要根據 timeOfDay 進一步過濾數據，在這裡添加條件
    };

    // 查詢訂單數據
    const ordersData = await orders.findAll({
        where: whereClause,
        attributes: [
            [sequelize.fn('date', sequelize.col('orderTime')), 'orderDate'],
            [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalSales']
        ],
        group: [sequelize.fn('date', sequelize.col('orderTime'))],
        order: [[sequelize.fn('date', sequelize.col('orderTime')), 'ASC']]
    });

    // 每週銷售額統計
    ordersData.forEach(order => {
        let orderDate = new Date(order.getDataValue('orderDate'));
        let dayIndex = orderDate.getDate() - startDate.getDate();
        dailySales[dayIndex] = parseFloat(order.getDataValue('totalSales'));
    });

    return dailySales;
};
