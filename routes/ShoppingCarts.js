var express = require('express');
var ShopingCartController = require('../controllers/ShoppingCart');

var router = express.Router();

router.get('/:id/get/carts', ShopingCartController.getShoppingCartsForUser);

router.post('/add/item', ShopingCartController.addItemToCart);

router.post('/add/note', ShopingCartController.addNote);

router.get('/checkout', ShopingCartController.checkout);

module.exports = router;