const express = require('express');
const asyncHandler = require("express-async-handler");
const { Op } = require('sequelize');
const { menus, menuitems } = require('../models');

exports.getSellingItems = asyncHandler(async (menuId) => {
  try {
    // 檢查 menuId 是否存在於 menus 表中
    const menuExists = await menus.findByPk(menuId);
    if (!menuExists) {
      return { message: `Menu with ID ${menuId} does not exist.` };
    }
    // 從 menuitems 取得相應的 menuId 下的所有 items
    const items = await menuitems.findAll({
      attributes: ['itemId', 'itemName', 'totalQuantity', 'soldQuantity', 'isAvailable'],
      where: {
        menuId: menuId,
        isAvailable: true, // 只查詢可售的品項
      },
    });

    // 如果找不到對應的 items，回傳 null 或者一個錯誤訊息
    if (!items || items.length === 0) {
      return { message: 'No items found for the specified menuId.' };
    }

    // 格式化資料
    const formattedItems = items.map(item => ({
      itemId: item.itemId,
      itemName: item.itemName,
      totalNumber: item.totalQuantity,
      soldNumber: item.soldQuantity,
      isSelling: item.isAvailable,
    }));

    return formattedItems;
  } catch (error) {
    throw new Error(`Error getting selling items: ${error.message}`);
  }
});

exports.getPausingItems = asyncHandler(async (menuId) => {
  try {
    // 檢查 menuId 是否存在於 menus 表中
    const menuExists = await menus.findByPk(menuId);
    if (!menuExists) {
      return { message: `Menu with ID ${menuId} does not exist.` };
    }
    // 從 menuitems 取得相應的 menuId 下的所有 items
    const items = await menuitems.findAll({
      attributes: ['itemId', 'itemName', 'totalQuantity', 'soldQuantity', 'isAvailable'],
      where: {
        menuId: menuId,
        isAvailable: false, // 只查詢暫停販售的品項
      },
    });

    // 如果找不到對應的 items，回傳 null 或者一個錯誤訊息
    if (!items || items.length === 0) {
      return { message: 'No items found for the specified menuId.' };
    }

    // 格式化資料
    const formattedItems = items.map(item => ({
      itemId: item.itemId,
      itemName: item.itemName,
      totalNumber: item.totalQuantity,
      soldNumber: item.soldQuantity,
      isSelling: item.isAvailable,
    }));

    return formattedItems;
  } catch (error) {
    throw new Error(`Error getting selling items: ${error.message}`);
  }
});

exports.modifyItem = asyncHandler(async (itemId, isSelling, totalNumber) => {
  try {
    // 使用 itemId 直接查詢對應的 item
    const item = await menuitems.findByPk(itemId, {
      attributes: ['itemId', 'isAvailable', 'totalQuantity'],
    });
    if (!item) {
      throw new Error(`Item with ID ${itemId} not found.`);
    }
    // 更新 item 資料
    item.isAvailable = isSelling;
    item.totalQuantity = totalNumber;
    // 儲存更新後的 item
    await item.save();

    return item;
  } catch (error) {
    throw new Error(`Error modifying item: ${error.message}`);
  }
});

