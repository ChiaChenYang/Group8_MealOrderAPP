const express = require('express');
const asyncHandler = require("express-async-handler");
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
/*
exports.createNewMenuDetails = asyncHandler(async (menuId, newCategories) => {
  try {
    // 確保菜單存在
    const existingMenu = await menus.findByPk(menuId);
    if (!existingMenu) {
      throw new Error(`Menu not found with ID: ${menuId}`);
    }

    const createdItems = []; // 用來存放新增的 item id

    for (const categoryInfo of newCategories) {
      // 檢查是否已存在相同的菜單 id 跟類別名稱組合
      let existingCategory = await menucategories.findOne({
        where: { menuCategoryName: categoryInfo.categoryName, menuId },
      });

      if (!existingCategory) {
        // 如果在該菜單底下沒有該類別，就新增至 menucategories 表
        existingCategory = await menucategories.create({
          menuId: menuId,
          menuCategoryName: categoryInfo.categoryName,
        });
      }

      const categoryId = existingCategory.menuCategoryId;
      // 判斷是單純新增類別或是同時新增類別跟餐點
      if (categoryInfo.items) {
        // 如果有 items，表示同時新增類別及餐點
        for (const itemInfo of categoryInfo.items) {
          // 檢查一個菜單中是否已存在相同的餐點
          let existingItem = await menuitems.findOne({
            where: { itemName: itemInfo.itemName, menuId },
          });

          try {
            if (existingItem) {
              // 如果餐點已存在，使用現有的 itemId
              const itemId = existingItem.itemId;
              createdItems.push(itemId); // 將現有的 item id 加入陣列
            } else {
              // 新增餐點
              const base64Image = itemInfo.itemImage;
              const decodedImage = Buffer.from(base64Image, 'base64');

              existingItem = await menuitems.create({
                menuId: menuId,
                itemName: itemInfo.itemName,
                itemImage: decodedImage,
                descriptionText: itemInfo.description,
                price: itemInfo.price,
                calories: itemInfo.calories,
              });
              const itemId = existingItem.itemId;
              createdItems.push(itemId); // 將新增的 item id 加入陣列
            }
            // 新增 item 與 menucategories 之間的關聯
            const existingItemMenucategories = await itemmenucategories.findOne({
              where: {
                itemId: existingItem.itemId,
                menuCategoryId: categoryId,
              },
            });
            console.log(existingItemMenucategories);
            if (!existingItemMenucategories) {
              // 如果關聯不存在，則進行插入
              await itemmenucategories.create({
                itemId: existingItem.itemId,
                menuCategoryId: categoryId,
              });
            } else {
              console.log('ItemMenucategories relationship already exists.');
              // 如果關聯已存在，您可以選擇忽略或執行其他處理邏輯
            }

            // 新增或取得 tags
            for (const tagInfo of itemInfo.tags) {
              // 檢查是否已存在相同標籤
              let existingTag = await tags.findOne({
                where: { tagName: tagInfo },
              });

              if (!existingTag) {
                existingTag = await tags.create({
                  tagName: tagInfo,
                });
              }
              const tagId = existingTag.tagId;
              // 新增 item 與 tag 之間的關聯
              const existingItemTag = await itemtags.findOne({
                where: {
                  itemId: existingItem.itemId,
                  tagId: tagId,
                },
              });

              if (!existingItemTag) {
                // 如果關聯不存在，則進行插入
                await itemtags.create({
                  itemId: existingItem.itemId,
                  tagId: tagId,
                });
              } else {
                console.log('ItemTag relationship already exists.');
                // 如果關聯已存在，您可以選擇忽略或執行其他處理邏輯
              }
            }
          } catch (error) {
            console.error('Error creating item:', error.message);
            // 在這裡你可以選擇拋出異常或者執行其他適當的處理邏輯
          }
        }
      } else {
        // 如果沒有 items，表示單純新增類別而已
        console.log(`Category '${categoryInfo.categoryName}' added.`);
      }
    }

    // 回傳新增的菜單的 ID 和新增的 item ID 陣列
    return { menuId: existingMenu.menuId, createdItems };
  } catch (error) {
    throw new Error(`Error creating menu details: ${error.message}`);
  }
});
*/
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
              itemImage: item.itemImage.toString('base64'),
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
    // console.log('formattedMenus:', formattedMenus);

    return formattedMenus;
  } catch (error) {
    throw new Error(`Error getting all menu details: ${error.message}`);
  }
});

exports.processMenu = asyncHandler(async (menuId, categories) => {
  try {
    // 確保菜單存在
    const existingMenu = await menus.findByPk(menuId);
    if (!existingMenu) {
      throw new Error(`Menu not found with ID: ${menuId}`);
    }

    // 取得資料庫中該菜單底下的所有 menuCategoryId
    const existingMenuCategoryIds = await menucategories.findAll({
      attributes: ['menuCategoryId'],
      where: { menuId: existingMenu.menuId },
      raw: true,
    })
    const menuCategoryIdsFromDB = existingMenuCategoryIds.map(category => category.menuCategoryId);

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
        const decodedImage = Buffer.from(itemImage, 'base64');
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
          } else {
            throw new Error('Items under the same menu must have unique names.');
          }
          // 新增 item 與 menucategories 之間的關聯
          const existingItemMenucategories = await itemmenucategories.findOne({
            where: {
              itemId: existingItem.itemId,
              menuCategoryId: categoryId,
            },
          });
          if (!existingItemMenucategories) {
            // 如果關聯不存在，則進行插入
            await itemmenucategories.create({
              itemId: existingItem.itemId,
              menuCategoryId: existingCategory.menuCategoryId,
            });
          } else {
            throw new Error('ItemMenucategories relationship already exists.');
          }
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
            const deletedItemCategoryRows = await itemmenucategories.destroy({
              where: { itemId: itemId },
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
        // 取得資料庫中該 category 底下的所有 itemId
        const existingTagIds = await itemtags.findAll({
          attributes: ['tagId'],
          where: { itemId: existingItem.itemId },
          raw: true,
        })
        const itemTagIdsFromDB = existingTagIds.map(tag => tag.tagId);
        console.log('itemTagIdsFromDB:', itemTagIdsFromDB); 
        // 更新或新增 tags
        for (const tag of Tags) {
          const { tagId, tagName } = tag;
          // 判斷是否為新增操作
          const isNewTag = tagId >= 10**12;
          // 如果是新增操作，忽略傳遞的 ID，資料庫會生成新的 ID
          const tagIdToUse = isNewTag ? null : tagId;
          // 更新、新增或刪除 tag
          let existingTag;
          try {
            if (isNewTag) {
              // 檢查是否已存在相同標籤
              existingTag = await tags.findOne({
                where: { tagName: tagName },
              });
              console.log('她是誰', existingItem.itemId);
              console.log('妳是誰', existingTag.tagId);
              if (!existingTag) {
                existingTag = await tags.create({
                  tagName: tagName,
                });
              } else {
                console.log('The tag name already exists.');
              }
              // 新增 item 與 tag 之間的關聯
              const existingItemTag = await itemtags.findOne({
                where: {
                  itemId: existingItem.itemId,
                  tagId: existingTag.tagId,
                },
              });
              if (!existingItemTag) {
                await itemtags.create({
                  itemId: existingItem.itemId,
                  tagId: existingTag.tagId,
                });
              } else {
                throw new Error('ItemTag relationship already exists.');
              }
              console.log('New tag and association created:', existingTag.toJSON());
            } else {
              // 其他操作，根據你的需求進行相應的處理
              console.log('Perform other operations for existing tag');
            }
          } catch (error) {
            console.error('Error creating new tag or association:', error.message);
          }
          // 刪除
          const tagsToAddToDB = Tags.filter(tag => tag.tagId >= 10**12);
          const tagIdsToDelete = itemTagIdsFromDB.filter(existingTagId => {
            return !Tags.some(tag => tag.tagId === existingTagId);
          });
          console.log("Tags to add to DB:", tagsToAddToDB);
          console.log("Tag IDs to delete from DB:", tagIdsToDelete);
          tagIdsToDelete.forEach(async tagId => {
            console.log(`Deleting tag with ID: ${tagId}`);
            try {
              // 在 tags 表中刪除指定的標籤
              const deletedTagRows = await itemtags.destroy({
                where: { tagId: tagId },
              });
              if (deletedTagRows > 0) {
                console.log(`Related records in ItemTag table deleted successfully.`);
              } else {
                console.log(`Tag with ID ${tagId} not found.`);
              }
            } catch (error) {
              console.error('Error deleting tag and related records:', error.message);
            }
          });
        }
      }
    }
    // 回傳更新的菜單的 ID
    return { menuId: existingMenu.menuId };
  } catch (error) {
    throw new Error(`Error processing menu details: ${error.message}`);
  }
});
