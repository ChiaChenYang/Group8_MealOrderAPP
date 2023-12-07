const express = require('express');
const { consumers, restaurants, orders, sequelize, Sequelize } = require('../models')
const { Op } = require('sequelize');
const asyncHandler = require("express-async-handler");

exports.showInfo = async(consumerId) => {
    
    const consumerinfo = await consumers.findByPk(consumerId, {
        attribute: [
            'displayName',
            'consumerId',
            'department',
            'jobTitle',
            'consumerImage'
        ]
    });

    results = {};
    
    results['id'] = consumerinfo.dataValues.consumerId;
    results['name'] = consumerinfo.dataValues.displayName;
    results['division'] = consumerinfo.dataValues.department;
    results['position'] = consumerinfo.dataValues.jobTitle;
    results['image'] = consumerinfo.dataValues.consumerImage;

    return results;
};

exports.modifyInfo = async(consumerInfo) => {

    const id = consumerInfo.id;
    // const name = consumerInfo.name;
    // const division = consumerInfo.division;
    // const position = consumerInfo.position;
    const image = consumerInfo.image; // 目前只能更改圖片

    try {
        const existingConsumer = await consumers.findOne({ where: { consumerId: id } });
        if (!existingConsumer) {
            throw new Error('Consumer not found');
        }
        else {
            await existingConsumer.update({
                // displayName: name,
                // department: division,
                // jobTitle: position,
                consumerImage: image
            });
        }

    } catch (error) {
        console.log('錯誤詳情:', error);
        console.log('錯誤訊息:', error.message);
        throw error;
    }

};