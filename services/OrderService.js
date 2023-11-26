const express = require('express');
const asyncHandler = require("express-async-handler");
const { orders, restaurants, menuitems, orderItems } = require("../models");

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