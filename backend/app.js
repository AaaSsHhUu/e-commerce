const express = require("express");
const app = express();

app.use(express.json());

//  Routes 
app.use("/api/v1", require("./routes/product.route"));

module.exports = app;