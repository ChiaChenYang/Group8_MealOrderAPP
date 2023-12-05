var express = require('express');
var ShopingCartController = require('../controllers/ShoppingCart');

var router = express.Router();

router.get('/:id/get/carts', ShopingCartController.getShoppingCartsForUser);

router.get('/cartinfo', ShopingCartController.getCartInfo);

router.post('/add/item', ShopingCartController.addItemToCart);

router.post('/add/note', ShopingCartController.addNote);

router.post('/set/reservation/time', ShopingCartController.setReservationTime);

router.get('/checkout', ShopingCartController.checkout);

module.exports = router;