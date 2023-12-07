var express = require('express');
var OrderController = require('../controllers/Order');

var router = express.Router();

router.get('/:id/progressing', OrderController.getProgressingOrders);

router.get('/:id/incoming', OrderController.getIncomingOrders);

router.get('/:id/waiting', OrderController.getWaitingOrders);

router.get('/:id/completed', OrderController.getCompletedOrders);

router.put('/:id/accept', OrderController.acceptOrder);

router.put('/:id/finish/prepare', OrderController.finishPreparingOrder);

router.put('/:id/complete', OrderController.completeOrder);

router.put('/:id/reject', OrderController.rejectOrder);

router.put('/delay', OrderController.delayOrder);

router.get('/:id/get/single', OrderController.getSingleOrder);

router.get('/:id/get/history', OrderController.getHistoryOrders);

router.get('/consumer/:id/get/current', OrderController.getCurrentOrdersForConsumer);

router.get('/:id/orderstate', OrderController.getOrderState);

router.get('/:id/restaurantinfo', OrderController.getRestaurantInfo);

router.post('/set/rating', OrderController.setOrderRating);

module.exports = router;