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
        console.log("Doctor Connected")
    }
});

router.post("/removePatientFromRoom", (req, res) => {
    const {p_id, room_id, dateTime} = req.body;
    db.query("UPDATE room SET p_id = NULL WHERE room_id = ?", [room_id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            db.query("UPDATE cure_history SET room_id = NULL, date_finished = ? , progress_status = 0 WHERE p_id = ? AND progress_status = 1", [dateTime, p_id], (error, result) => {
                if(error){
                    console.log(error);
                    res.status(500).send("Internal Server Error");
                } else {
                    res.send("Patient Removed from Room");
                }
            });
        }
    });
});

router.post("/addPatientToRoom", (req, res) => {
    const {p_id, room_id} = req.body;
    db.query("UPDATE room SET p_id = ? WHERE room_id = ?", [p_id, room_id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            db.query("UPDATE cure_history SET room_id = ? WHERE p_id = ? AND progress_status = 1", [room_id, p_id], (error, result) => {
                if(error){
                    console.log(error);
                    res.status(500).send("Internal Server Error");
                } else {
                    res.send("Patient Added to Room");
                }
            });
        }
    });
});

router.get("/getAllRoom", (req,res)=>{
    const sqlStatement = `
    SELECT
    room.room_id,
    room.p_id,
    patient.fName,
    patient.lName
FROM
    room
LEFT JOIN
    patient ON room.p_id = patient.p_id
ORDER BY
    room.room_id;

`
    db.query(sqlStatement, (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});


router.get("/getEmer/:id", (req,res)=>{

    db.query("SELECT * FROM emergency_contact WHERE e_id = ?", [req.params.id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

module.exports = router