const express = require("express");

const app = express();

app,get("/", (req, res) => {
    res.send("<h1>Hello World eiei</h1>")
});

app.listen(5000, () => {
    console.log("Server started on PORT 5000")
});