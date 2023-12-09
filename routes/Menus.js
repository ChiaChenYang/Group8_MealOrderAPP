var express = require('express');
var MenuController = require('../controllers/MenuController');
var ItemManagementController = require('../controllers/ItemManagementController');
var ConsumerMenuController = require('../controllers/ConsumerMenuController');

var router = express.Router();
/*商家*/
/* 菜單相關 */
// 新建菜單
router.post('/newmenu', MenuController.addNewMenu);
// 讀取某餐廳底下的所有菜單詳細資訊
router.get('/allmenudetails/:restaurantId', MenuController.showAllMenuDetails);
// 處理菜單詳細資訊（categories、items、tags）
router.post('/menudetails', MenuController.processAllMenuDetails);

// router.post('/newmenudetails', MenuController.addNewMenuDetails);

/* 品項管理 */ 
// 讀取某餐廳底下正在販售的餐點
router.get('/sellingitems/:menuId', ItemManagementController.showSellingItems);
// 讀取某餐廳底下暫停販售的餐點
router.get('/pausingitems/:menuId', ItemManagementController.showPausingItems);
// 更新品項的數量，可販售狀態
router.put('/items', ItemManagementController.updateItem);

/*消費者*/
// 讀取某餐廳底下的所有菜單詳細資訊
router.get('/singleitemdetails/:itemId', ConsumerMenuController.showSingleItemDetails);
// 讀取某餐廳底下的所有菜單詳細資訊
router.get('/allmenudetailsforconsumer/:restaurantId', ConsumerMenuController.showAllMenuDetailsForConsumer);

module.exports = router;
