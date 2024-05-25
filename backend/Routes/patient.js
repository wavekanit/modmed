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

function insertEmergencyContact(emergency){
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO emergency_contact (fName, mName, lName, tel, addresses, email) VALUES (?,?,?,?,?,?)", [emergency.fName, emergency.mName, emergency.lName, emergency.tel, emergency.address, emergency.email], (error, result) => {
            if(error){
                console.log(error)
                reject(error);
            } else {
                console.log("Emergency Contact Inserted")
                resolve(result);
            }
        });
    });
}

function insertPatientInfo(fName, mName, lName, idNumber, DOB, sex, address, tel, email, nationality, race, religion, bloodType, emer_id, relation){
    return new Promise((resolve, reject) => {
        console.log(DOB);
        db.query("INSERT INTO patient (fName, mName, lName, idNumber, DOB, sex, addresses, tel, email, nationality, race, religion, bloodType, e_id, relation) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [fName, mName, lName, idNumber, DOB, sex, address, tel, email, nationality, race, religion, bloodType, emer_id, relation], (error, result) => {
            if(error){
                console.log(error)
                reject(error);
            } else {
                console.log("Patient Inserted")
                resolve(result);
            }
        });
    });
}
function getAlreadExistEmerInfo(emergency){
    const {fName, mName, lName, tel, address, email} = emergency;
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM emergency_contact WHERE fName = ? AND lName = ?", [fName, lName], (error, result) => {
            if(error){
                console.log(error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
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


router.post("/addPatient", async (req, res) => {
    const {info} = req.body;
    const { fName, mName, lName, idNumber, DOB, sex, address, tel, email, nationality, race, religion,bloodType, emergency, relation} = info;
    console.log("========================================= START ==============================================");
    console.log("First Name " + fName);
    console.log("DOB " + DOB);
    console.log("Relation " + bloodType);
    var emer_id;
    try {
        const alreadyPat = await getAlreadExistEmerInfo(emergency);
        if(alreadyPat.length != 0){
            // res.send(alreadyDoc[0]);
            emer_id = alreadyPat[0].e_id;
            console.log("ALREADY EXIST EMERGENCY CONTACT");
            console.log(alreadyPat[0].e_id);
        }else{
            const result = await insertEmergencyContact(emergency);
            console.log(result.insertId);
            emer_id = result.insertId;
        }
        const result = await insertPatientInfo(fName, mName, lName, idNumber, DOB, sex, address, tel, email,  nationality, race, religion, bloodType, emer_id, relation);
        console.log(result);
        res.send("Success");
    } catch (error) {
        console.log(error);
        res.send("Failed to insert patient");
    }
});
router.post("/updatePatInfo", (req, res) => {
    const {fName,mName,lName,idNumber,sex,p_id} = req.body;
    db.query("UPDATE patient SET fName = ?, mName = ?, lName = ?, idNumber = ?, sex = ? WHERE p_id = ?", [fName, mName, lName, idNumber, sex, p_id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Patient Updated");
        }
    });
});

module.exports = router