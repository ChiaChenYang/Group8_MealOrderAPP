const express = require('express');
const { restaurants, categories, restaurantlatestnews } = require('../models')
const asyncHandler = require("express-async-handler");

exports.getRestaurantInfo = async (restaurantId) => {
    const restaurantInfo = await restaurants.findByPk(restaurantId, {
        include: [
            {
                model: categories,
                through: { attributes: [] },
                attributes: ['categoryName']
            },
            {
                model: restaurantlatestnews,
                attributes: ['newsContent']
            }
        ]
    });

    if (!restaurantInfo) {
        return 'restaurantInfo 出現錯誤';
    }

    // 建立所需的格式
    const formattedRestaurantInfo = {
        restaurantId: restaurantInfo.restaurantId,
        restaurantName: restaurantInfo.restaurantName,
        restaurantType: restaurantInfo.categories.map(category => category.categoryName).join(', '),
        telephoneNumber: restaurantInfo.restaurantPhone,
        factoryLocation: restaurantInfo.factoryLocation,
        restaurantLocation: restaurantInfo.restaurantLocation,
        latestNews: restaurantInfo.restaurantlatestnews.map(news => news.newsContent),
        isOpening: restaurantInfo.isOpening == 1,
        startDate: restaurantInfo.stationStartDate,
        endDate: restaurantInfo.stationEndDate,
        // logo: restaurantInfo.restaurantImage,
        prepareTime: restaurantInfo.prepareTime
    };

    console.log("Formatted Restaurant Info:", JSON.stringify(formattedRestaurantInfo, null, 2));
    return formattedRestaurantInfo;
};