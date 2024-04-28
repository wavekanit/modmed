const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");


dotenv.config({ path: "./.env" });

const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MFTv#13181",
    database: "modmed",
    port: 3306
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



function getAlreadExistDocInfo(fName, lName){
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

function insertDocInfo(fName, mName, lName, idNumber, DOB, sex, address, tel, email, nationality, race, religion, bloodType, relation, department, license_id){

}

app.post("/insertDocInfo", (req, res) => {
    const { fName, mName, lName, idNumber, DOB, sex, address, tel, email, nationality, race, religion,bloodType, emergency, relation, department, license_id, d_edu, password} = req.body;
    // db.query("INSERT INTO doctor (fName, mName, lName, idNumber, DOB, sex, address tel, email, nationality, race, religion, bloodType, 
    // console.log(fName);
    var emer_id;
    getAlreadExistDocInfo(emergency.fName, emergency.lName)
        .then(alreadyDoc => {
            if(alreadyDoc.length != 0){
                // res.send(alreadyDoc[0]);
                emer_id = alreadyDoc[0].e_id;
                console.log(alreadyDoc[0].e_id);
            }else{
                insertEmergencyContact(emergency)
                    .then(result => {
                        console.log(result);
                        // res.send(result);
                        emer_id = result.insertId;
                        // db.query("INSERT INTO doctor (fName, mName, lName, idNumber, DO
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

        })
        .catch(error => {
            console.log(error);
        });

    // const { emergency} = req.body;
    // db.query("INSERT INTO emergency_contact (fName, mName, lName, tel, addresses, email) VALUES (?,?,?,?,?,?)", [emergency.fName, emergency.mName, emergency.lName, emergency.tel, emergency.address, emergency.email], (error, result) => {
    //     if(error){
    //         console.log(error)
    //     } else {
    //         console.log("Emergency Contact Inserted")
    //         res.send(result)
    //     }
    // });
    
});



app.listen(3000, () => {
    console.log("Server started on PORT 3000")
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1234';


