const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please Enter produce name"],
        trim : true
    },
    description : {
        type : String,
        required : [true, "Please Enter product description"]
    },
    price : {
        type : Number,
        max : [10000000,"Price cannot exceed 1cr"],
        required : [true, "Price is required"]
    },
    rating : {
        type : Number,
        default : 0
    },
    image : [
        {
            public_id : {
                type : String,
                required : true
            },
            url : {
                type : String,
                required : true
            }
        }
    ],
    category : {
        type : String,
        required : [true, "Please Enter Product Category"],
    },
    stock : {
        type : Number,
        required : [true, "Please Enter product stock"],
        maxLength : [4, "Stock cannot exceed 4 character"],
        default : 1
    },
    numOfReviews : [
        {
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
    ]
},{timestamps : true})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;