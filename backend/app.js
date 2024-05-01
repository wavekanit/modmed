const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require('cors');
const {readdir, readdirSync} = require("fs");
const doctor = require("./Routes/doctor");
const staff = require("./Routes/staff");
const patient = require("./Routes/patient");
const getDocInfo  = require("./Routes/doctor");
const getRegInfo = require("./Routes/staff");



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
        console.log("START---------------------------------------------------------------------------------------")
    }
});


readdirSync("./Routes").map((file) => app.use('/api', require(`./Routes/${file}`)));


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




app.post("/login", (req, res) => {
    const {email, password} = req.body;
    checkLogin(email, password).then((result) => {
        if(result.length != 0){
            if(result[0].roles == "doctor"){
                getDocInfo(result[0].d_id).then((result) => {
                    console.log(result);
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


