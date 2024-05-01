const express = require("express")
const router = express.Router()
const mysql = require("mysql")
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

router.get("/docInfo", (req, res) => {
    db.query("SELECT * FROM doctor", (error, result) => {
        if(error){
            console.log(error)
        } else {
            res.send(result)
        }
    });
});


module.exports = router