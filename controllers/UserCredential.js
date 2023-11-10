const express = require('express');
const mysql = require('mysql');
const asyncHandler = require("express-async-handler");
const UserCredentialModel = require('../models/UserCredential')

exports.addUser = asyncHandler(async (req, res, next) => {
    const newUser = req.body;
    UserCredentialModel.createUserCredential(newUser, function(err){
        if (err){
            console.error(err);
            next(err);
        }
    });
    res.status(200).end()
});

exports.showAllUsers = asyncHandler(async (req, res, next) => {
    UserCredentialModel.getAllUserCredentials(function(err, results){
        if (err){
            console.error(err);
            next(err);
        }
        res.json(results);
    });
});