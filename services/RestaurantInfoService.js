const express = require('express');
const { restaurants, categories, restaurantlatestnews, orders, Sequelize, sequelize } = require('../models')
const asyncHandler = require("express-async-handler");

exports.createRestaurantInfo = async(restaurantInfo) => {
    try {
        // console.log(restaurantInfo);
        const { 
                restaurantName, 
                restaurantType, 
                restaurantLocation, 
                latestNews, 
                isOpening, 
                startDate, 
                endDate, 
                logo,
                prepareTime,
                // 其他欄位
                ownerId, 
                factoryLocation,
                restaurantPhone,
                restaurantMail,
                serviceMethod,
                isorderAvailable,
                istemporaryRestaurant,
                // rating,
            } = restaurantInfo;
    
        // 檢查 restaurantType 是否是字符串，如果是，則轉換為列表
        const types = Array.isArray(restaurantType) ? restaurantType : [restaurantType];

        // 檢查 latestNews 是否是字符串，如果是，則轉換為列表
        const latestnews = Array.isArray(latestNews) ? latestNews : [latestNews];
        
        // 創建新的餐廳
        const newRestaurant = await restaurants.create({
            restaurantName: restaurantName,
            restaurantLocation: restaurantLocation,
            isOpening: isOpening,
            stationStartDate: new Date(startDate),
            stationEndDate: new Date(endDate),
            restaurantImage: logo,
            prepareTime: prepareTime,
            // 其他欄位
            ownerId: ownerId, 
            factoryLocation: factoryLocation,
            restaurantPhone: restaurantPhone,
            restaurantMail: restaurantMail,
            serviceMethod: serviceMethod,
            isorderAvailable: isorderAvailable,
            istemporaryRestaurant: istemporaryRestaurant,
            rating: 0
        });
        // 處理最新消息
        let currentDate = new Date();
        currentDate = currentDate.setHours(currentDate.getHours()+8);
        for (const news of latestnews) {
            await restaurantlatestnews.create({
                restaurantId: newRestaurant.restaurantId,
                newsContent: news,
                releaseTime: currentDate
            });
        }
        // 處理餐廳類別
        for (const type of types) {
            const [category, created] = await categories.findOrCreate({
                where: { categoryName: type }
            });
            await newRestaurant.addCategory(category);
        }
    
    } catch(error) {
        console.error("錯誤詳情:", error);
        // 如果錯誤有更詳細的屬性（例如 error.message），也可以單獨打印出來
        console.error("錯誤信息:", error.message);
        throw error;  // 可以選擇重新拋出錯誤，或者處理錯誤
    }
};

exports.modifyRestaurantInfo = async(restaurantInfo) => {
    try {
        // console.log(restaurantInfo);
        const { restaurantId,
                restaurantName, 
                restaurantType, 
                restaurantLocation, 
                latestNews, 
                isOpening, 
                startDate, 
                endDate, 
                logo,
                prepareTime,
                // 其他欄位
                ownerId, 
                factoryLocation,
                restaurantPhone,
                restaurantMail,
                serviceMethod,
                isorderAvailable,
                istemporaryRestaurant,
                // rating,
            } = restaurantInfo;
    
        // 檢查 restaurantType 是否是字符串，如果是，則轉換為列表
        const types = Array.isArray(restaurantType) ? restaurantType : [restaurantType];
        
        // 檢查 latestNews 是否是字符串，如果是，則轉換為列表
        const latestnews = Array.isArray(latestNews) ? latestNews : [latestNews];

        // 更新現有的餐廳資訊
        // 檢查餐廳是否已經存在
        const existingRestaurant = await restaurants.findOne({ where: { restaurantId: restaurantId } })
        if (!existingRestaurant) {
            throw new Error('Restaurant not found');
        }
        else{
            await existingRestaurant.update({ 
                restaurantName: restaurantName,
                restaurantLocation: restaurantLocation,
                isOpening: isOpening,
                stationStartDate: new Date(startDate),
                stationEndDate: new Date(endDate),
                restaurantImage: logo,
                prepareTime: prepareTime,
                // 其他欄位
                ownerId: ownerId, 
                factoryLocation: factoryLocation,
                restaurantPhone: restaurantPhone,
                restaurantMail: restaurantMail,
                serviceMethod: serviceMethod,
                isorderAvailable: isorderAvailable,
                istemporaryRestaurant: istemporaryRestaurant,
                rating: 0
            });
            // 更新 latestNews 等相關資訊
            let currentDate = new Date();
            currentDate = currentDate.setHours(currentDate.getHours()+8);
            for (const news of latestnews) {
                await restaurantlatestnews.create({
                    restaurantId: existingRestaurant.restaurantId,
                    newsContent: news,
                    releaseTime: currentDate
                });
            }
            // 處理餐廳類別
            const categoriesToAdd = [];
            for (const type of types) {
                const [category, created] = await categories.findOrCreate({
                    where: { categoryName: type }
                });
                categoriesToAdd.push(category);
            }
            await existingRestaurant.setCategories(categoriesToAdd);
        }
    } catch(error) {
        console.error("錯誤詳情:", error);
        // 如果錯誤有更詳細的屬性（例如 error.message），也可以單獨打印出來
        console.error("錯誤信息:", error.message);
        throw error;  // 可以選擇重新拋出錯誤，或者處理錯誤
    }
};

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

exports.showInfoStatus = async(restaurantId) => {
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
    // console.log(restaurantInfo);
    // check if all information is filled
    const nullcols = [];
    const specificCols = ['rating', 'restaurantlatestnews', 'isOpening', 'istemporaryRestaurant', 'isorderAvailable'];
    for (const [key, value] of Object.entries(restaurantInfo.dataValues)) {
        if (!specificCols.includes(key) & value == '') {
            nullcols.push(key);
        }
    }
    return nullcols;
};