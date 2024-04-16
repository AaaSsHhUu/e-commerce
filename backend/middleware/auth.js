const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isAuthenticated = asyncHandler(async(req,res,next) => {
    const {token} = req.cookies;
    // console.log(token);
    if(token === "j:null"){
        return next(new ErrorHandler(401,"Please Login first"));
    }
    const decodedData = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY);
    // console.log("decoded data : ",decodedData);
    req.user = await User.findById(decodedData.id);
    next();
})

const authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(403, `Role : ${req.user.role} is not allowed to access this resource`))
        }
        next();
    }
}

module.exports = {isAuthenticated, authorizeRoles};