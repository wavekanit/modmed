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


router.get("/getCureHistory/:id?", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM cure_history WHERE p_id = ?", [id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

router.get("/getPatientAllergy/:id?", (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM patient_allergy WHERE p_id = ?", [id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

router.get("/getPatient/:search", (req, res) => {
    const searchN = req.params.search;
    db.query("SELECT * FROM patient WHERE fName LIKE ? OR lName LIKE ?", [`%${searchN}%`, `%${searchN}%`], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.send(result);
        }
    });
    // const sqlStatement = `
    // SELECT patient.*, 
    //    JSON_ARRAYAGG(
    //        JSON_OBJECT(
    //            'type_allergy', patient_allergy.type_allergy,
    //            'allergy', patient_allergy.allergy,
    //            'status', patient_allergy.status_allergy
    //        )
    //    ) AS allergies,
    //     JSON_OBJECT(
    //           'fName', emergency_contact.fName,
    //           'lName', emergency_contact.lName,
    //           'email', emergency_contact.email,
    //           'phone', emergency_contact.tel,
    //           'address', emergency_contact.addresses
    //      ) AS emergency_contact
    // FROM patient
    // LEFT JOIN patient_allergy ON patient.p_id = patient_allergy.p_id
    // LEFT JOIN emergency_contact ON patient.e_id = emergency_contact.e_id
    // GROUP BY patient.p_id;

    // `;
    // db.query(sqlStatement, (error, result) => {
    //     if(error){
    //         console.log(error);
    //         res.status(500).send("Internal Server Error");
    //     } else {
    //         console.log(result);
    //         const formattedResult = result.map(patient => ({
    //             ...patient,
    //             allergies: JSON.parse(patient.allergies)
    //         }));
    //         res.send(formattedResult);
    //     }
    // });
});




module.exports = router