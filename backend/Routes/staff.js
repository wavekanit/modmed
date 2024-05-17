const express = require("express")
const router = express.Router()
const mysql = require("mysql")
const dotenv = require("dotenv");
const moment = require("moment");
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
        console.log("Staff Connected")
    }
});



router.get("/getAttendance/:id", (req, res) => {
    const sqlStatement = `
        SELECT 
            clock_in, 
            clock_out, 
            TIME_TO_SEC(TIMEDIFF(clock_out, clock_in)) / 3600 AS hours_work 
        FROM attendance 
        WHERE id = ?;
    `;
    db.query(sqlStatement, [req.params.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            const formattedResult = result.map(row => ({
                ...row,
                clock_in: moment(row.clock_in).format('YYYY-MM-DD HH:mm:ss'),
                clock_out: moment(row.clock_out).format('YYYY-MM-DD HH:mm:ss'),
                hours_work: parseFloat(row.hours_work).toFixed(0) // formatting hours_work to 2 decimal places
            }));
            res.send(formattedResult);
        }
    });
});


router.get("/getStaffInfoByID/:id", (req, res) => {
    const sqlStatement = `
        SELECT employee.id, employee.fName, employee.mName, employee.lName, employee.idNumber, employee.DOB, employee.sex, employee.addresses, employee.tel, employee.email, employee.nationality, employee.race, employee.religion, employee.bloodType, employee.relation, employee.role_name, employee.d_license_id, employee.d_department,
           JSON_ARRAYAGG(
               JSON_OBJECT(
                   'level_edu', edu.level_edu,
                   'diploma', edu.diploma,
                   'institute', edu.institute,
                   'country', edu.country,
                   'year_graduated', edu.year_graduated
               )
           ) AS educations,
               JSON_OBJECT(
                   'fName', emergency_contact.fName,
                   'lName', emergency_contact.lName,
                   'email', emergency_contact.email,
                   'phone', emergency_contact.tel,
                   'address', emergency_contact.addresses
           ) AS emergency_contact
        FROM employee
        LEFT JOIN edu ON employee.id = edu.id
        LEFT JOIN emergency_contact ON employee.id = emergency_contact.e_id
        GROUP BY employee.id HAVING employee.id = ?;
    `;
    db.query(sqlStatement , [req.params.id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            const formattedResult = result.map(staff => ({
                ...staff,
                educations: JSON.parse(staff.educations),
                emergency_contact: JSON.parse(staff.emergency_contact)
            }));
            res.send(formattedResult);
        }
    });
});



module.exports = router
// module.exports = getRegInfo