const express = require('express');
const { usercredentials } = require('../models')
const asyncHandler = require("express-async-handler");

exports.createUserCredential = async (newUser) => {
    const username = newUser.username;
    const password = newUser.password;
    const userrole = newUser.userrole;
    const user = await usercredentials.create({
        userName: username,
        hashedPassword: password,
        userRole: userrole
    });
    
    console.log(user.toJSON());
};

exports.getAllUserCredentials = async () => {
    allusers = await usercredentials.findAll();
    console.log("All users:", JSON.stringify(allusers, null, 2));
    return allusers;
};