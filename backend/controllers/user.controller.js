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
    const token = user.generateAccessToken();
    res.status(201).json({
        success : true,
        token
    })
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

    const token = user.generateAccessToken();
    res.status(200).json({
        success : true,
        token
    })
}

module.exports = {registerUser, loginUser}