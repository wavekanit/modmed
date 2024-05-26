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

router.post("/makePayment", (req, res) => {
    const sqlStatement = `
    UPDATE cure_history
    SET 
        progress_status = 0,
        date_finished = CASE 
                        WHEN date_finished IS NULL THEN ?
                        ELSE date_finished
                        END
    WHERE 
        p_id = ? 
        AND progress_status = 1;

    `;
    db.query(sqlStatement, [req.body.date, req.body.p_id], (error, result) => {
        if(error){
            console.log(error);
            res.status(500).send("Internal Server Error");
        } else {
            res.send("Payment Made");
        }
    });
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
        e.fName AS e_fName, 
        e.lName AS e_lName, 
        e.d_license_id, 
        d.department_name,
        c.date_cure,
        c.date_finished,
        DATEDIFF(c.date_finished, c.date_cure) AS days,
        (DATEDIFF(c.date_finished, c.date_cure) + 1) * 1000 AS cost
    FROM 
        patient p
    JOIN 
        cure_history c ON p.p_id = c.p_id
    JOIN
        employee e ON c.d_id = e.id
    JOIN
        department d ON e.d_department_id = d.department_id
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

router.get("/getTotalIncome/:month/:year", (req, res) => {
    const {month, year} = req.params;
    const query = `
    SELECT 
        YEAR(date_cure) AS year,
        MONTH(date_cure) AS month,
        SUM((DATEDIFF(date_finished, date_cure) + 1) * 1000) AS medical_fee
    FROM
        cure_history
    WHERE
        progress_status = 0 AND YEAR(date_cure) = ? AND MONTH(date_cure) = ?
    GROUP BY 
        year, month;

    `;
    db.query(query, [year, month], (error, result) => {
        if(error){
            console.log(error);
            res.send("Internal Server Error");
        } else {
            res.send(result);
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

router.get("/getNumberOfCases/:month/:year", (req, res) => {
    const {month, year} = req.params;
    const query = `
    SELECT
        YEAR(c.date_cure) AS year,
        MONTH(c.date_cure) AS month,
        d.department_name,
        COUNT(*) AS number_of_cases
    FROM
        cure_history c
    JOIN
        employee e ON c.d_id = e.id
    JOIN
        department d ON e.d_department_id = d.department_id
    WHERE
        YEAR(c.date_cure) = ? AND
        MONTH(c.date_cure) = ?
    GROUP BY
        YEAR(c.date_cure),
        MONTH(c.date_cure),
        d.department_name;

    `;
    db.query(query, [year, month], (error, result) => {
        if(error){
            console.log(error);
            res.send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

router.get("/getNumberOfStaff/:month/:year", (req, res) => {
    const {month, year} = req.params;
    const query = `
    SELECT
        r.role_name,
        COUNT(*) AS number_of_staff
    FROM
        employee e
    JOIN
        roles r ON e.role_name = r.role_name
    WHERE
        e.quit_date IS NULL OR (YEAR(e.quit_date) > ? OR (YEAR(e.quit_date) = ? AND MONTH(e.quit_date) >= ?))
    GROUP BY
        r.role_name;
    `;
    db.query(query, [year, year, month], (error, result) => {
        if(error){
            console.log(error);
            res.send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

router.get("/getSummaryOfIncome/:month/:year", (req, res) => {
    const {month, year} = req.params;
    const query = `
    SELECT
        e.id,
        e.fName,
        e.mName,
        e.lName,
        e.role_name,
        FLOOR(SUM(TIME_TO_SEC(TIMEDIFF(a.clock_out, a.clock_in)) / 3600)) AS hours_worked,
        FLOOR(SUM(TIME_TO_SEC(TIMEDIFF(a.clock_out, a.clock_in)) / 3600)) * r.income_base AS income
    FROM
        employee e
    JOIN
    	attendance a ON e.id = a.id
    JOIN
    	roles r ON e.role_name = r.role_name
    WHERE YEAR(a.clock_in) = ? AND MONTH(a.clock_in) = ?
    GROUP BY
    	e.id;
    `;
    db.query(query, [year, month], (error, result) => {
        if(error){
            console.log(error);
            res.send("Internal Server Error");
        } else {
            res.send(result);
        }
    });
});

module.exports = router