const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const cors = require('cors');
const moment = require("moment");
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
const exp = require("constants");
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


app.get("/getExpenseByMonthYear/:month/:year", (req, res) => {
    const {month, year} = req.params;
    const query = `
    SELECT
        e.role_name,
        FLOOR(SUM(TIMESTAMPDIFF(SECOND, a.clock_in, a.clock_out) / 3600)) AS total_hour,
        FLOOR(SUM(TIMESTAMPDIFF(SECOND, a.clock_in, a.clock_out)) / 3600) * r.income_base AS expense
    FROM
        attendance a
    JOIN
        employee e ON a.id = e.id
    JOIN
        roles r ON e.role_name = r.role_name
    WHERE
        a.clock_out IS NOT NULL AND
        YEAR(a.clock_in) = ? AND MONTH(a.clock_in) = ?
    GROUP BY
        e.role_name;


    `;
    db.query(query, [year, month], (error, result) => {
        if(error){
            console.log(error);
            res.send("Internal Server Error");
        } else {
            const formattedResult = result.map(row => ({
                ...row,
                role_name: row.role_name,
                total_hour: parseInt(row.total_hour),
                expense: parseInt(row.expense)

            }));
            res.send(formattedResult);
        }
    });
});

app.get("/getMinMaxYearProfit", (req, res) => {
    const sqlStatement = `
        SELECT MIN(clock_in) AS min_year, MAX(clock_in) AS max_year
        FROM attendance;
    `;
    db.query(sqlStatement, (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            const formattedResult = result.map(row => ({
                ...row,
                min_year: moment(row.min_year).format('YYYY'),
                max_year: moment(row.max_year).format('YYYY')
            }));
            res.send(formattedResult);
        }
    });
});

app.listen(3000, () => {
    console.log("Server started on PORT 3000")
});

// ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY '1234';

