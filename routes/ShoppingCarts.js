var express = require('express');
var ShopingCartController = require('../controllers/ShoppingCart');

var router = express.Router();

router.get('/:id/get/carts', ShopingCartController.getShoppingCartsForUser);

module.exports = router;