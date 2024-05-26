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

db.connect((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Staff Connected")
    }
});

router.get("/getStaff/:search", (req, res) => {
    const searchN = req.params.search;
    db.query("SELECT * FROM employee WHERE role_name != 'doctor' AND (fName LIKE ? OR lName LIKE ?)", [`%${searchN}%`, `%${searchN}%`], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            console.log(result);
            res.send(result);
        }
    });
});

router.get("/getAttendance/:id", (req, res) => {
    const sqlStatement = `
        SELECT 
            clock_in, 
            clock_out, 
            TIME_TO_SEC(TIMEDIFF(clock_out, clock_in)) / 3600 AS hours_work 
        FROM attendance 
        WHERE id = ?
        ORDER BY clock_in DESC;
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

router.post("/updateStaffInfo", (req, res) => {
    const { fName, mName, lName, idNumber, sex, id } = req.body;
    db.query("UPDATE employee SET fName = ?, mName = ?, lName = ?, idNumber = ?, sex = ? WHERE id = ?", [fName, mName, lName, idNumber, sex, id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Doctor Updated");
        }
    });
});

router.post("/updateStaffPassword", (req, res) => {
    const {id, newpw} = req.body;
    db.query("UPDATE employee SET pw = ? WHERE id = ?", [newpw, id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Doctor Updated");
        }
    });
});

router.get("/getStaffInfoByID/:id", (req, res) => {
    const sqlStatement = `
        SELECT employee.id, employee.fName, employee.mName, employee.lName, employee.idNumber, employee.DOB, employee.sex, employee.addresses, employee.tel, employee.email, employee.nationality, employee.race, employee.religion, employee.bloodType, employee.relation, employee.role_name, employee.d_license_id, employee.d_department_id, department.department_name,
           JSON_ARRAYAGG(
               JSON_OBJECT(
                   'level_edu', edu.level_edu,
                   'diploma', edu.diploma,
                   'institute', edu.institute,
                   'country', edu.country,
                   'year_graduated', edu.year_graduated
               )
           ) AS educations,
               JSON_OBJECT (
                   'fName', emergency_contact.fName,
                   'lName', emergency_contact.lName,
                   'email', emergency_contact.email,
                   'phone', emergency_contact.tel,
                   'address', emergency_contact.addresses
           ) AS emergency_contact
        FROM employee
        LEFT JOIN edu ON employee.id = edu.id
        LEFT JOIN department ON employee.d_department_id = department.department_id
        LEFT JOIN emergency_contact ON employee.id = emergency_contact.e_id
        GROUP BY employee.id HAVING employee.id = ?;
    `;
    db.query(sqlStatement, [req.params.id], (error, result) => {
        if (error) {
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

router.get("/getNumberCase/:id", (req, res) => {
    const sqlStatement = `
        SELECT 
            YEAR(date_cure) AS year,
            MONTH(date_cure) AS month,
            COUNT(*) AS number_case
        FROM cure_history
        WHERE d_id = ?
        GROUP BY
            MONTH(date_cure),
            YEAR(date_cure)
        ORDER BY
            YEAR(date_cure) DESC,
            MONTH(date_cure) DESC;

    `;
    db.query(sqlStatement, [req.params.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
})

router.get("/getMonthlyIncome/:id", (req, res) => {
    const sqlStatement1 = `
    SELECT 
        YEAR(clock_in) AS year,
        MONTH(clock_in) AS month,
        FLOOR(SUM(TIME_TO_SEC(TIMEDIFF(clock_out, clock_in)) / 3600)) AS hours_worked,
        FLOOR(SUM(TIME_TO_SEC(TIMEDIFF(clock_out, clock_in)) / 3600)) * roles.income_base AS income
    FROM
        attendance
    JOIN
        employee ON attendance.id = employee.id
    JOIN
        roles ON employee.role_name = roles.role_name
    WHERE
        employee.id = ?
    GROUP BY
        YEAR(clock_in),
        MONTH(clock_in),
        roles.income_base
    ORDER BY
        YEAR(clock_in) DESC,
        MONTH(clock_in) DESC;

    `;

    const sqlStatement2 = `
    SELECT
	    YEAR(date_cure) AS year,
        MONTH(date_cure) AS month,
	    COUNT(*) AS number_case    
    FROM
	    cure_history    
    WHERE d_id = ?
    GROUP BY
	    YEAR(date_cure),
        MONTH(date_cure)
    ORDER BY
	    YEAR(date_cure) DESC,
        MONTH(date_cure) DESC;
    `;

    db.query(sqlStatement1, [req.params.id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            const formattedResult = result.map(row => ({
                ...row,
                year: row.year,
                month: row.month,
                hours_worked: parseInt(row.hours_worked), // formatting hours_worked to 2 decimal places
                income: parseInt(row.income) // formatting income to 2 decimal places
            }));
            res.send(formattedResult);
        }
    });
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

function insertStaffInfo(fName, mName, lName, idNumber, DOB, sex, address, tel, email, pw, nationality, race, religion, bloodType, emer_id, relation, role_name){
    return new Promise((resolve, reject) => {
        console.log(DOB);
        db.query("INSERT INTO employee (fName, mName, lName, idNumber, DOB, sex, addresses, tel, email, pw, nationality, race, religion, bloodType, e_id, relation, role_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [fName, mName, lName, idNumber, DOB, sex, address, tel, email, pw, nationality, race, religion, bloodType, emer_id, relation,role_name], (error, result) => {
            if(error){
                console.log(error)
                reject(error);
            } else {
                console.log("Staff Inserted")
                resolve(result);
            }
        });
    });
}

function insertStaffEdu(d_id, d_edu){
    return new Promise((resolve, reject) => {
        for (let i = 0; i < d_edu.length; i++) {
            db.query("INSERT INTO edu (id, level_edu, diploma, institute, country, year_graduated) VALUES (?, ?, ?, ?, ?, ?)", [d_id, d_edu[i].level_edu, d_edu[i].diploma, d_edu[i].institute, d_edu[i].country, d_edu[i].year_graduated], (error, result) => {
                if(error){
                    console.log(error)
                    reject(error);
                } else {
                    console.log("Staff Education Inserted")
                    resolve(result);
                }
            });
        }
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

router.post("/addStaff", async (req, res) => {
    const {info, edu} = req.body;
    const { fName, mName, lName, idNumber, DOB, sex, address, tel, email, pw, nationality, race, religion,bloodType, emergency, relation, role_name} = info;
    console.log("========================================= START ==============================================");
    console.log("First Name " + fName);
    console.log("DOB " + DOB);
    console.log("Relation " + bloodType);
    var emer_id;
    try {
        const alreadyDoc = await getAlreadExistEmerInfo(emergency);
        if(alreadyDoc.length != 0){
            // res.send(alreadyDoc[0]);
            emer_id = alreadyDoc[0].e_id;
            console.log("ALREADY EXIST EMERGENCY CONTACT");
            console.log(alreadyDoc[0].e_id);
        }else{
            const result = await insertEmergencyContact(emergency);
            console.log(result.insertId);
            emer_id = result.insertId;
        }
        const result = await insertStaffInfo(fName, mName, lName, idNumber, DOB, sex, address, tel, email, pw, nationality, race, religion, bloodType, emer_id, relation, role_name);
        console.log(result);
        const id = result.insertId;
        const result2 = await insertStaffEdu(id, edu);
        console.log(result2);
        res.send("Success");
    } catch (error) {
        console.log(error);
        res.send("Failed to insert doctor");
    }
});

router.post("/updateStaffEducation", (req, res) => {
    const {level_edu, diploma, institute, country, year_graduated, id, old_level_edu, old_diploma} = req.body;
    db.query("UPDATE edu SET level_edu = ?, diploma = ?, institute = ?, country = ?, year_graduated = ? WHERE id = ? AND level_edu = ? AND diploma = ?", [level_edu, diploma, institute, country, year_graduated, id, old_level_edu, old_diploma], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Education Updated");
        }
    });
});

router.post("/addStaffEducation", (req, res) => {
    const {level_edu, diploma, institute, country, year_graduated, id} = req.body;
    db.query("INSERT INTO edu (level_edu, diploma, institute, country, year_graduated, id) VALUES (?,?,?,?,?,?)", [level_edu, diploma, institute, country, year_graduated, id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Education Inserted");
        }
    });
});

router.post("/updateStaffInfo", (req, res) => {
    const {fName,mName,lName,idNumber,DOB,sex,addresses,tel,nationality,race,religion,email,id} = req.body;
    db.query("UPDATE employee SET fName = ?, mName = ?, lName = ?, idNumber = ?, DOB = ?, sex = ?, addresses = ?,tel = ?, nationality = ?,race = ?, religion = ?, bloodType = ?, email = ? WHERE id = ?", [fName,mName,lName,idNumber,DOB,sex,addresses,tel,nationality,race,religion,email,id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Doctor Updated");
        }
    });
});

router.post("/delStaffEducation", (req, res) => {
    const {id, level_edu, diploma} = req.body;
    db.query("DELETE FROM edu WHERE id = ? AND level_edu = ? AND diploma = ?", [id, level_edu, diploma], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Education Deleted");
        }
    });
});

module.exports = router
// module.exports = getRegInfo