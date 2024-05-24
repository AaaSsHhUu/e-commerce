const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookiParser = require("cookie-parser");
const cors = require("cors");


const corsOptions = {
    origin : "http://localhost:3000/",
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookiParser());


//  Routes 
app.use("/api/v1/", require("./routes/product.route"));
app.use("/api/v1/", require("./routes/user.route"));
app.use("/api/v1/", require("./routes/order.route"));

// Error handling
app.use(errorMiddleware);

module.exports = app;