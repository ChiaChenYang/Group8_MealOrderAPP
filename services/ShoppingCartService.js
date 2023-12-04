const express = require('express');
const { shoppingcarts, consumers, restaurants, menus, cartitems, orders, menuitems, orderitems } = require("../models");
const utils = require('../utils');
const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

exports.getShoppingCartsForUser = async (user_id) => {
    const shop_carts = await shoppingcarts.findAll({
        include: [{
            model: consumers,
            where: {
                consumerId: user_id
            }
        }, {
            model: restaurants,
            attributes: ['restaurantId','restaurantName','restaurantImage']
        }],
        where: {
            checkout: false
        }
    });

    if (shop_carts === null || shop_carts.length === 0) {
        return {};
    }
    else {
        var return_shop_carts = {};
        for (let i=0; i<shop_carts.length; i++){
            if (shop_carts[i].restaurant === null) {
                throw new Error(`There is not any restaurant corresponding to the shopping cart ${shop_carts[i].cartId}`);
            }
            return_shop_carts[i+1] = {
                shop_id: shop_carts[i].restaurant.restaurantId,
                shop_name: shop_carts[i].restaurant.restaurantName,
                quantity: shop_carts[i].quantity,
                price: shop_carts[i].price,
                image: shop_carts[i].restaurant.restaurantImage
            }
        }
        return return_shop_carts;
    }
};

exports.addItemToCart = async (item_info) => {
    var shop_cart = await shoppingcarts.findOne({
        include: [{
            model: consumers,
            where: {
                consumerId: item_info.user_id
            }
        }, {
            model: restaurants,
            where: {
                restaurantId: item_info.shop_id
            }
        }],
        where: {
            checkout: false
        }
    });
    if (shop_cart === null) {
        // create a new shopping cart
        const new_shop_cart = await shoppingcarts.create({ consumerId: item_info.user_id, restaurantId: item_info.shop_id });
        if ( new_shop_cart === null ) {
            throw new Error(`Failed to create a new shopping cart! (consumerId: ${item_info.user_id}, restaurantId: ${item_info.shop_id})`);
        }
        else {
            shop_cart = new_shop_cart;
        }
    }
    const added_item = await menuitems.findOne({
        include: [{
            model: menus,
            where:{
                menuId: item_info.menu_id
            }
        }],
        where: {
            itemName: item_info.name
        }
    });
    if ( added_item === null ){
        throw new Error(`The item ${item_info.name} is not found! (restaurantId: ${item_info.shop_id}, menuId: ${item_info.menu_id})`)
    }
    else if (added_item.price != item_info.price){
        throw new Error(`The price of ${item_info.name} is not consistent! (restaurantId: ${item_info.shop_id}, menuId: ${item_info.menu_id})`)
    }
    else {
        const cart_item = await cartitems.findOne({ itemId: added_item.itemId, cartId: shop_cart.cartId });
        const new_cart_item = await cartitems.create({ itemId: added_item.itemId, cartId: shop_cart.cartId, cartQuantity: item_info.quantity, cartItemNote: item_info.note });
        if (new_cart_item === null) {
            throw new Error(`Failed to create a new cart item! (consumerId: ${item_info.user_id}, restaurantId: ${item_info.shop_id}, itemName: ${item_info.name}`);
        }
        shop_cart.quantity += new_cart_item.cartQuantity;
        shop_cart.price += (new_cart_item.cartQuantity * added_item.price);
        // shop_cart.totalPrepareTime = Math.max(shop_cart.totalPrepareTime, added_item.prepareTime);
        await shop_cart.save();
    }
};

exports.addNote = async (user_id, shop_id, note) => {
    const shop_cart = await shoppingcarts.findOne({
        include: [{
            model: consumers,
            where: {
                consumerId: user_id
            }
        }, {
            model: restaurants,
            where: {
                restaurantId: shop_id
            }
        }],
        where: {
            checkout: false
        }
    });

    if (shop_cart === null) {
        throw new Error(`The shopping cart does not exist! (consumerId: ${user_id}, restaurantId: ${shop_id})`);        
    }
    else {
        await shop_cart.update({ cartNote: note });
    }
};

exports.setReservationTime = async (user_id, shop_id, estimate_time_hour, estimate_time_minute) => {
    const shop_cart = await shoppingcarts.findOne({
        include: [{
            model: consumers,
            where: {
                consumerId: user_id
            }
        }, {
            model: restaurants,
            where: {
                restaurantId: shop_id
            }
        }],
        where: {
            checkout: false
        }
    });

    if (shop_cart === null) {
        throw new Error(`The shopping cart does not exist! (consumerId: ${user_id}, restaurantId: ${shop_id})`);        
    }
    else {
        var reservation_time = new Date();
        reservation_time.setHours(estimate_time_hour);
        reservation_time.setMinutes(estimate_time_minute);
        reservation_time.setSeconds(0);
        await shop_cart.update({ reservationTime: reservation_time });
    }
};

exports.checkout = async (user_id, shop_id) => {
    const shop_cart = await shoppingcarts.findOne({
        include: [{
            model: consumers,
            where: {
                consumerId: user_id
            }
        }, {
            model: restaurants,
            where: {
                restaurantId: shop_id
            }
        }, {
            model: menuitems,
            through: {
                attributes: ['cartQuantity', 'cartItemNote']
            }
        }],
        where: {
            checkout: false
        }
    });

    if (shop_cart === null) {
        throw new Error(`The shopping cart does not exist! (consumerId: ${user_id}, restaurantId: ${shop_id})`);        
    }
    else {
        // create order
        const new_order = await orders.create({
            cartId: shop_cart.cartId,
            consumerId: user_id,
            restaurantId: shop_id,
            totalQuantity: shop_cart.quantity,
            totalPrice: shop_cart.price,
            orderTime: new Date(),
            reservationTime: shop_cart.reservationTime,
            orderNote: shop_cart.cartNote,
            /*expectedFinishedTime: sequelize.fn('ADDDATE', sequelize.col('orderTime'), 
                sequelize.literal(`INTERVAL ${shop_cart.totalPrepareTime} MINUTE`)),*/
            expectedFinishedTime: shop_cart.reservationTime,
            status: 'incoming'
        });

        var all_meals = {};

        // create order items
        for ( let i=0; i<shop_cart.menuitems.length; i++ ){
            const new_order_item = await orderitems.create({
                itemId: shop_cart.menuitems[i].itemId,
                orderId: new_order.orderId,
                orderQuantity: shop_cart.menuitems[i].cartitems.cartQuantity,
                orderItemNote: shop_cart.menuitems[i].cartitems.cartItemNote
            });

            all_meals[i+1] = {
                name: shop_cart.menuitems[i].itemName,
                price: shop_cart.menuitems[i].price,
                image: shop_cart.menuitems[i].itemImage,
                quantity: shop_cart.menuitems[i].cartitems.cartQuantity,
                addition: shop_cart.menuitems[i].cartitems.cartItemNote
            }
        };

        // set checkout to true
        await shop_cart.update({ checkout: true });

        const return_order = {
            order_id: new_order.orderId,
            name: shop_cart.restaurant.restaurantName,
            prepare_time: `${shop_cart.restaurant.prepareTime} min`,
            location: shop_cart.restaurant.factoryLocation,
            total: new_order.totalPrice,
            addition: new_order.orderNote,
            meals: all_meals
        }

        return return_order;
    }
};
