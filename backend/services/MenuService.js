const express = require('express');
const asyncHandler = require("express-async-handler");
const { Op } = require('sequelize');
const { menus, restaurants,  menucategories, menuitems, tags, itemtags, itemmenucategories } = require('../models');

exports.createNewMenu = asyncHandler(async (restaurantId, newMenuName, newMenuType, newMenuTime) => {

  // 檢查 restaurantId 是否存在於 restaurants 表中
  const existingRestaurant = await restaurants.findByPk(restaurantId);
  if (!existingRestaurant) {
    throw new Error(`Invalid restaurantId: ${restaurantId}`);
  }

  // 創建新的菜單
  const createdMenu = await menus.create({
    restaurantId: restaurantId,
    menuName: newMenuName,
    menuType: newMenuType,
    menuTime: newMenuTime,
  });

  // 回傳新增的菜單的 ID
  return { menuId: createdMenu.menuId };
});

exports.getAllMenuDetails = asyncHandler(async (restaurantId) => {
  try {
    // 檢查該餐廳 id 是否存在餐廳表
    const restaurant = await restaurants.findByPk(restaurantId);
    if (!restaurant) {
      throw new Error(`Restaurant not found with ID: ${restaurantId}`);
    }
    const menuDetails = await menus.findAll({
      where: { restaurantId },
      attributes: ['menuId', 'menuName', 'menuTime', 'menuType'],
      include: [
        {
          model: menucategories,
          attributes: ['menuCategoryId', 'menuCategoryName'],
          include: [
            {
              model: menuitems,
              attributes: ['itemId', 'itemName', 'itemImage', 'descriptionText', 'price', 'calories'],
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
              itemImage: item.itemImage?.toString(),
              descriptionText: item.descriptionText,
              price: item.price,
              calories: item.calories,
              tags: tags 
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
    console.log("Error!", error);
    throw new Error(`Error getting all menu details: ${error.message}`);
  }
});

exports.processMenu = asyncHandler(async (menuId, menuName, menuTime, menuType, categories) => {
  try {
    // 確保菜單存在
    const existingMenu = await menus.findByPk(menuId);
    if (!existingMenu) {
      throw new Error(`Menu not found with ID: ${menuId}`);
    }
    console.log(menuId, menuName, menuTime, menuType);
    await menus.update({ 
      menuName: menuName,
      menuTime: menuTime, 
      menuType: menuType }, {
      where: { menuId: existingMenu.menuId },
    });
    // 取得資料庫中該菜單底下的所有 menuCategoryId
    const existingMenuCategoryIds = await menucategories.findAll({
      attributes: ['menuCategoryId'],
      where: { menuId: existingMenu.menuId },
      raw: true,
    })
    const menuCategoryIdsFromDB = existingMenuCategoryIds.map(category => category.menuCategoryId);
    if (categories.length === 0 && menuCategoryIdsFromDB.length !== 0) {
      console.log('應刪', menuCategoryIdsFromDB[0]);
      try {
        // 在 menucategories 表中刪除指定的類別
        const deletedCategoryRows = await menucategories.destroy({
          where: { menuCategoryId: menuCategoryIdsFromDB[0] },
        });    
        if (deletedCategoryRows > 0) {
          console.log(`Category with ID ${menuCategoryIdsFromDB[0]} deleted successfully.`);
        } else {
          console.log(`Category with ID ${menuCategoryIdsFromDB[0]} not found.`);
        }
      } catch (error) {
        console.error('Error deleting category:', error.message);
      }
    }

    // 迭代處理每個 category
    for (const category of categories) {
      const { categoryId, categoryName, items } = category;

      // 判斷是否為新增操作
      const isNewCategory = categoryId >= 10**12;
      // 如果是新增操作，忽略傳遞的 ID，資料庫會生成新的 ID
      const categoryIdToUse = isNewCategory ? null : categoryId;

      // 更新、新增或刪除 category
      let existingCategory;
      // 新增
      if (isNewCategory) {
        // 檢查是否已存在相同的菜單 id 跟類別名稱組合
        existingCategory = await menucategories.findOne({
          where: { menuCategoryName: categoryName, menuId },
        });
        if (!existingCategory) {
          // 如果在該菜單底下沒有該類別，就新增至 menucategories 表
          existingCategory = await menucategories.create({
            menuId: menuId,
            menuCategoryName: categoryName,
          });
        } else {
          throw new Error('The category name already exists under this menu. Please choose a different name.');
        }
      } else {
        existingCategory = await menucategories.findByPk(categoryIdToUse);
        if (existingCategory) {
          // 更新
          console.log(`Category found with ID: ${categoryIdToUse}`);
          try {
            console.log(`Updating category with ID: ${categoryIdToUse}`);
            await menucategories.update({ menuCategoryName: categoryName }, {
              where: { menuCategoryId: categoryIdToUse },
            });
            console.log(`Category with ID ${categoryIdToUse} updated successfully.`);
          } catch (error) {
            console.error('Error updating category:', error.message);
          }
        } else {
          // 如果 category 找不到，拋出錯誤或者忽略，視情況而定
          throw new Error(`Category not found with ID: ${categoryIdToUse}`);
        }  
      }
      // 刪除
      const categoriesToAddToDB = categories.filter(category => category.categoryId >= 10**12);
      const categoryIdsToDelete = menuCategoryIdsFromDB.filter(existingCategoryId => {
        return !categories.some(category => category.categoryId === existingCategoryId);
      });
      console.log("Categories to add to DB:", categoriesToAddToDB);
      console.log("Category IDs to delete from DB:", categoryIdsToDelete);
      categoryIdsToDelete.forEach(async categoryId => {
        console.log(`Deleting category with ID: ${categoryId}`);
        try {
          // 在 menucategories 表中刪除指定的類別
          const deletedCategoryRows = await menucategories.destroy({
            where: { menuCategoryId: categoryId },
          });    
          if (deletedCategoryRows > 0) {
            console.log(`Category with ID ${categoryId} deleted successfully.`);
          } else {
            console.log(`Category with ID ${categoryId} not found.`);
          }
        } catch (error) {
          console.error('Error deleting category:', error.message);
        }
      });

      // 取得資料庫中該 category 底下的所有 itemId
      const existingItemIds = await itemmenucategories.findAll({
        attributes: ['itemId'],
        where: { menuCategoryId: existingCategory.menuCategoryId },
        raw: true,
      })
      const menuItemIdsFromDB = existingItemIds.map(item => item.itemId);
      console.log('menuItemIdsFromDB:', menuItemIdsFromDB);
      if (items.length === 0 && menuItemIdsFromDB.length !== 0) {
        console.log('應刪', menuItemIdsFromDB[0], existingCategory.menuCategoryId);
        try {
          // 在 itemmenucategories 表中刪除與該項目相關的關聯
          const deletedItemCategoryRows = await itemmenucategories.destroy({
            where: {
              [Op.and]: [
                { itemId: menuItemIdsFromDB[0] },
                { menuCategoryId: existingCategory.menuCategoryId }
              ]
            }
          });      
          if (deletedItemCategoryRows > 0) {
            console.log(`Related records in ItemMenuCategories table deleted successfully.`);
          } else {
            console.log(`No related records found in ItemMenuCategories table.`);
          }
        } catch (error) {
          console.error('Error deleting item and related records:', error.message);
        }
      }

      // 迭代處理每個 item
      for (const item of items) {
        const { itemId, itemName, itemImage, descriptionText, price, calories, Tags } = item;
        // 判斷是否為新增操作
        const isNewItem = itemId >= 10**12;
        // 如果是新增操作，忽略傳遞的 ID，資料庫會生成新的 ID
        const itemIdToUse = isNewItem ? null : itemId;

        // 更新、新增或刪除 item
        let existingItem;
        // 新增
        const decodedImage = itemImage;
        // 檢查一個菜單中是否已存在相同的餐點
        if (isNewItem) {
          existingItem = await menuitems.findOne({
            where: { itemName: itemName, menuId },
          });
          if (!existingItem) {
            existingItem = await menuitems.create({
              menuId: menuId,
              itemName: itemName,
              itemImage: decodedImage,
              descriptionText: descriptionText,
              price: price,
              calories: calories,
            });
          } 
          // else {
          //   throw new Error('Items under the same menu must have unique names.');
          // }
          // 新增 item 與 menucategories 之間的關聯
          console.log('這', existingItem.itemId, categoryId);
          const existingItemMenucategories = await itemmenucategories.findOne({
            where: {
              itemId: existingItem.itemId,
              menuCategoryId: categoryId,
            },
          });
          console.log('這', existingItem.itemId, existingCategory.menuCategoryId);
          if (!existingItemMenucategories) {
            // 如果關聯不存在，則進行插入
            await itemmenucategories.create({
              itemId: existingItem.itemId,
              menuCategoryId: existingCategory.menuCategoryId,
            });
          } 
          // else {
          //   throw new Error('ItemMenucategories relationship already exists.');
          // }
        } else {
          existingItem = await menuitems.findByPk(itemIdToUse);
          if (existingItem) {
            // 更新
            console.log(`Item found with ID: ${itemIdToUse}`);
            try {
              console.log(`Updating item with ID: ${itemIdToUse}`);
              await menuitems.update({ 
                itemName: itemName,
                itemImage: decodedImage,
                descriptionText: descriptionText,
                price: price,
                calories: calories,
              }, 
              {
                where: { itemId: itemIdToUse },
              });
              console.log(`Item with ID ${itemIdToUse} updated successfully.`);
            } catch (error) {
              console.error('Error updating item:', error.message);
            }
          } else {
            // 如果 item 找不到，拋出錯誤或者忽略，視情況而定
            throw new Error(`Item not found with ID: ${itemIdToUse}`);
            }
        }
        // 刪除
        const itemsToAddToDB = items.filter(item => item.itemId >= 10**12);
        const itemIdsToDelete = menuItemIdsFromDB.filter(existingItemId => {
          return !items.some(item => item.itemId === existingItemId);
        });
        console.log("Items to add to DB:", itemsToAddToDB);
        console.log("Item IDs to delete from DB:", itemIdsToDelete);
        itemIdsToDelete.forEach(async itemId => {
          console.log(`Deleting item with ID: ${itemId}`);   
          try {
            // 在 itemmenucategories 表中刪除與該項目相關的關聯
            console.log('刪除', itemId, existingCategory.menuCategoryId)
            const deletedItemCategoryRows = await itemmenucategories.destroy({
              where: {
                [Op.and]: [
                  { itemId: itemId },
                  { menuCategoryId: existingCategory.menuCategoryId }
                ]
              }
            });     
            // // 在 items 表中刪除指定的項目
            // const deletedItemRows = await menuitems.destroy({
            //   where: { itemId: itemId },
            // });
            // if (deletedItemRows > 0) {
            //   console.log(`Item with ID ${itemId} deleted successfully.`);
            // } else {
            //   console.log(`Item with ID ${itemId} not found.`);
            // }
            if (deletedItemCategoryRows > 0) {
              console.log(`Related records in ItemMenuCategories table deleted successfully.`);
            } else {
              console.log(`No related records found in ItemMenuCategories table.`);
            }
          } catch (error) {
            console.error('Error deleting item and related records:', error.message);
          }
        });        
      
        // First, remove all existing associations for the item
        await itemtags.destroy({
          where: { itemId: existingItem.itemId },
        });

        // Now, process each tag in Tags to create new associations
        for (const tag of Tags) {
          const { tagId, tagName } = tag;

          // If it's a new tag (based on tagId), create it in the tags table
          let tagToUse;
          if (tagId >= 10**12) {
            // Create a new tag
            let existingTag = await tags.findOne({ where: { tagName: tagName } });
            if (!existingTag) {
              existingTag = await tags.create({ tagName: tagName });
            } else {
              console.log('The tag name already exists.');
            }
            tagToUse = existingTag;
          } else {
            // Use the existing tag
            tagToUse = await tags.findByPk(tagId);
          }

          // Create association between item and tag
          try {
            const existingItemTag = await itemtags.findOne({
              where: {
                itemId: existingItem.itemId,
                tagId: tagToUse.tagId,
              },
            });
            if (!existingItemTag) {
              await itemtags.create({
                itemId: existingItem.itemId,
                tagId: tagToUse.tagId,
              });
            }
          } catch (error) {
            console.error('Error creating item-tag association:', error.message);
          }
        }

      }
    }
    // 回傳更新的菜單的 ID
    return { menuId: existingMenu.menuId };
  } catch (error) {
    throw new Error(`Error processing menu details: ${error.message}`);
  }
});
