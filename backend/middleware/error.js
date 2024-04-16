const ErrorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) => {
    err.status = err.status || 500;
    err.message = err.message  || "Internal server error";

    // Mongodb Wrong id error
    if(err.name === "CastError"){
        const message = `Resource Not Found Invalid : ${err.path}`;
        err = new ErrorHandler(400,message);
    }

    // MongoDB duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
        // console.log(err);
        err = new ErrorHandler(400, message);
    }

    // JWT error
    if(err.name === "JsonWebTokenError"){
        const message = `Invalid jwt token, try again!!!`;
        // console.log(err);
        err = new ErrorHandler(400, message)
    }

    // JWT Expire error
    if(err.name === "TokenExpireError"){
        const message = `JWT token Expired, try again!!!`;
        err = new ErrorHandler(400, message)
    }



    res.status(err.status).json({
        success : false,
        message : err.message,
        error : err.stack
    })
}