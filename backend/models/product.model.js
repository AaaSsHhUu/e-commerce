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
    avgRating : {
        type : Number,
        default : 0,
        max : 5
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
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : "User",
                required : true
            },
            name : {
                type : String,
                required : true
            },
            rating : {
                type : Number,
                required : true,
                max : [5, "Rating cannot be more than 5"]
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    madeBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    }
},{timestamps : true})

const Product = mongoose.model("Product",productSchema);
module.exports = Product;