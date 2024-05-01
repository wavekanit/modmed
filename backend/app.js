const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require('cors');



dotenv.config({ path: "./.env" });

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
app.use(cors(corsOptions));

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

app.get("/docInfo", (req, res) => {
    db.query("SELECT * FROM doctor", (error, result) => {
        if(error){
            console.log(error)
        } else {
            res.send(result)
        }
    });
});

function getAlreadExistEmerInfo(fName, lName){
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

function insertDocInfo(fName, mName, lName, idNumber, DOB, sex, address, tel, email, nationality, race, religion, bloodType, e_id, relation, department, license_id){
    return new Promise((resolve, reject) => {
        console.log(DOB);
        db.query("INSERT INTO doctor (fName, mName, lName, idNumber,DOB, sex, addresses, tel, email, nationality,race, religion, bloodType, e_id, relation, department, license_id) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [fName, mName, lName, idNumber, DOB, sex, address, tel, email, nationality, race, religion, bloodType, e_id, relation, department, license_id], (error, result) => {
            if(error){
                console.log(error)
                reject(error);
            } else {
                console.log("Doctor Inserted")
                resolve(result);
            }
        });
    });
}

function insertDocEdu(d_id, d_edu){
    return new Promise((resolve, reject) => {
        for (let i = 0; i < d_edu.length; i++) {
            db.query("INSERT INTO d_edu (d_id, level_edu, diploma, institute, country, year_graduated) VALUES (?, ?, ?, ?, ?, ?)", [d_id, d_edu[i].level_edu, d_edu[i].diploma, d_edu[i].institute, d_edu[i].country, d_edu[i].year_graduated], (error, result) => {
                if(error){
                    console.log(error)
                    reject(error);
                } else {
                    console.log("Doctor Education Inserted")
                    resolve(result);
                }
            });
        }
    });
}

function insertDocAcc(d_id, email, password){
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO account (d_id, username, pw, roles) VALUES (?,?,?,?)", [d_id, email, password,"doctor"], (error, result) => {
            if(error){
                console.log(error)
                reject(error);
            } else {
                console.log("Doctor Account Inserted")
                resolve(result);
            }
        });
    });
}


app.post("/insertDocInfo", async (req, res) => {
    const { fName, mName, lName, idNumber, DOB, sex, address, tel, email, nationality, race, religion,bloodType, emergency, relation, department, license_id, d_edu, password} = req.body;
    console.log("========================================= START ==============================================");
    console.log("First Name " + fName);
    console.log("DOB " + DOB);
    var emer_id;
    try {
        const alreadyDoc = await getAlreadExistEmerInfo(emergency.fName, emergency.lName);
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
        const result = await insertDocInfo(fName, mName, lName, idNumber, DOB, sex, address, tel, email, nationality, race, religion, bloodType, emer_id, relation, department, license_id);
        console.log(result);
        const d_id = result.insertId;
        const result2 = await insertDocEdu(d_id, d_edu);
        console.log(result2);
        const result3 = await insertDocAcc(d_id, email, password);
        console.log(result3);
        res.send("Success");
    } catch (error) {
        console.log(error);
        res.send("Failed to insert doctor");
    }
    

});

function checkLogin(email, password){
    return new Promise((resolve, reject) => {
        console.log("Username : " + email);
        console.log("pw : " + password);
        db.query("SELECT * FROM account WHERE username = ? AND pw = ?", [email, password], (error, result) => {
            if(error){
                console.log("WRONG");
                console.log(error);
                reject(error);
            } else {
                console.log("CORRECT");
                console.log(result);
                resolve(result);
            }
        });
    });
}

function getDocInfo(d_id){
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM doctor WHERE d_id = ?", [d_id], (error, result) => {
            if(error){
                console.log(error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
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

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    checkLogin(email, password).then((result) => {
        if(result.length != 0){
            if(result[0].roles == "doctor"){
                getDocInfo(result[0].d_id).then((result) => {
                    res.send(result);
                }).catch((error) => {
                    console.log(error);
                    res.send("Failed1");
                });
            }else{
                getRegInfo(result[0].r_id).then((result) => {
                    res.send(result);
                }).catch((error) => {
                    console.log(error);
                    res.send("Failed2");
                });

            }
        }else{
            res.send("Failed");
        }
    }).catch((error) => {
        console.log(error);
        res.send("Failed");
    });
});



app.listen(3000, () => {
    console.log("Server started on PORT 3000")
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1234';


