const {userSchema, productSchema} = require("../../joiSchema");
const ErrorHandler = require("../utils/errorHandler");


const validateProduct = (req,res,next) => {
    let {error} = productSchema.validate(req.body);
    if(error){
        console.log(error.message);
        return next(new ErrorHandler(400, error.message));
    }
    next();
}

const validateUser = (req,res,next) => {
    let {error} = userSchema.validate(req.body);
    if(error){
        return next(new ErrorHandler(400, error.message));
    }
    next();
}



module.exports = {validateUser, validateProduct};