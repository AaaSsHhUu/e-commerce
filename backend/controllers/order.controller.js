const Order = require("../models/order.model");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");

exports.newOrder = asyncHandler(async(req,res) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt : Date.now(),
        user : req.user._id
    })

    if(!order){
        return next(new ErrorHandler(500,"Some Error Occured,Please Try again!!!"))
    }

    res.status(200).json({
        success : true,
        order
    })
})
