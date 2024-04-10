const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user.model");
const sendToken = require('../utils/generateToken');

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
    sendToken(user,res,200);
}

const loginUser = async (req,res) => {
    let {email, password}  = req.body;
    if(!email || !password){
        return next(new ErrorHandler(400, "Invalid email or password"));
    }

    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler(401, "Invalid email or password"));
    }

    const checkPassword = user.isPasswordCorrect(password);
    if(!checkPassword){
        return next(new ErrorHandler(401, "Invalid email or password"));
    }

    sendToken(user,res,201);
}

const logoutUser = async (req,res) => {
    req.cookie("token",null,{
        httpOnly : true,
        expiresIn : newDate(Date.now())
    })
    res.status(200).json({
        success : true,
        message : "Logged out successfully"
    })
}
module.exports = {registerUser, loginUser, logoutUser}