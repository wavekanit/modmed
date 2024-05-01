const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect( (error) => {
    if(error){
        console.log(error)
    } else {
        console.log("MySQL Connected")
    }
});



function getRegInfo(r_id){
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM register WHERE r_id = ?", [r_id], (error, result) => {
            if(error){
                console.log(error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}


module.exports = router
module.exports = getRegInfo