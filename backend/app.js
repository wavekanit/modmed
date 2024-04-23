const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "modmed",
    port: 8889
});

db.connect( (error) => {
    if(error){
        console.log(error)
    } else {
        console.log("MySQL Connected")
    }
});

app.get("/", (req, res) => {
    res.send("<h1>Hello World eiei</h1>")
});

app.listen(3000, () => {
    console.log("Server started on PORT 3000")
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1234';