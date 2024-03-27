const app = require("./app");
const dotenv = require("dotenv");

// config
dotenv.config({path : 'backend/config/config.env'});

const port = process.env.PORT;

app.listen(port,() => {
    console.log(`server is running on http://localhost:${port}`);
})