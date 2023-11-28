var express = require('express');
var RestaurantInfoController = require('../controllers/RestaurantInfoController')
var RestaurantSalesReportController = require('../controllers/RestaurantSalesReportController')

var router = express.Router();

// router.post('/modifyinfo', UserCredentialController.addUser);

router.get('/:restaurantId/info', RestaurantInfoController.showInfo);
router.get('/:restaurantId/info/status', RestaurantInfoController.showInfoStatus);
router.post('/info/create', RestaurantInfoController.createInfo);
router.put('/info/modify', RestaurantInfoController.modifyInfo);

router.get('/:restaurantId/report/yearly', RestaurantSalesReportController.getYearlyReport);
router.get('/:restaurantId/report/monthly', RestaurantSalesReportController.getMonthlyReport);
router.get('/:restaurantId/report/weekly', RestaurantSalesReportController.getＷeeklyReport);
router.get('/:restaurantId/report/daily', RestaurantSalesReportController.getDailyReport);
router.get('/:restaurantId/rating', RestaurantSalesReportController.getHistoryRating);

module.exports = router;