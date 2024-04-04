const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

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

userSchema.pre("save", async function(next){
    // password should only change if it is modified by the user or when first time created
    if(!this.isModified("password")){
        return next();
    }
    else{
        this.password = await bcrypt.hash(this.password,10)
        next();
    }
})

//  Adding methods in userSchema
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password);
}



const User = mongoose.model("User", userSchema);
module.exports = User;