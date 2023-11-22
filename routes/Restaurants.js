var express = require('express');
var RestaurantInfoController = require('../controllers/RestaurantInfoController')
var RestaurantSalesReportController = require('../controllers/RestaurantSalesReportController')

var router = express.Router();

// router.post('/modifyinfo', UserCredentialController.addUser);

router.get('/getinfo/:restaurantId', RestaurantInfoController.showInfo);
router.get('/getyearlyreport/:restaurantId', RestaurantSalesReportController.getYearlyReport);
router.get('/getmonthlyreport/:restaurantId', RestaurantSalesReportController.getMonthlyReport);
router.get('/getweeklyreport/:restaurantId', RestaurantSalesReportController.getＷeeklyReport);

module.exports = router;