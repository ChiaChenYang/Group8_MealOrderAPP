const express = require('express');
const asyncHandler = require("express-async-handler");
const { orders, restaurants, menuitems, orderitems, consumers } = require("../models");
const utils = require("../utils.js");
const { Sequelize, DataTypes, Op } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

exports.getOrdersWithStatus = async (rid, s) => {
    const restaurant = await restaurants.findByPk(rid, {
        include: [{
            model: orders,
            where: {
                status: s
            },
            include: [{
                model: menuitems,
                through: {
                    attributes: ['orderQuantity', 'orderItemNote']
                }
            }]
        }],
        order: [
            [orders, 'orderTime', 'DESC']
        ]
    });
    /*if (restaurant === null){
        throw new Error(`Restaurant with id ${rid} is not found`);
    } */
    if (restaurant === null || restaurant.orders === null || restaurant.orders.length === 0){
        console.log(`Restaurant with id ${rid} does not have any ${s} order`);
        return [];
    } 
    else {
        const num_orders = restaurant.orders.length;
        console.log(`Restaurnat with id ${rid} has ${num_orders} ${s} order`);
        var all_orders = [];
        for (let i = 0; i < num_orders; i++){
            order_id = restaurant.orders[i].orderId;
            num_items = restaurant.orders[i].menuitems.length;
            //console.log(`Order ${order_id} has ${num_items} items`);

            var all_items = []
            for (let j=0; j < num_items; j++){
                all_items.push({
                    itemName: restaurant.orders[i].menuitems[j].itemName,
                    number: restaurant.orders[i].menuitems[j].orderitems.orderQuantity,
                    remark: restaurant.orders[i].menuitems[j].orderitems.orderItemNote
                });
            }

            all_orders.push({
                orderId: order_id,
                type: restaurant.orders[i].status,
                orderTime: utils.formatDate(restaurant.orders[i].reservationTime),
                orderItems: all_items,
                noteFromUser: restaurant.orders[i].orderNote,
                totalPrice: restaurant.orders[i].totalPrice,
                finishTime: utils.formatDate(restaurant.orders[i].finishTime),
                completeTime: utils.formatDate(restaurant.orders[i].completeTime),
                expectedFinishedTime: utils.formatDate(restaurant.orders[i].expectedFinishedTime)
            });
        }
        return all_orders;
    }
};

exports.updateOrderStatus = async (order_id, old_status, new_status) => {
    const order = await orders.findByPk(order_id);
    if (order === null){
        throw new Error(`Error: Order with id ${order_id} does not exist`);
    }
    else if (order.status != old_status){
        throw new Error(`Error: The order with id ${order_id} is in ${order.status} state! (expected ${old_status})`);
    }
    else{
        if (new_status === 'progressing'){
            await order.update({ status: new_status, receivedTime: new Date() });
        }
        else if (new_status === 'waiting'){
            await order.update({ status: new_status, finishTime: new Date() });
        }
        else if (new_status === 'completed'){
            await order.update({ status: new_status, completeTime: new Date() });
        }
        else if (new_status === 'rejected'){
            await order.update({ status: new_status, rejectTime: new Date() });
        }
        else {
            await order.update({ status: new_status });
        }
    }
    return order.consumerId;
};

exports.updateSoldQuantity = async (order_id) => {
    const ordered_items = await menuitems.findAll({
        include: [{
            model: orders,
            through: {
                attributes: ['orderQuantity']
            },
            where: {
                orderId: order_id
            }
        }]
    });
    const num_items = ordered_items.length;
    for (let i=0; i<num_items; i++){
        for (let j=0; j<ordered_items[i].orders.length; j++){
            ordered_items[i].soldQuantity += ordered_items[i].orders[j].orderitems.orderQuantity;
            if (ordered_items[i].soldQuantity >= ordered_items[i].totalQuantity) {
                ordered_items[i].isAvailable = false;
            }
        }
        await ordered_items[i].save();
    }
}

exports.delayOrder = async (order_id, delay_time) => {
    const order = await orders.findByPk(order_id);
    if (order === null){
        throw new Error(`Error: Order with id ${order_id} does not exist`);
    }
    else if (order.expectedFinishedTime === null){
        throw new Error(`Error: The expected finish time of order with id ${order_id} was not set!`);
    }
    else{
        await order.update({ 
            expectedFinishedTime: sequelize.fn('ADDDATE', sequelize.col('expectedFinishedTime'), sequelize.literal(`INTERVAL ${delay_time} MINUTE`)) 
        });
    }
    return order.consumerId;
};

exports.getSingleOrder = async (order_id) => {
    const order = await orders.findByPk(order_id, {
        include: [{
            model: menuitems,
            through: {
                attributes: ['orderQuantity']
            }
        }],
        order: [
            ['orderTime', 'DESC']
        ]
    });
    if (order === null){
        throw new Error(`Error: Order with id ${order_id} does not exist`);
    }
    else {
        var return_order = {};
        return_order.orderId = order.orderId;
        return_order.type = order.status;
        return_order.orderTime = utils.formatDate(order.orderTime);
        return_order.orderItems = [];
        return_order.noteFromUser = order.orderNote;
        return_order.totalPrice = order.totalPrice;
        return_order.finishTime = utils.formatDate(order.finishTime);
        return_order.completeTime = utils.formatDate(order.completeTime);
        return_order.expectedFinishedTime = utils.formatDate(order.expectedFinishedTime);

        const items_number = order.menuitems.length;
        for (let i = 0; i < items_number; i++){
            return_order.orderItems.push({
                itemName: order.menuitems[i].itemName,
                number: order.menuitems[i].orderitems.orderQuantity,
            });
        }

        return return_order;
    }
};

exports.getHistoryOrders = async (rid) => {
    const history_orders = await orders.findAll({
        include: [{
            model: restaurants,
            where: {
                restaurantId: rid
            }
        }, {
            model: menuitems,
            through: {
                attributes: ['orderQuantity']
            }
        }],
        where: {
            status: 'completed'
        },
        order: [
            ['orderTime', 'DESC']
        ]
    });

    if (history_orders === null || history_orders.length === 0) {
        return [];
    }
    else {
        const num_orders = history_orders.length;
        console.log(`${num_orders} history orders were found.`);
        var return_orders = []
        for (let i=0; i<num_orders; i++){
            var all_items = []
            for (let j=0; j<history_orders[i].menuitems.length; j++){
                all_items.push({
                    itemName: history_orders[i].menuitems[j].itemName,
                    number: history_orders[i].menuitems[j].orderitems.orderQuantity
                })
            }

            return_orders.push({
                orderId: history_orders[i].orderId,
                type: history_orders[i].status,
                orderTime: utils.formatDate(history_orders[i].orderTime),
                completeTime: utils.formatDate(history_orders[i].completeTime),
                orderItems: all_items,
                totalPrice: history_orders[i].totalPrice,
                Rating: history_orders[i].orderRating,
                Comment: history_orders[i].comment
            });
        }

        return return_orders;
    }
};

exports.getCurrentOrdersForConsumer = async (consumer_id) => {
    const progressing_orders = await orders.findAll({
        include: [{
            model: consumers,
            where: {
                consumerId: consumer_id
            }
        }, {
            model: restaurants,
            attributes: ['restaurantId','restaurantName','restaurantImage']
        }],
        where: {
            status: {
                [Op.or]: ['incoming', 'progressing', 'waiting']
            }
        },
        order: [
            ['orderTime', 'DESC']
        ]
    });

    if (progressing_orders === null || progressing_orders.length === 0){
        return {};
    }
    else {
        var return_orders = {};
        for (let i=0; i<progressing_orders.length; i++) {
            if (progressing_orders[i].restaurant === null) {
                throw new Error(`There is not any restaurant corresponding to the order ${progressing_orders[i].orderId}`);
            }
            return_orders[i+1] = {
                "id": progressing_orders[i].restaurant.restaurantId,
                "order_id": progressing_orders[i].orderId,
                "shop_name": progressing_orders[i].restaurant.restaurantName,
                "quantity": progressing_orders[i].totalQuantity,
                "price": progressing_orders[i].totalPrice,
                "image": progressing_orders[i].restaurant.restaurantImage?.toString(),
                "time": utils.formatDate(progressing_orders[i].expectedFinishedTime)
            };
        }
        return return_orders;
    }
};

exports.getOrderState = async (order_id) => {
    const order = await orders.findByPk(order_id, {
        include: [{
            model: menuitems,
            through: {
                attributes: ['orderQuantity', 'orderItemNote']
            }
        }, {
            model: restaurants
        }]
    });
    if (order === null){
        throw new Error(`Error: Order with id ${order_id} does not exist`);
    }
    else{
        var all_order_items = {};
        for (let i=0; i<order.menuitems.length; i++) {
            all_order_items[i+1] = {
                name: order.menuitems[i].itemName,
                image: order.menuitems[i].itemImage?.toString(),
                quantity: order.menuitems[i].orderitems.orderQuantity,
                addition: order.menuitems[i].orderitems.orderItemNote
            }
        }

        var process = false;
        var accept = false;
        var reject = false;
        if (order.status === 'rejected'){
            reject = true;
        }
        else if (order.status === 'progressing'){
            accept = true;
        }
        else if (order.status === 'waiting' || order.status === 'completed'){
            process = true;
            accept = true;
        }

        var order_state = {
            id: order.restaurant.restaurantId,
            name: order.restaurant.restaurantName,
            location: order.restaurant.factoryLocation,
            order_time: utils.formatDate(order.orderTime),
            time: utils.formatDate(order.expectedFinishedTime),
            process: process,
            accept: accept,
            reject: reject,
            Meals: all_order_items,
            addition: order.orderNote
        };
        return order_state;
    }
};

exports.getRestaurantInfo = async (order_id) => {
    const order = await orders.findByPk(order_id, {
        include: [{
            model: restaurants,
            attributes: ['restaurantName','factoryLocation','restaurantImage']
        }]
    });

    if (order === null){
        throw new Error(`The order with id ${order_id} does not exist`);
    }

    return {
        name: order.restaurant.restaurantName,
        location: order.restaurant.factoryLocation,
        image: order.restaurant.restaurantImage?.toString()
    };
};

exports.setOrderRating = async (order_id, rating, comment) => {
    const order = await orders.findByPk(order_id);
    if (order === null){
        throw new Error(`The order with id ${order_id} does not exist`);
    }

    await order.update({ orderRating: rating, comment: comment });
};

exports.getRatingInfo = async (restaurant_id) => {
    const all_orders = await orders.findAll({
        where: {
            [Op.and]: [{
                restaurantId: restaurant_id
            }, {
                orderRating: {[Op.ne]: null}
            }]
        }
    });

    if (all_orders.length === 0){
        return {
            evaluation: null,
            comment: 0
        };
    }

    var avg_rating = 0;
    for (let i=0; i<all_orders.length; i++){
        avg_rating += all_orders[i].orderRating;
    }
    avg_rating = avg_rating / all_orders.length;
    return {
        evaluation: avg_rating,
        comment: all_orders.length
    };
};

exports.getOrderStateChangeMessage = async (order_id) => {
    const order = await orders.findByPk(order_id, {
        include: [{
            model: restaurants,
            attributes: ['restaurantName']
        }]
    });

    const estimate_finish_time = utils.formatDate(order.expectedFinishedTime);
    const restaurant_name = order.restaurant.restaurantName;
    var message = null;
    var completed = false;
    if (order.status === 'progressing') {
        const event_time = utils.formatDate(order.receivedTime);
        message = `您好，已於 ${event_time} 接收到您的訂單!`;
    }
    else if (order.status === 'waiting') {
        const event_time = utils.formatDate(order.finishTime);
        message = `您好，您的餐點已於 ${event_time} 製作完畢，可前往取餐!`;
    }
    else if (order.status === 'completed'){
        const event_time = utils.formatDate(order.finishTime);
        message = `您好，您的餐點已於 ${event_time} 製作完畢，可前往取餐!`;
        completed = true;
    }
    else if (order.status === 'rejected'){
        const event_time = utils.formatDate(order.rejectTime);
        message = `很抱歉，您的訂單已於 ${event_time} 被取消!`;
    }
    return {
        id: order.restaurantId,
        restaurant: restaurant_name,
        order_id: order_id,
        message: message,
        receive_state: completed,
        estimated_time: estimate_finish_time
    };
};
