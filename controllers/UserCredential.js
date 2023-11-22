const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const UserCredentialService = require('../services/UserCredentialService')

exports.addUser = asyncHandler(async (req, res, next) => {
    const newUser = req.body;
    await UserCredentialService.createUserCredential(newUser);
    res.status(200).end();
});

exports.showAllUsers = asyncHandler(async (req, res, next) => {
    allusers = await UserCredentialService.getAllUserCredentials();
    res.json(allusers);
});