const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please Provide your Name"],
        minLength : [3, "Name should be greater than 2 characters"]
    },
    email : {
        type : String,
        required : [true, "Please Provide your Email"],
        unique : [true, "Please enter a valid email"]
    },
    password : {
        type : String,
        required : [true, "Please Provide your Password"],
        select : false,
        minLength : [8, "Password length should be atleast 8 characters"]
    },
    avatar : {
        public_id : {
            type : String,
            required : true
        },
        url : {
            type : String,
            required : true
        }
    },
    role : {
        type : String,
        default : "user",
    },
    resetPasswordToken : {
        type : String
    },
    resetPasswordExpire : {
        type : Date
    }
})

const User = mongoose.model("User", userSchema);
module.exports = User;