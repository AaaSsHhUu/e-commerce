const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user.model");

const registerUser = async (req,res,next)=>{
    let {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar : {
            public_id : "This is sample avatar",
            url : "sampleUrl" 
        }
    })
    res.status(201).json({
        success : true,
        user
    })
}

module.exports = {registerUser}