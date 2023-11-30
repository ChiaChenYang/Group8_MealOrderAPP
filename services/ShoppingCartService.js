const express = require('express');
const { shoppingcarts, consumers, restaurants } = require("../models");
const { Sequelize, DataTypes } = require('sequelize');
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
        }]
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
            return_shop_carts[i] = {
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

