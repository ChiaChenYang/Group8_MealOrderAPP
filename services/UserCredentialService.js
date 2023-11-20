const express = require('express');
const { UserCredential } = require('../models')
const asyncHandler = require("express-async-handler");

exports.createUserCredential = async (newUser) => {
    const username = newUser.username;
    const password = newUser.password;
    const userrole = newUser.userrole;
    const user = await UserCredential.create({
        UserName: username,
        HashedPassword: password,
        UserRole: userrole
    });
    
    console.log(user.toJSON());
};

exports.getAllUserCredentials = async () => {
    allusers = await UserCredential.findAll();
    console.log("All users:", JSON.stringify(allusers, null, 2));
    return allusers;
};