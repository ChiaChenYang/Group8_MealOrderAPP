var express = require('express');
var ShopingCartController = require('../controllers/ShoppingCart');
const { getShoppingCartsForUser } = require('../services/ShoppingCartService');

var router = express.Router();

router.get('/:id/get/carts', ShopingCartController.getShoppingCartsForUser);

router.get('/cartinfo/user/:user_id/shop/:shop_id', ShopingCartController.getCartInfo);

router.get('/cart/to/checkout/user/:user_id/shop/:shop_id', ShopingCartController.getCartInfoToCheckout);

router.post('/add/item', ShopingCartController.addItemToCart);

router.post('/update/items/note', ShopingCartController.addNoteAndSyncCartItems);

router.post('/set/reservation/time/and/checkout', ShopingCartController.setReservationTimeAndCheckout);

module.exports = router;