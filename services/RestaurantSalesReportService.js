const express = require('express');
const { restaurants, orders, sequelize, Sequelize } = require('../models')
const { Op } = require('sequelize');
const asyncHandler = require("express-async-handler");

exports.getYearlyReport = async (restaurantId, year, timeOfDay) => {
    let monthlySales = new Array(12).fill(0);

    // 根據 timeOfDay 設置額外的時間範圍
    let timeConstraints = {};
    switch (timeOfDay) {
        case 'afternoon':
            timeConstraints = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '>=', 11),
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '<', 17)
                ]
            };
            break;
        case 'night':
            timeConstraints = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '>=', 17),
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '<', 21)
                ]
            };
            break;
        // 'all' 或其他情況不需要額外時間範圍
        default:
            // 設置每天的時間範圍為 11:00 到 21:00
            timeConstraints = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '>=', 11),
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '<', 21)
                ]
            };
            break;
    }

    // 建置查詢條件，包括指定的年份和時間範圍
    let whereClause = {
        restaurantId: restaurantId,
        orderTime: {
            [Op.gte]: new Date(`${year}-01-01`),
            [Op.lt]: new Date(`${year}-12-31`),
            ...timeConstraints
        }
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
    return Math.ceil(date.getDate() / 7);
}

// 計算指定月份中的週數
function getWeeksInMonth(year, month) {
    let endOfMonth = new Date(year, month, 0);
    return Math.ceil(endOfMonth.getDate() / 7);
}

exports.getMonthlyReport = async (restaurantId, year, month, timeOfDay) => {
    let weeksInMonth = getWeeksInMonth(year, month);
    let weeklySales = new Array(weeksInMonth).fill(0);

    let startDate = new Date(Date.UTC(year, month - 1, 1));
    let endDate = new Date(Date.UTC(year, month, 0));

    console.log(startDate);
    console.log(endDate);

    // 根據 timeOfDay 設置額外的時間範圍
    let timeConstraints = {};
    switch (timeOfDay) {
        case 'afternoon':
            timeConstraints = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '>=', 11),
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '<', 17)
                ]
            };
            break;
        case 'night':
            timeConstraints = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '>=', 17),
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '<', 21)
                ]
            };
            break;
        // 'all' 或其他情況不需要額外時間範圍
        default:
            // 設置每天的時間範圍為 11:00 到 21:00
            timeConstraints = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '>=', 11),
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '<', 21)
                ]
            };
            break;
    }

    // 建置查詢條件
    let whereClause = {
        restaurantId: restaurantId,
        orderTime: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
            ...timeConstraints
        }
    };

    whereClause.orderTime[Op.and].push(
        sequelize.where(sequelize.fn('year', sequelize.col('orderTime')), year)
    );

    whereClause.orderTime[Op.and].push(
        sequelize.where(sequelize.fn('month', sequelize.col('orderTime')), month)
    );

    console.log(whereClause);

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

    console.log(ordersData);

    // 每週銷售額統計
    ordersData.forEach(order => {
        let orderDate = new Date(order.getDataValue('orderDate'));
        let weekIndex = getWeekNumber(orderDate) - 1;
        if (weekIndex >= 0 && weekIndex < weeklySales.length) {
            weeklySales[weekIndex] += parseFloat(order.getDataValue('totalSales'));
        }
    });

    return weeklySales;
};

exports.getWeeklyReport = async (restaurantId, year, month, day, timeOfDay) => {
    let dailySales = new Array(7).fill(0);

    // 計算一週的開始和結束日期
    let endDate = new Date(Date.UTC(year, month - 1, day));
    endDate.setDate(endDate.getDate() + 1); // 確保包含當天
    let startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 7);

    // 根據 timeOfDay 設置額外的時間範圍
    let timeConstraints = {};
    switch (timeOfDay) {
        case 'afternoon':
            // 設置每天的時間範圍為 11:00 到 17:00
            timeConstraints = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '>=', 11),
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '<', 17)
                ]
            };
            break;
        case 'night':
            // 設置每天的時間範圍為 17:00 到 21:00
            timeConstraints = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '>=', 17),
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '<', 21)
                ]
            };
            break;
        // 'all' 或其他情況不需要額外時間範圍
        default:
            // 設置每天的時間範圍為 11:00 到 21:00
            timeConstraints = {
                [Op.and]: [
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '>=', 11),
                    sequelize.where(sequelize.fn('hour', sequelize.col('orderTime')), '<', 21)
                ]
            };
            break;
    }

    let whereClause = {
        restaurantId: restaurantId,
        orderTime: {
            [Op.gte]: startDate,
            [Op.lte]: endDate,
            ...timeConstraints // 添加時間範圍限制
        }
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
        let dayIndex = Math.floor((orderDate - startDate) / (24 * 60 * 60 * 1000));
        if (dayIndex >= 0 && dayIndex < 7) {
            dailySales[dayIndex] = parseFloat(order.getDataValue('totalSales'));
        }
    });

    return dailySales;
};



exports.getDailyReport = async (restaurantId, year, month, day, timeOfDay) => {
    let hourlySales;
    let startTime, endTime;

    // 計算特定日期
    let targetDate = new Date(Date.UTC(year, month - 1, day));

    // 根據 timeOfDay 設置查詢的時間範圍和初始化 hourlySales
    switch (timeOfDay) {
        case 'afternoon':
            hourlySales = new Array(6).fill(0); // 11:00 到 17:00，共 6 小時
            startTime = new Date(targetDate.getTime() + (11 * 60 * 60 * 1000)); // 11:00
            endTime = new Date(targetDate.getTime() + (17 * 60 * 60 * 1000)); // 17:00
            break;
        case 'night':
            hourlySales = new Array(4).fill(0); // 17:00 到 21:00，共 4 小時
            startTime = new Date(targetDate.getTime() + (17 * 60 * 60 * 1000)); // 17:00
            endTime = new Date(targetDate.getTime() + (21 * 60 * 60 * 1000)); // 21:00
            break;
        // 其他案例...
        default:
            hourlySales = new Array(10).fill(0); // 11:00 到 21:00，共 10 小時整天
            startTime = new Date(targetDate.getTime() + (11 * 60 * 60 * 1000)); // 11:00
            endTime = new Date(targetDate.getTime() + (21 * 60 * 60 * 1000)); // 17:00
            break;
    }

    // 構建查詢條件
    let whereClause = {
        restaurantId: restaurantId,
        orderTime: {
            [Op.gte]: startTime,
            [Op.lt]: endTime
        }
    };

    // 查詢訂單數據
    const ordersData = await orders.findAll({
        where: whereClause,
        attributes: [
            [sequelize.fn('hour', sequelize.col('orderTime')), 'orderHour'],
            [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalSales']
        ],
        group: [sequelize.fn('hour', sequelize.col('orderTime'))],
        order: [[sequelize.fn('hour', sequelize.col('orderTime')), 'ASC']]
    });

    // 處理每小時的銷售數據
    ordersData.forEach(order => {
        let orderHour = order.getDataValue('orderHour');
        let hourIndex = orderHour - startTime.getUTCHours(); // 計算索引
        if (hourIndex >= 0 && hourIndex < hourlySales.length) {
            hourlySales[hourIndex] = parseFloat(order.getDataValue('totalSales'));
        }
    });

    return hourlySales;
};

exports.getHistoryRating = async (restaurantId) => {
    // history rating, last month rating, present month rating
    let currentDate = new Date();
    currentDate = currentDate.setHours(currentDate.getHours()+8);

    // 計算上個月的日期範圍
    let lastMonthStartDate = new Date(currentDate);
    lastMonthStartDate.setMonth(lastMonthStartDate.getMonth() - 1, 1);
    lastMonthStartDate.setHours(8, 0, 0, 0);
    let lastMonthEndDate = new Date(currentDate);
    lastMonthEndDate.setDate(0);
    lastMonthEndDate.setHours(31, 59, 59, 999);

    // 計算當月的日期範圍
    let currentMonthStartDate = new Date(currentDate);
    currentMonthStartDate.setDate(1);
    currentMonthStartDate.setHours(8, 0, 0, 0);
    let currentMonthEndDate = new Date(currentDate);
    currentMonthEndDate.setMonth(currentMonthEndDate.getMonth() + 1, 0);
    currentMonthEndDate.setHours(31, 59, 59, 999);


    try {
        // 計算歷史評價
        const historyRating = await orders.findAll({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('orderRating')), 'avgRating']
            ],
            where: {
                restaurantId: restaurantId,
                completeTime: {
                    [Sequelize.Op.lte]: currentDate
                }
            }
        });

        // 計算上個月評價
        const lastMonthRating = await orders.findAll({
            attributes: [
                [Sequelize.fn('AVG', Sequelize.col('orderRating')), 'avgRating']
            ],
            where: {
                restaurantId: restaurantId,
                completeTime: {
                    [Sequelize.Op.between]: [lastMonthStartDate, lastMonthEndDate]
                }
            }
        });

        // 計算這個月評價
        const currentMonthRating = await orders.findAll({
            attributes: [
                [sequelize.fn('AVG', sequelize.col('orderRating')), 'avgRating']
            ],
            where: {
                restaurantId: restaurantId,
                completeTime: {
                    [Sequelize.Op.between]: [currentMonthStartDate, currentMonthEndDate]
                }
            }
        });

        const historyRatingValue = historyRating[0].dataValues.avgRating || 0;
        const lastMonthRatingValue = lastMonthRating[0].dataValues.avgRating || 0;
        const currentMonthRatingValue = currentMonthRating[0].dataValues.avgRating || 0;

        // 四捨五入到小數點第二位
        const roundedHistoryRating = parseFloat(historyRatingValue.toFixed(2));
        const roundedLastMonthRating = parseFloat(lastMonthRatingValue.toFixed(2));
        const roundedCurrentMonthRating = parseFloat(currentMonthRatingValue.toFixed(2));

        return [
            roundedHistoryRating, 
            roundedLastMonthRating, 
            roundedCurrentMonthRating
        ];

    } catch (error) {
        console.log(error);
        throw error;
    }

};
