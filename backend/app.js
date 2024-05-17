const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require('cors');
const {readdir, readdirSync} = require("fs");
// const doctor = require("./Routes/doctor");
// const staff = require("./Routes/staff");
// const patient = require("./Routes/patient");
// const getDocInfo  = require("./Routes/doctor");
// const getRegInfo = require("./Routes/staff");



dotenv.config({ path: "./.env" });

const app = express();
const bodyParser = require("body-parser");
const { mainModule } = require("process");
const { get } = require("http");
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


readdirSync("./Routes").map((file) => app.use('/api', require('./Routes/'+file)));
// readdirSync("./Routes").map((file) => console.log(file));


function checkLogin(email, password){
    return new Promise((resolve, reject) => {
        console.log("Username : " + email);
        console.log("pw : " + password);
        db.query("SELECT * FROM employee WHERE email = ? AND pw = ?", [email, password], (error, result) => {
            if(error){
                console.log("WRONG");
                console.log(error);
                reject(error);
            } else {
                console.log("CORRECT");
                // console.log(result);
                resolve(result);
            }
        });
    });
}




app.post("/login", (req, res) => {
    const {email, password} = req.body;
    checkLogin(email, password).then((result) => {
        if(result.length != 0){
            const returnResult = {
                id: result[0].id,
                fName : result[0].fName,
                // mName : result[0].mName,
                lName : result[0].lName,
                email: result[0].email,
                role_name: result[0].role_name
            }
            res.send(returnResult)
        }else{
            res.send("Failed");
        }
    }).catch((error) => {
        console.log(error);
        res.send("Failed");
    });
});


function getIdByEmail(email){
    const query = "SELECT * FROM employee WHERE email = ?";
    return new Promise((resolve, reject) => {
        db.query(query, [email], (error, result) => {
            if(error){
                console.log(error);
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

app.post("/testEmail", async(req, res) => {
    const {email,toDay, currentTime} = req.body
    console.log(email);
    try{
        const getId = await getIdByEmail(email);
        if(getId.length != 0){
            const id = getId[0].id;
            const name = getId[0].fName + " " + getId[0].lName;
            const query = "SELECT * FROM attendance WHERE id = ? AND clock_out IS NULL"
            db.query(query, [getId[0].id], (error, result) => {
                if(error){
                    console.log(error);
                    res.send("Internal Server Error");
                } else {
                    const dateTime = new Date(toDay + " " + currentTime);
                    if(result.length != 0){
                        const query = "UPDATE attendance SET clock_out = ? WHERE id = ? AND clock_out IS NULL"
                        
                        db.query(query, [dateTime, id], (error, result) => {
                            if(error){
                                console.log(error);
                                res.send("Internal Server Error");
                            } else {
                                console.log("Checked Out");
                                res.send(`${name} Checked Out`);
                            }
                        });
                    }else{
                        const query = "INSERT INTO attendance (id, clock_in) VALUES (?,?)"
                        db.query(query, [id, dateTime], (error, result) => {
                            if(error){
                                console.log(error);
                                res.send("Internal Server Error");
                            } else {
                                console.log("Checked In");
                                console.log("Checked In");
                                res.send(`${name} Checked In`);
                            }
                        });
                    }
                        
                }
            });

        }else{
            res.send("User Not Found");
        }
    }catch(error){
        console.log(error);
        res.send("Internal Server Error");
    }
});



app.listen(3000, () => {
    console.log("Server started on PORT 3000")
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1234';

