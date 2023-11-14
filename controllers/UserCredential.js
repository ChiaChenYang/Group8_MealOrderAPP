const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const UserCredentialModel = require('../models/UserCredential')

exports.addUser = asyncHandler(async (req, res, next) => {
    const newUser = req.body;
    await UserCredentialModel.createUserCredential(newUser);
    res.status(200).end()
});

exports.showAllUsers = asyncHandler(async (req, res, next) => {
    allusers = await UserCredentialModel.getAllUserCredentials();
    res.json(allusers);
});