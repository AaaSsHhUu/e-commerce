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



exports.getMyOrders = asyncHandler(async (req,res,next) => {
    const order = await Order.find({user : req.user._id});
    
    if(!order){
        return next(new ErrorHandler(404,"No Order found"));
    }
    
    res.status(200).json({
        success : true,
        order
    })
})

// Admin Controllers
exports.getSingleOrder = asyncHandler(async (req,res,next) => {
    const order = await Order.findById(req.params.id).populate("user","name email");

    if(!order){
        return next(new ErrorHandler(404,"No Order found with this Id"));
    }

    res.status(200).json({
        success : true,
        order
    })
})

exports.getAllOrders = asyncHandler(async (req,res,next) => {
    const orders = await Order.find();

    if(!orders){
        return next(new ErrorHandler(404, "No Orders Found"));
    }

    let totalAmount = 0;

    orders.forEach((order) => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success : true,
        totalAmount,
        orders
    })
})