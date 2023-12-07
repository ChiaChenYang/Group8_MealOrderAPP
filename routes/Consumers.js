var express = require('express');
var ConsumerInfoController = require('../controllers/ConsumerInfoController');
var ConsumerExpenseReportController = require('../controllers/ConsumerExpenseReportController');

var router = express.Router();

// router.get('/:consumerId/info', ConsumerInfoController.showInfo);
router.get('/:consumerId/report', ConsumerExpenseReportController.getExpenseReport);
router.get('/:consumerId/info', ConsumerInfoController.showInfo);
router.put('/info/modify', ConsumerInfoController.modifyInfo);

module.exports = router;