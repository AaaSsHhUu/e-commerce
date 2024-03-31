const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
app.use(express.json());

//  Routes 
app.use("/api/v1", require("./routes/product.route"));

// Error handling
app.use(errorMiddleware);

module.exports = app;