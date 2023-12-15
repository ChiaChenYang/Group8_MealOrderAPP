const express = require('express');
const asyncHandler = require("express-async-handler");
const { menus, restaurants,  restaurantlatestnews, menucategories, menuitems, tags, itemtags, itemmenucategories, orders, Sequelize } = require('../models');

exports.getSingleItem = asyncHandler(async (itemId) => {
  try {
    // 檢查該項目是否存在
    const item = await menuitems.findByPk(itemId);
    if (!item) {
      throw new Error(`Item not found with ID: ${itemId}`);
    }
    // 根據 itemId 找到對應的 menuId
    const menuId = item.menuId;
    const SingleItemDetails = await menus.findOne({
      where: { menuId: menuId },
      attributes: ['restaurantId'],
      include: [
        {
          model: menuitems,
          attributes: ['itemId', 'itemName', 'itemImage', 'descriptionText', 'price', 'calories'],
          where: { itemId: itemId },
          include: [
            {
              model: tags,
              attributes: ['tagId', 'tagName'],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    const formattedItem = {
      shop_id: SingleItemDetails.restaurantId,
      name: SingleItemDetails.menuitems[0].itemName,
      price: SingleItemDetails.menuitems[0].price,    
      Calorie: SingleItemDetails.menuitems[0].calories,
      tag: SingleItemDetails.menuitems[0].tags.map((tag) => tag.tagName),
      description: SingleItemDetails.menuitems[0].descriptionText,
      image: item.itemImage ? item.itemImage.toString('base64') : null,
    };
    return formattedItem;
  } catch (error) {
    throw new Error(`Error getting single item: ${error.message}`);
  }
});

exports.getAllMenuDetailsForConsumer = asyncHandler(async (restaurantId) => {
  try {
    // 檢查該餐廳 id 是否存在餐廳表
    // const restaurant = await restaurants.findByPk(restaurantId);
    const restaurant = await restaurants.findByPk(restaurantId, {
      include: [
          {
              model: restaurantlatestnews,
              attributes: ['newsContent']
          }
      ]
  });
    if (!restaurant.restaurantId) {
      throw new Error(`Restaurant not found with ID: ${restaurantId}`);
    }

    let prepareTime = null;
    let rating = null;
    let commentsCount = null;
    let stationStartDate = null;
    let stationEndDate = null;

    // 定義 currentDate
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 8);

    if (restaurant.istemporaryRestaurant) {
      // 如果是輪動櫃，並且有有效的 stationStartDate 和 stationEndDate
      stationStartDate = restaurant.stationStartDate;
      stationEndDate = restaurant.stationEndDate;

      const stationStartDateObj = new Date(stationStartDate);
      const stationEndDateObj = new Date(stationEndDate);

      console.log(stationStartDateObj, stationEndDateObj, currentDate);
      
      if (currentDate >= stationStartDateObj && currentDate <= stationEndDateObj) {
        // 現在的日期在 stationStartDate 和 stationEndDate 之間
        prepareTime = restaurant.prepareTime;

        // 計算歷史評價
        const historyRating = await orders.findAll({
          attributes: [
            [Sequelize.fn('AVG', Sequelize.col('orderRating')), 'avgRating'],
            [Sequelize.fn('COUNT', Sequelize.col('orderRating')), 'commentsCount'],
          ],
          where: {
            restaurantId: restaurantId,
            completeTime: {
              [Sequelize.Op.lte]: currentDate,
            },
          },
        });

        rating = historyRating[0].dataValues.avgRating || 0;
        commentsCount = historyRating[0].dataValues.commentsCount || 0;
        // 四捨五入到小數點第二位
        rating = parseFloat(rating.toFixed(2));
      }
    } else {
      // 如果不是輪動櫃，直接使用餐廳的 prepareTime
      // 計算歷史評價
      const historyRating = await orders.findAll({
        attributes: [
          [Sequelize.fn('AVG', Sequelize.col('orderRating')), 'avgRating'],
          [Sequelize.fn('COUNT', Sequelize.col('orderRating')), 'commentsCount'],
        ],
        where: {
          restaurantId: restaurantId,
          completeTime: {
            [Sequelize.Op.lte]: currentDate,
          },
        },
      });
      rating = historyRating[0].dataValues.avgRating || 0;
      commentsCount = historyRating[0].dataValues.commentsCount || 0;
      // 四捨五入到小數點第二位
      rating = parseFloat(rating.toFixed(2));
      prepareTime = restaurant.prepareTime;
    }

    const menuDetails = await menus.findAll({
      where: { restaurantId },
      attributes: ['menuId', 'menuName', 'menuTime', 'menuType'],
      include: [
        {
          model: restaurants,
        },
        {
          model: menucategories,
          attributes: ['menuCategoryId', 'menuCategoryName'],
          include: [
            {
              model: menuitems,
              attributes: ['itemId', 'itemName', 'itemImage', 'descriptionText', 'price', 'calories', 'isAvailable'],
              where: { isAvailable: true },
              through: { attributes: [] },
              include: [
                {
                  model: tags,
                  attributes: ['tagId', 'tagName'],
                  through: { attributes: [] },
                },
              ],
            },
          ],
        }
      ],
    });

    const formattedMenus = {
      restaurantId: restaurant.restaurantId,
      restaurantName: restaurant.restaurantName,
      evaluate: rating,
      comment: commentsCount,
      prepare_time: prepareTime,
      location: restaurant.factoryArea + restaurant.factoryLocation + restaurant.restaurantLocation,
      stationStartDate: stationStartDate,
      stationEndDate: stationEndDate,
      news: restaurant.restaurantlatestnews.map(news => news.newsContent),
      menus: []
    };
    
    menuDetails.forEach((menu) => {
      const menuObj = {
        menuId: menu.menuId,
        type: [], // 新增一個 type 陣列
      };
    
      menu.menucategories.forEach((menucategory, categoryIndex) => {
        const items = {};
    
        menucategory.menuitems.forEach((item, itemIndex) => {
          const tags = item.tags.map((tag) => tag.tagName);
    
          items[itemIndex + 1] = {
            id: item.itemId,
            name: item.itemName,
            price: item.price,
            Calorie: item.calories,
            tag: tags,
            description: item.descriptionText,
            image: item.itemImage ? item.itemImage.toString('base64') : null,
          };
        });
    
        menuObj.type.push(menucategory.menuCategoryName);
        menuObj[categoryIndex + 1] = items;
      });
      // 使用 menu.menuTime 當 key
      formattedMenus.menus.push({
        [menu.menuTime]: menuObj
      });
      // if (menuObj.type.length > 0) {
      //   formattedMenus[menu.menuName] = menuObj;
      // }
    });
    return formattedMenus;
    
  } catch (error) {
    throw new Error(`Error getting all menu details: ${error.message}`);
  }
});

/*
exports.getAllMenuDetailsForConsumer = asyncHandler(async (restaurantId) => {
  try {
    // 檢查該餐廳 id 是否存在餐廳表
    const restaurant = await restaurants.findByPk(restaurantId);
    if (!restaurant) {
      throw new Error(`Restaurant not found with ID: ${restaurantId}`);
    }

    let prepareTime = null;
    let rating = null;
    let commentsCount = null;
    let stationStartDate = null;
    let stationEndDate = null;

    // 定義 currentDate
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 8);

    if (restaurant.istemporaryRestaurant) {
      // 如果是輪動櫃，並且有有效的 stationStartDate 和 stationEndDate
      stationStartDate = restaurant.stationStartDate;
      stationEndDate = restaurant.stationEndDate;

      const stationStartDateObj = new Date(stationStartDate);
      const stationEndDateObj = new Date(stationEndDate);

      console.log(stationStartDateObj, stationEndDateObj, currentDate);
      
      if (currentDate >= stationStartDateObj && currentDate <= stationEndDateObj) {
        // 現在的日期在 stationStartDate 和 stationEndDate 之間
        prepareTime = restaurant.prepareTime;

        // 計算歷史評價
        const historyRating = await orders.findAll({
          attributes: [
            [Sequelize.fn('AVG', Sequelize.col('orderRating')), 'avgRating'],
            [Sequelize.fn('COUNT', Sequelize.col('orderRating')), 'commentsCount'],
          ],
          where: {
            restaurantId: restaurantId,
            completeTime: {
              [Sequelize.Op.lte]: currentDate,
            },
          },
        });

        rating = historyRating[0].dataValues.avgRating || 0;
        commentsCount = historyRating[0].dataValues.commentsCount || 0;
        // 四捨五入到小數點第二位
        rating = parseFloat(rating.toFixed(2));
      }
    } else {
      // 如果不是輪動櫃，直接使用餐廳的 prepareTime
      // 計算歷史評價
      const historyRating = await orders.findAll({
        attributes: [
          [Sequelize.fn('AVG', Sequelize.col('orderRating')), 'avgRating'],
          [Sequelize.fn('COUNT', Sequelize.col('orderRating')), 'commentsCount'],
        ],
        where: {
          restaurantId: restaurantId,
          completeTime: {
            [Sequelize.Op.lte]: currentDate,
          },
        },
      });
      rating = historyRating[0].dataValues.avgRating || 0;
      commentsCount = historyRating[0].dataValues.commentsCount || 0;
      // 四捨五入到小數點第二位
      rating = parseFloat(rating.toFixed(2));
      prepareTime = restaurant.prepareTime;
    }

    const menuDetails = await menus.findAll({
      where: { restaurantId },
      attributes: ['menuId', 'menuName', 'menuTime', 'menuType'],
      include: [
        {
          model: restaurants,
        },
        {
          model: menucategories,
          attributes: ['menuCategoryId', 'menuCategoryName'],
          include: [
            {
              model: menuitems,
              attributes: ['itemId', 'itemName', 'itemImage', 'descriptionText', 'price', 'calories', 'isAvailable'],
              where: { isAvailable: true },
              through: { attributes: [] },
              include: [
                {
                  model: tags,
                  attributes: ['tagId', 'tagName'],
                  through: { attributes: [] },
                },
              ],
            },
          ],
        },
      ],
    });

    const formattedMenus = {
      restaurant: {
        // 新增 restaurant 資訊
        restaurantId: restaurant.restaurantId,
        restaurantName: restaurant.restaurantName,
        stationStartDate: stationStartDate,
        stationEndDate: stationEndDate,
        prepareTime: prepareTime,
        rating: rating,
        commentsCount: commentsCount,
      },
      menus: menuDetails.map((menu) => {
        const menuCategories = menu.menucategories.map((menucategory) => {
          const items = menucategory.menuitems.map((item) => {
            const tags = item.tags.map((tag) => {
              return {
                tagId: tag.tagId,
                tagName: tag.tagName,
              };
            });
            return {
              itemId: item.itemId,
              itemName: item.itemName,
              itemImage: item.itemImage.toString('base64'),
              descriptionText: item.descriptionText,
              price: item.price,
              calories: item.calories,
              tags: tags,
            };
          });
          return {
            categoryId: menucategory.menuCategoryId,
            categoryName: menucategory.menuCategoryName,
            items: items,
          };
        });
        return {
          menuId: menu.menuId,
          menuName: menu.menuName,
          menuTime: menu.menuTime,
          menuType: menu.menuType,
          categories: menuCategories,
        };
      }),
    };

    return formattedMenus;
  } catch (error) {
    throw new Error(`Error getting all menu details: ${error.message}`);
  }
});
*/

