var express = require('express');
var OrderController = require('../controllers/Order');

var router = express.Router();

router.get('/:id/getprogressing', OrderController.getProgressingOrders);

module.exports = router;