const express = require('express');
const asyncHandler = require("express-async-handler");
const { orders, restaurants, menuitems, orderitems } = require("../models");

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
            console.log(`Order ${order_id} has ${num_items} items`);

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
                orderTime: restaurant.orders[i].orderTime.toString(),
                orderItems: all_items,
                noteFromUser: restaurant.orders[i].orderNote,
                totalPrice: restaurant.orders[i].totalPrice,
                finishTime: restaurant.orders[i].expectedFinishedTime,
                completeTime: restaurant.orders[i].completeTime
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
        await order.update({ status: new_status });
    }
};

exports.delayOrder = async (order_id, delay_time) => {
    const order = await orders.findByPk(order_id);
    if (order === null){
        throw new Error(`Error: Order with id ${order_id} does not exist`);
    }
    else if (order.expectedFinishedTime === null){
        throw new Error(`Error: The expected finish time of order with id ${order_id} was not set!`);
    }
    else{
        new_expected_time = sequelize.fn('ADDTIME', orders.expectedFinishedTime, delay_time*60);
        await order.update({ expectedFinishedTime: new_expected_time });
    }
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
        return_order = {};
        return_order.orderId = order.orderId;
        return_order.type = order.status;
        return_order.orderTime = order.orderTime;
        return_order.orderItems = [];
        return_order.noteFromUser = order.orderNote;
        return_order.totalPrice = order.totalPrice;
        return_order.finishTime = order.finishTime;
        return_order.completeTime = order.completeTime;

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
        num_orders = history_orders.length;
        console.log(`${num_orders} history orders were found.`);
        return_orders = []
        for (let i=0; i<num_orders; i++){
            all_items = []
            for (let j=0; j<history_orders[i].menuitems.length; j++){
                all_items.push({
                    itemName: history_orders[i].menuitems[j].itemName,
                    number: history_orders[i].menuitems[j].orderitems.orderQuantity
                })
            }

            return_orders.push({
                orderId: history_orders[i].orderId,
                type: history_orders[i].status,
                orderTime: history_orders[i].orderTime,
                orderItems: all_items,
                totalPrice: history_orders[i].totalPrice,
                Rating: history_orders[i].orderRating,
                Comment: history_orders[i].comment
            });
        }

        return return_orders;
    }
};