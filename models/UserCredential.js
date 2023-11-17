const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');
const CONFIG = require('../config.json')

var exportedModule = {}

const sequelize = new Sequelize(CONFIG.db_name, CONFIG.db_user, CONFIG.db_password, {
    host: CONFIG.db_host,
    dialect: 'mysql',
});

const UserCredential = sequelize.define('UserCredential',{
    CredentialId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    UserName: {
        type: DataTypes.STRING(16),
        allowNull: false,
        unique: true
    },
    HashedPassword: {
        type: DataTypes.STRING(16),
        allowNull: false
    },
    UserRole: {
        type: DataTypes.ENUM('Consumer','Owner')
    }
}, {
    tableName: 'UserCredentials',
    createdAt: false,
    updatedAt: false
});

exportedModule.UserCredential = UserCredential;

exportedModule.createUserCredential = async (newUser) => {
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

exportedModule.getAllUserCredentials = async () => {
    allusers = await UserCredential.findAll();
    console.log("All users:", JSON.stringify(allusers, null, 2));
    return allusers;
};

module.exports = exportedModule;