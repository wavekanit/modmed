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

router.get("/getPatientPayment/:search", (req, res) => {
    const {search} = req.params;
    const sqlStatement = `
    SELECT 
        p.p_id, 
        p.fName, 
        p.mName, 
        p.lName, 
        p.tel, 
        p.idNumber,
        e.fName,
        e.lName,
        e.d_license_id,
        d.department_name,
    FROM 
        patient p
    JOIN 
        cure_history c ON p.p_id = c.p_id
    WHERE 
        c.progress_status = 1 
        AND (p.fName LIKE ? OR p.mName LIKE ? OR p.lName LIKE ? OR p.tel LIKE ? OR p.idNumber LIKE ?);
;
    `;
    db.query(sqlStatement,  [`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

router.get("/getExpenseByMonthYear/:month/:year", (req, res) => {
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

router.get("/getMinMaxYearProfit", (req, res) => {
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

module.exports = router