const express = require('express');
const { restaurants, categories, restaurantlatestnews, orders, Sequelize, sequelize } = require('../models')
const asyncHandler = require("express-async-handler");

exports.createRestaurantInfo = async(restaurantInfo) => {
    try {
        // console.log(restaurantInfo);
        const { 
                restaurantId,
                restaurantName, 
                restaurantGroup,
                restaurantType, 
                telephoneNumber,
                factoryArea,
                factoryLocation,
                restaurantLocation, 
                latestNews, 
                isOpening, 
                prepareTime,
                startTime, 
                endTime, 
                acceptingOrderType,
                restaurantImage,
                // 其他欄位
                // ownerId,
                // restaurantPhone,
                // restaurantMail,
                // serviceMethod,
                // isorderAvailable,
                // istemporaryRestaurant,
                // rating,
            } = restaurantInfo;
    
        // 檢查 restaurantType 是否是字符串，如果是，則轉換為列表
        const types = Array.isArray(restaurantType) ? restaurantType : [restaurantType];

        // 檢查 restaurantGroup 是流動櫃還是固定櫃
        let istemporaryRestaurant = false;
        if (restaurantGroup == '流動櫃'){
            istemporaryRestaurant = true;
        } 

        // 檢查 latestNews 是否是字符串，如果是，則轉換為列表
        const latestnews = Array.isArray(latestNews) ? latestNews : [latestNews];
        
        // 創建新的餐廳
        const newRestaurant = await restaurants.create({
            restaurantId: restaurantId,
            restaurantName: restaurantName,
            restaurantLocation: restaurantLocation,
            isOpening: isOpening,
            stationStartDate: new Date(startTime),
            stationEndDate: new Date(endTime),
            restaurantImage: restaurantImage,
            prepareTime: prepareTime,
            // 其他欄位
            ownerId: restaurantId, // restaurantId 為 ownerId
            factoryArea: factoryArea,
            factoryLocation: factoryLocation,
            restaurantPhone: telephoneNumber,
            // restaurantMail: restaurantMail,
            serviceMethod: acceptingOrderType,
            // isorderAvailable: isorderAvailable,
            istemporaryRestaurant: istemporaryRestaurant,
            // rating: 0
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
        const {  
            restaurantId,
            restaurantName, 
            restaurantGroup,
            restaurantType, 
            telephoneNumber,
            factoryArea,
            factoryLocation,
            restaurantLocation, 
            latestNews, 
            isOpening, 
            prepareTime,
            startTime, 
            endTime, 
            acceptingOrderType,
            restaurantImage,
            // 其他欄位
            // ownerId,
            // restaurantPhone,
            // restaurantMail,
            // serviceMethod,
            // isorderAvailable,
            // istemporaryRestaurant,
            // rating,
            } = restaurantInfo;
    
        // 檢查 restaurantType 是否是字符串，如果是，則轉換為列表
        const types = Array.isArray(restaurantType) ? restaurantType : [restaurantType];
        
        // 檢查 restaurantGroup 是流動櫃還是固定櫃
        let istemporaryRestaurant = false;
        if (restaurantGroup == '流動櫃'){
            istemporaryRestaurant = true;
        }

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
                stationStartDate: new Date(startTime),
                stationEndDate: new Date(endTime),
                restaurantImage: restaurantImage,
                prepareTime: prepareTime,
                // 其他欄位
                // ownerId: restaurantId, 
                factoryArea: factoryArea,
                factoryLocation: factoryLocation,
                restaurantPhone: telephoneNumber,
                // restaurantMail: restaurantMail,
                serviceMethod: acceptingOrderType,
                // isorderAvailable: isorderAvailable,
                istemporaryRestaurant: istemporaryRestaurant,
                // rating: 0
            });
            // 更新 latestNews 等相關資訊
            await restaurantlatestnews.destroy({
                where: {
                  restaurantId: existingRestaurant.restaurantId,
                },
            });
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

    let restaurantGroup = '固定櫃';
    if (restaurantInfo.istemporaryRestaurant){
        restaurantGroup = '流動櫃';
    }
    
    // 建立所需的格式
    const formattedRestaurantInfo = {
        restaurantId: restaurantInfo.restaurantId,
        restaurantName: restaurantInfo.restaurantName,
        restaurantGroup: restaurantGroup,
        restaurantType: restaurantInfo.categories.map(category => category.categoryName).join(', '),
        telephoneNumber: restaurantInfo.restaurantPhone,
        factoryArea: restaurantInfo.factoryArea,
        factoryLocation: restaurantInfo.factoryLocation,
        restaurantLocation: restaurantInfo.restaurantLocation,
        latestNews: restaurantInfo.restaurantlatestnews.map(news => news.newsContent),
        isOpening: restaurantInfo.isOpening == 1,
        prepareTime: restaurantInfo.prepareTime,
        startTime: restaurantInfo.stationStartDate,
        endTime: restaurantInfo.stationEndDate,
        // restaurantImage: restaurantInfo.restaurantImage,
        acceptingOrderType: restaurantInfo.serviceMethod
    };

    if (restaurantInfo.restaurantImage) {
        formattedRestaurantInfo.restaurantImage = restaurantInfo.restaurantImage.toString();
    }

    // console.log("Formatted Restaurant Info:", JSON.stringify(formattedRestaurantInfo, null, 2));
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

// 以下為消費者端 API

exports.showAllRestaurants = async (location) => {
    const allrestaurants = await restaurants.findAll({
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
        ],
        attributes: [
            'restaurantId', 
            'restaurantName', 
            'restaurantImage', 
            'serviceMethod', 
            'prepareTime',
        ],
        where: {
            factoryLocation: location,
            istemporaryRestaurant: false,
            isOpening: true
        }
    });
    // console.log(allrestaurants);

    let results = {};
    let index = 1;
    for (const restaurant of allrestaurants) {
        let restaurantId = restaurant.dataValues.restaurantId;

        // 計算歷史評價
        let currentDate = new Date();
        currentDate = currentDate.setHours(currentDate.getHours()+8);
        currentDate = new Date(currentDate);

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
        const historyRatingValue = historyRating[0].dataValues.avgRating || 0;
        // 四捨五入到小數點第二位
        const roundedHistoryRating = parseFloat(historyRatingValue).toFixed(2);
        
        let result = {};
        // console.log('這裡這裡這裡這裡這裡這裡這裡', restaurant.dataValues.categories)
        result['id'] = restaurantId;
        result['name'] = restaurant.dataValues.restaurantName;
        result['type'] = restaurant.dataValues.categories[0].dataValues.categoryName;
        result['image'] = restaurant.dataValues.restaurantImage?.toString();
        result['service'] = restaurant.dataValues.serviceMethod;
        result['preparetime'] = restaurant.dataValues.prepareTime;
        result['rating'] = roundedHistoryRating;

        results[index] = result;
        index += 1;
    }
    
    return results;
};

exports.showCategoryRestaurants = async (location, category) => {
    const allrestaurants = await restaurants.findAll({
        include: [
            {
                model: categories,
                through: { attributes: [] },
                attributes: ['categoryName'],
                where: {
                    categoryName: category
                }
            },
            {
                model: restaurantlatestnews,
                attributes: ['newsContent']
            }
        ],
        attributes: [
            'restaurantId', 
            'restaurantName', 
            'restaurantImage', 
            'serviceMethod', 
            'prepareTime',
        ],
        where: {
            factoryLocation: location,
            istemporaryRestaurant: false,
            isOpening: true
        }
    });
    // console.log(allrestaurants);

    let results = {};
    let index = 1;
    for (const restaurant of allrestaurants) {
        let restaurantId = restaurant.dataValues.restaurantId;

        // 計算歷史評價
        let currentDate = new Date();
        currentDate = currentDate.setHours(currentDate.getHours()+8);
        currentDate = new Date(currentDate);
        
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
        const historyRatingValue = historyRating[0].dataValues.avgRating || 0;
        // 四捨五入到小數點第二位
        const roundedHistoryRating = parseFloat(historyRatingValue).toFixed(2);
        
        let result = {};
       
        result['id'] = restaurantId;
        result['name'] = restaurant.dataValues.restaurantName;
        result['type'] = restaurant.dataValues.categories[0].dataValues.categoryName;
        result['image'] = restaurant.dataValues.restaurantImage?.toString();
        result['service'] = restaurant.dataValues.serviceMethod;
        result['preparetime'] = restaurant.dataValues.prepareTime;
        result['rating'] = roundedHistoryRating;

        results[index] = result;
        index += 1;
    }
    
    return results;
};

exports.showTempRestaurantsNews = async(location) => {
    const restaurantnewses = await restaurants.findAll({
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
        ],
        attributes: [
            'restaurantId', 
            'restaurantName', 
            'restaurantImage', 
            'serviceMethod',
            'stationStartDate',
            'stationEndDate',
            'prepareTime'
        ],
        where:{
            factoryLocation: location,
            istemporaryRestaurant: true,
            isOpening: true
        }
    });
    // console.log(restaurantnewses);
    let results = {};
    
    // 計算現在時間
    let currentDate = new Date();
    currentDate = currentDate.setHours(currentDate.getHours()+8);
    currentDate = new Date(currentDate);
    let index = 1;
    for (const restaurantnews of restaurantnewses) {
        
        let result = {};
        // console.log(currentDate);

        let startTime = restaurantnews.dataValues.stationStartDate;
        if (typeof startTime === 'string') {
            startTime = new Date(startTime);
            // startTime = startTime.setHours(startTime.getHours()+8);
            // startTime = new Date(startTime);
        } else {
            startTime = restaurantnews.dataValues.stationStartDate;
        }
        let endTime = restaurantnews.dataValues.stationEndDate;
        if (typeof endTime === 'string') {
            endTime = new Date(endTime);
            // endTime = endTime.setHours(endTime.getHours()+8);
            // endTime = new Date(endTime);
        } else {
            endTime = restaurantnews.dataValues.stationEndDate;
        }

        // console.log(startTime);
        // console.log(endTime);

        if (currentDate >= startTime && currentDate <= endTime) {
            
            let restaurantId = restaurantnews.dataValues.restaurantId;
            
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
            const historyRatingValue = historyRating[0].dataValues.avgRating || 0;
            // 四捨五入到小數點第二位
            const roundedHistoryRating = parseFloat(historyRatingValue).toFixed(2);
            
            result['isBetweenStartEndTime'] = true;
            result['id'] = restaurantId;
            result['name'] = restaurantnews.dataValues.restaurantName;
            result['type'] = restaurantnews.dataValues.categories[0].dataValues.categoryName;
            result['image'] = restaurantnews.dataValues.restaurantImage?.toString();
            result['service'] = restaurantnews.dataValues.serviceMethod;
            result['evaluate'] = roundedHistoryRating;
            result['prepare_time'] = restaurantnews.dataValues.prepareTime;
            let newscontents = []
            for (const content of restaurantnews.restaurantlatestnews){
                newscontents.push(content.newsContent);
            }
            result['LatestNews'] = newscontents;

            results[index] = result;
            index += 1;

        } else {
            result['isBetweenStartEndTime'] = false;
            result['id'] = restaurantnews.dataValues.restaurantId;
            result['name'] = restaurantnews.dataValues.restaurantName;
            // result['type'] = restaurantnews.dataValues.categories[0].dataValues.categoryName; //暫時放著
            result['image'] = restaurantnews.dataValues.restaurantImage?.toString();
            // result['service'] = restaurantnews.dataValues.serviceMethod; //暫時放著
            // result['prepare_time'] = restaurantnews.dataValues.prepareTime; //暫時放著
            let newscontents = []
            for (const content of restaurantnews.restaurantlatestnews){
                newscontents.push(content.newsContent);
            }
            result['LatestNews'] = newscontents;
            results[index] = result;
            index += 1;
        }
    }
    
    return results;
};

exports.showTime = async(restaurantId) => {
    const restaurantinfo = await restaurants.findByPk(restaurantId, {
        attributes: [
            'restaurantId', 
            'stationStartDate',
            'stationEndDate',
            'prepareTime'
        ],
        where:{
            restaurantId: restaurantId,
        }
    });
    console.log(restaurantinfo);
    let startTime = restaurantinfo.dataValues.stationStartDate;
    if (typeof startTime === 'string') {
        startTime = new Date(startTime);
        // startTime = startTime.setHours(startTime.getHours()+8);
        // startTime = new Date(startTime);
    } else {
        startTime = restaurantinfo.dataValues.stationStartDate;
    }
    let endTime = restaurantinfo.dataValues.stationEndDate;
    if (typeof endTime === 'string') {
        endTime = new Date(endTime);
        // endTime = endTime.setHours(endTime.getHours()+8);
        // endTime = new Date(endTime);
    } else {
        endTime = restaurantinfo.dataValues.stationEndDate;
    }

    let result = {};

    const startyear = startTime.getFullYear();
    const startmonth = startTime.getMonth() + 1;
    const startday = startTime.getDate(); 
    const endyear = endTime.getFullYear();
    const endmonth = endTime.getMonth() + 1;
    const endday = endTime.getDate();

    result['start_time'] = {
        year: startyear,
        month: startmonth,
        date: startday
    }
    result['end_time'] = {
        year: endyear,
        month: endmonth,
        date: endday
    }
    result['prepare_time'] = restaurantinfo.dataValues.prepareTime;

    return result;
};
