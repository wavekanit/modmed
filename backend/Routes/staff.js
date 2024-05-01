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