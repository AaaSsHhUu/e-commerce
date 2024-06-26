const { required } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    shippingInfo : {
        address : {
            type : String,
            required : true
        },
        city : {
            type : String,
            required : true
        },
        state : {
            type : String,
            required : true
        },
        country : {
            type :String,
            default : "India"
        },
        pinCode : {
            type : Number,
            required : true
        },
        phoneNo : {
            type : Number,
            required : true
        }
    },
    orderItems : [
        {
            name : {
                type : String,
                required : true
            },
            price : {
                type : Number,
                equired : true
            },
            quantity : {
                type : Number,
                required : true
            },
            image : {
                type : String,
                required : true
            },
            product : {
                type : Schema.Types.ObjectId,
                required : true
            }
        }
    ],
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    paymentInfo : {
        id : {
            type : String,
            required : true
        },
        status : {
            type : String,
            required : true
        }
    },
    paidAt : {
        type : Date,
        required : true
    },
    itemsPrice : {
        type : Number,
        default : 0,
        required : true
    },
    taxPrice : {
        type : Number,
        default : 0,
        required : true
    },
    shippingPrice : {
        type : Number,
        default : 0,
        required : true
    },
    totalPrice : {
        type : Number,
        default : 0,
        required : true
    },
    orderStatus : {
        type : String,
        required : true,
        default : "Processing"
    },
    deliveredAt : Date
}, 
{timestamps : true}
)

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;

