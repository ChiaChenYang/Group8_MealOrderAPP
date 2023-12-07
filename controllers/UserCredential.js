const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const UserCredentialService = require('../services/UserCredentialService')

exports.addConsumerUser = asyncHandler(async (req, res, next) => {
    const newConsumerUser = req.body;
    result = await UserCredentialService.createConsumerUserCredential(newConsumerUser);
    if (result.status) {
        res.status(result.status).json(result);
    } else {
        res.json(result);
    }
});

exports.validateConsumerUser = asyncHandler(async (req, res, next) => {
    const ConsumerUser = req.body;
    result = await UserCredentialService.validateConsumerUserCredential(ConsumerUser);
    if (result.status) {
        res.status(result.status).json(result);
    } else {
        res.json(result);
    }
});

exports.addMerchantUser = asyncHandler(async (req, res, next) => {
    const newMerchantUser = req.body;
    result = await UserCredentialService.createMerchantUserCredential(newMerchantUser);
    if (result.status) {
        res.status(result.status).json(result);
    } else {
        res.json(result);
    }
});

exports.validateMerchantUser = asyncHandler(async (req, res, next) => {
    const MerchantUser = req.body;
    result = await UserCredentialService.validateMerchantUserCredential(MerchantUser);
    if (result.status) {
        res.status(result.status).json(result);
    } else {
        res.json(result);
    }
});

// exports.addUser = asyncHandler(async (req, res, next) => {
//     const newUser = req.body;
//     await UserCredentialService.createUserCredential(newUser);
//     res.status(200).end();
// });

// exports.showAllUsers = asyncHandler(async (req, res, next) => {
//     allusers = await UserCredentialService.getAllUserCredentials();
//     res.json(allusers);
// });