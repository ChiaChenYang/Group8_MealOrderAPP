const express = require('express');
const { usercredentials } = require('../models')
const asyncHandler = require("express-async-handler");

exports.createUserCredential = async (newUser) => {
    const username = newUser.username;
    const password = newUser.password;
    const userrole = newUser.userrole;

    try {
        const user = await usercredentials.create({
            userName: username,
            hashedPassword: password,
            userRole: userrole
        });

        console.log(user.toJSON());
        return user;
    } catch (error) {
        console.error('Error creating user:', error.message);
        throw error; // 將錯誤傳播給呼叫者
    }
};

exports.getAllUserCredentials = async () => {
    allusers = await usercredentials.findAll();
    console.log("All users:", JSON.stringify(allusers, null, 2));
    return allusers;
};