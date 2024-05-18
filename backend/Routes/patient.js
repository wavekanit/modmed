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

router.get("/getPatientInProgress", (req, res) => {
    const sqlStatement = `
    SELECT p.p_id, p.fName, p.mName,  p.lName
    FROM patient p, cure_history c
    WHERE p.p_id = c.p_id AND c.room_id IS NULL AND c.progress_status = 1 AND c.date_finished IS NULL;
    `;
    db.query(sqlStatement, (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

router.post("/updatePatientAllergies", (req, res) => {
    const {allergy_id, type_allergy, allergy, status_allergy} = req.body;
    db.query("UPDATE patient_allergy SET type_allergy = ?, allergy = ?, status_allergy = ? WHERE allergy_id = ?", [type_allergy, allergy, status_allergy, allergy_id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Patient Updated");
        }
    });
});

router.post("/addPatientAllergies", (req, res) => {
    const {p_id, type_allergy, allergy, status_allergy} = req.body;
    db.query("INSERT INTO patient_allergy (p_id, type_allergy, allergy, status_allergy) VALUES (?, ?, ?, ?)", [p_id, type_allergy, allergy, status_allergy], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Patient Updated");
        }
    });
});

router.post("/updateCure", (req, res) => {
    const {p_id, date_cure, basic_symp, diag_result, methods} = req.body;
    db.query("UPDATE cure_history SET basic_symp = ?, diag_result = ?, methods = ? WHERE p_id = ? AND date_cure = ?", [basic_symp, diag_result, methods, p_id, date_cure], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Patient Updated");
        }
    });
});

router.post("/addCure", (req, res) => {
    const {p_id, basic_symp, diag_result, methods, d_id, room_id} = req.body;
    db.query("INSERT INTO cure_history (p_id, date_cure, basic_symp, diag_result, methods, progress_status, d_id, room_id) VALUES (?,CURRENT_TIMESTAMP,?,?,?,1,?,?)", [p_id, basic_symp,diag_result, methods,d_id, room_id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Cure History Added");
        }
    });
});


router.get("/getCureHistory/:id", (req, res) => {
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

router.get("/getPatientAllergy/:id", (req, res) => {
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
});

router.get("/getPatientInfo/:id", (req, res) => {
    const sqlStatement = `
    SELECT patient.*, 
        JSON_ARRAYAGG 
            ( JSON_OBJECT (
               'type_allergy', patient_allergy.type_allergy,
               'allergy', patient_allergy.allergy,
               'status', patient_allergy.status_allergy
           )
       ) AS allergies,
           JSON_OBJECT (
               'fName', emergency_contact.fName,
               'lName', emergency_contact.lName,
               'email', emergency_contact.email,
               'phone', emergency_contact.tel,
               'address', emergency_contact.addresses
       ) AS emergency_contact
        FROM patient
        LEFT JOIN patient_allergy ON patient.p_id = patient_allergy.p_id
        LEFT JOIN emergency_contact ON patient.e_id = emergency_contact.e_id
        GROUP BY patient.p_id HAVING patient.p_id = ?;
    `;
    db.query(sqlStatement , [req.params.id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            const formattedResult = result.map(patient => ({
                ...patient,
                allergies: JSON.parse(patient.allergies),
                emergency_contact: JSON.parse(patient.emergency_contact)
            }));
            res.send(formattedResult);
        }
    });
});


module.exports = router