const app = require("./app");
const dotenv = require("dotenv");
const { connectDB } = require("./config/database");

// config
dotenv.config({path : 'backend/config/config.env'});

connectDB();

const port = process.env.PORT;

app.listen(port,() => {
    console.log(`server is running on http://localhost:${port}`);
})