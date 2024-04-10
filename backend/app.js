const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookiParser = require("cookie-parser");

app.use(express.json());
app.use(cookiParser());

//  Routes 
app.use("/api/v1/", require("./routes/product.route"));
app.use("/api/v1/", require("./routes/user.route"));

// Error handling
app.use(errorMiddleware);

module.exports = app;