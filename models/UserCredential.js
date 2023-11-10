var express = require('express');
var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_user,
    password: process.env.DB_pass,
    database: 'MealOrderDB'
});

conn.connect(function (err) {
    if(err) console.error(err);
});

var UserCredential = {};
UserCredential.createUserCredential = function createUserCredential(newUser, callback){
    var username = newUser.username;
    var password = newUser.password;
    var userrole = newUser.userrole;
    sql = `INSERT INTO UserCredentials (UserName, HashedPassword, UserRole) VALUES ('${username}', '${password}', '${userrole}')`
    conn.query(sql, function (err, result) {
        if (err) {
            console.error(`Error while proccessing sql query: ${sql}`);
            callback(err);
        }
        console.log(`MYSQL query: ${sql}`);
    });
}

UserCredential.getAllUserCredentials = function getAllUserCredentials(callback){
    sql = `SELECT * FROM UserCredentials`
    conn.query(sql, function(err, result, fields){
        if (err) {
            console.error(`Error while proccessing sql query: ${sql}`);
            callback(err, NULL)
        }
        console.log(`MYSQL query: ${sql}`);
        callback(err, result);
    });
}

module.exports = UserCredential;