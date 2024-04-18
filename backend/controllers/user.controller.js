const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/user.model");
const sendToken = require('../utils/generateToken');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const asyncHandler = require("../middleware/asyncHandler");

const registerUser = async (req, res, next) => {
    let { name, email, password } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "This is sample avatar",
            url: "sampleUrl"
        }
    })
    sendToken(user, res, 200);
}

const loginUser = async (req, res, next) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorHandler(400, "Invalid email or password"));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ErrorHandler(401, "Invalid email or password"));
    }

    const checkPassword = await user.isPasswordCorrect(password);
    if (!checkPassword) {
        return next(new ErrorHandler(401, "Invalid email or password"));
    }

    sendToken(user, res, 201);
}

const logoutUser = async (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expiresIn: new Date(Date.now())
    })
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    })
}

const forgotPassword = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler(404, "User not found"))
    }

    // Get reset password token
    const resetToken = await user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    // console.log("user after reset save : ", user);
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested to reset your password, then please don't open it.`

    try {
        await sendEmail({
            email: user.email,
            subject: "E-commerce password recovery",
            message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })
    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(500, err.message))
    }
}

const resetPassword = async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex")

    // console.log("resetPassword token of url ",resetPasswordToken);

    const user = await User.findOne({
        resetPasswordToken: resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    // console.log("user : ", user);

    if (!user) {
        return next(new ErrorHandler(400, "Reset Password is Invalid or has been expired"));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler(400, "Password does not match"));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    user.save({ validateBeforeSave: false });

    sendToken(user, res, 200);
}

// get user details
const getUserDetails = async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user
    })
}

// Update user password
const updateUserPassword = async (req, res, next) => {
    // find user
    const user = await User.findById(req.user._id).select("+password");
    // give old password
    const checkPassword = await user.isPasswordCorrect(req.body.oldPassword);

    if (!checkPassword) {
        return next(new ErrorHandler(400, "Incorrect Old password"));
    }
    // new password === confirm password
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler(400, "Incorrect password"));
    }
    // save newPassword as password
    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, res, 200);
}

// Update user profile
const updateUserProfile = async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    // We will add avatar later (after cloudinary)

    const user = await User.findOneAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
    })

    if(!user){
        return next(new ErrorHandler(500, "Some Error occured while updating user profile"));
    }

    res.status(200).json({ success: true })
}

// ------------- ADMIN CONTROLLERS -------------------

// Get user details (--Admin--)
const getAllUsers = async (req,res,next) => {
    const users = await User.find();

    res.status(200).json({
        success : true,
        users
    })
}

// Get a particular user's details (--Admin--)
const getUserDetailsForAdmin = async (req,res,next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandler(404,`User does not exists with ID : ${req.params.id}`))
    }

    res.status(200).json({
        success : true,
        user
    })
}

// update someone's role in profile -- Admin --
const updateUserProfileByAdmin = async(req,res,next)=>{
    const newUserProfile = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }

    const user = await User.findByIdAndUpdate(
        req.params.id,
        newUserProfile,
        {
            new : true,
            runValidators : true
        }
    )

    if(!user){
        return next(new ErrorHandler(500, "Some Error occured while updating user profile"));
    }
    
    res.status(200).json({
        success : true,
        user
    })
}

// Delete user -- Admin --

const deleteUser = async (req,res,next) => {
    const user = await User.findByIdAndDelete(req.params.id);
    // we'll remove cloudinary files later
    if(!user){
        return next(new ErrorHandler(500, "Some Error occured while deleting user"));
    }

    res.status(200).json({
        success : true,
        message : `${user.name} deleted successfully`
    })
}

module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getUserDetailsForAdmin, updateUserProfileByAdmin, deleteUser };