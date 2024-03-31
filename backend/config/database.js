const mongoose = require("mongoose");
exports.connectDB = async() => {
    await mongoose.connect(process.env.DB_URI)
    .then((data) => {
        console.log("Mongodb connected to server ", data.connection.host);
    }).catch((err) => {
        console.log("Mongodb error : ", err);
    })
}