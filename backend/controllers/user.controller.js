const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user.model");
const sendToken = require('../utils/generateToken');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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
    res.cookie("token",null,{
        httpOnly : true,
        expiresIn : new Date(Date.now())
    })
    res.status(200).json({
        success : true,
        message : "Logged out successfully"
    })
}

const forgotPassword = async(req,res,next) => {
    const user = await User.findOne({email : req.body.email});

    if(!user){
        return next(new ErrorHandler(404, "User not found"))
    }

    // Get reset password token
    const resetToken = await user.getResetPasswordToken();
    await user.save({validateBeforeSave : false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested to reset your password, then please don't open it.`

    try{
        await sendEmail({
            email : user.email,
            subject : "E-commerce password recovery",
            message
        })

        res.status(200).json({
            success : true,
            message : `Email sent to ${user.email} successfully`
        })
    }catch(err){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        user.save({validateBeforeSave : false});

        return next(new ErrorHandler(500, err.message))
    }
}

const resetPassword = async (req,res,next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")
    
    const user = await User.findOne({
        resetPasswordToken : resetPasswordToken,
        resetPasswordExpire : {$gt : Date.now()}
    });

    if(!user){
        return next(new ErrorHandler(400, "Reset Password is Invalid or has been expired"));
    }

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler(400, "Password does not match"));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user.save({validateBeforeSave : false});

    sendToken(user,res,200);
}
module.exports = {registerUser, loginUser, logoutUser,forgotPassword, resetPassword}