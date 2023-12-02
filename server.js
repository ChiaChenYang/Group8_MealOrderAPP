const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`,`division`,`position`,`email`,`password`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.division,
        req.body.position,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
});

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email` = ? AND `password` = ?";
    db.query(sql, [req.body.email, req.body.password], (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error sql");
        }
        if (data.length > 0) {
            return res.json({ status: "Success", userId: data[0].id });
        } else {
            return res.json("Error");
        }
    });
});

app.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    const sql = "SELECT * FROM login WHERE `id` = ?";
    db.query(sql, [userId], (err, data) => {
        if (err) {
            console.log(err);
            return res.json({ error: "Error in SQL query" });
        }
        if (data.length > 0) {
            return res.send(data);
        } else {
            return res.json({ error: "User not found" });
        }
    });
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Listening...`);
});
